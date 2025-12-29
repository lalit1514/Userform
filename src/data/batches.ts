// Batch configuration data
export interface Batch {
  id: string;
  name: string;
  timing: string;
  days: string;
  totalSlots: number;
  bookedSlots: number;
  startDate: string;
}

export const batches: Batch[] = [
  {
    id: "batch-1",
    name: "Morning Batch",
    timing: "8:00 AM - 10:00 AM",
    days: "Mon, Wed, Fri",
    totalSlots: 20,
    bookedSlots: 15,
    startDate: "Jan 15, 2025"
  },
  {
    id: "batch-2",
    name: "Late Morning Batch",
    timing: "10:30 AM - 12:30 PM",
    days: "Mon, Wed, Fri",
    totalSlots: 20,
    bookedSlots: 20, // Full batch
    startDate: "Jan 15, 2025"
  },
  {
    id: "batch-3",
    name: "Afternoon Batch",
    timing: "2:00 PM - 4:00 PM",
    days: "Tue, Thu, Sat",
    totalSlots: 20,
    bookedSlots: 8,
    startDate: "Jan 20, 2025"
  },
  {
    id: "batch-4",
    name: "Evening Batch",
    timing: "5:00 PM - 7:00 PM",
    days: "Tue, Thu, Sat",
    totalSlots: 20,
    bookedSlots: 20, // Full batch
    startDate: "Jan 20, 2025"
  },
  {
    id: "batch-5",
    name: "Weekend Batch",
    timing: "9:00 AM - 12:00 PM",
    days: "Saturday & Sunday",
    totalSlots: 20,
    bookedSlots: 3,
    startDate: "Jan 18, 2025"
  }
];

export const courseInfo = {
  title: "AI Programming Masterclass",
  subtitle: "Learn to Build Complete E-Commerce Websites with AI",
  description: "Master the art of building modern e-commerce websites using AI-powered tools and techniques. From product catalogs to payment integration, learn everything you need to create professional online stores.",
  price: 2499,
  originalPrice: 4999, // For showing discount
  currency: "₹"
};

export const courseTopics = [
  "AI-Powered Development Tools & Setup",
  "Building Product Catalogs & Listings",
  "Shopping Cart & Checkout Systems",
  "Payment Gateway Integration",
  "User Authentication & Accounts",
  "Order Management & Tracking",
  "Admin Dashboard Development",
  "Deployment & Going Live"
];
