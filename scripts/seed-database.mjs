// Database seed script for course batches
// Run with: node scripts/seed-database.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('📋 Firebase Config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const batches = [
    {
        id: "batch-1",
        name: "Morning Batch",
        timing: "8:00 AM - 10:00 AM",
        days: "Mon, Wed, Fri",
        totalSlots: 20,
        bookedSlots: 0,
        startDate: "Jan 15, 2025"
    },
    {
        id: "batch-2",
        name: "Late Morning Batch",
        timing: "10:30 AM - 12:30 PM",
        days: "Mon, Wed, Fri",
        totalSlots: 20,
        bookedSlots: 0,
        startDate: "Jan 15, 2025"
    },
    {
        id: "batch-3",
        name: "Afternoon Batch",
        timing: "2:00 PM - 4:00 PM",
        days: "Tue, Thu, Sat",
        totalSlots: 20,
        bookedSlots: 0,
        startDate: "Jan 20, 2025"
    },
    {
        id: "batch-4",
        name: "Evening Batch",
        timing: "5:00 PM - 7:00 PM",
        days: "Tue, Thu, Sat",
        totalSlots: 20,
        bookedSlots: 0,
        startDate: "Jan 20, 2025"
    },
    {
        id: "batch-5",
        name: "Weekend Batch",
        timing: "9:00 AM - 12:00 PM",
        days: "Saturday & Sunday",
        totalSlots: 20,
        bookedSlots: 0,
        startDate: "Jan 18, 2025"
    }
];

async function seedDatabase() {
    console.log('\n🌱 Starting database seed...\n');

    try {
        for (const batch of batches) {
            const docRef = doc(db, 'batches', batch.id);
            await setDoc(docRef, {
                name: batch.name,
                timing: batch.timing,
                days: batch.days,
                totalSlots: batch.totalSlots,
                bookedSlots: batch.bookedSlots,
                startDate: batch.startDate,
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Created batch: ${batch.name}`);
        }

        console.log('\n🎉 Database seeded successfully!');
        console.log(`   Total batches created: ${batches.length}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
