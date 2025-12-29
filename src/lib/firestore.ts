import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    increment,
    onSnapshot,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Batch {
    id: string;
    name: string;
    timing: string;
    days: string;
    totalSlots: number;
    bookedSlots: number;
    startDate: string;
}

export interface Booking {
    id?: string;
    name: string;
    email: string;
    phone: string;
    batchId: string;
    batchName: string;
    createdAt: Date;
}

// Batches Collection
const batchesCollection = collection(db, 'batches');
const bookingsCollection = collection(db, 'bookings');

/**
 * Fetch all batches from Firestore
 */
export async function getBatches(): Promise<Batch[]> {
    const snapshot = await getDocs(batchesCollection);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Batch));
}

/**
 * Subscribe to real-time batch updates
 */
export function subscribeToBatches(callback: (batches: Batch[]) => void): () => void {
    const unsubscribe = onSnapshot(batchesCollection, (snapshot) => {
        const batches = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Batch));
        callback(batches);
    });

    return unsubscribe;
}

/**
 * Create a new booking and update batch slot count
 */
export async function createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<string> {
    // First check if batch has available slots
    const batchRef = doc(db, 'batches', booking.batchId);
    const batchSnap = await getDoc(batchRef);

    if (!batchSnap.exists()) {
        throw new Error('Batch not found');
    }

    const batchData = batchSnap.data();
    if (batchData.bookedSlots >= batchData.totalSlots) {
        throw new Error('This batch is full. Please select another batch.');
    }

    // Create booking document
    const bookingData = {
        ...booking,
        createdAt: Timestamp.now()
    };

    const bookingRef = await addDoc(bookingsCollection, bookingData);

    // Increment booked slots count
    await updateDoc(batchRef, {
        bookedSlots: increment(1)
    });

    return bookingRef.id;
}

/**
 * Get all bookings (for admin purposes)
 */
export async function getBookings(): Promise<Booking[]> {
    const q = query(bookingsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
    } as Booking));
}
