"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Shield,
  Sparkles,
  Code2,
  ShoppingCart,
  CreditCard,
  Package,
  UserCheck,
  LayoutDashboard,
  Rocket,
  Settings,
  CheckCircle2
} from "lucide-react";
import { batches, courseInfo, courseTopics, Batch } from "@/data/batches";
import { BatchCard } from "@/components/BatchCard";
import { BookingForm, BookingData } from "@/components/BookingForm";
import { SuccessModal } from "@/components/SuccessModal";

const topicIcons = [
  Code2,
  Package,
  ShoppingCart,
  CreditCard,
  UserCheck,
  Settings,
  LayoutDashboard,
  Rocket
];

export default function Home() {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const handleBatchSelect = (batch: Batch) => {
    setSelectedBatch(batch);
  };

  const handleBookingSuccess = (data: BookingData) => {
    setBookingData(data);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedBatch(null);
    setBookingData(null);
  };

  const availableBatches = batches.filter(b => b.bookedSlots < b.totalSlots).length;
  const totalSlots = batches.reduce((acc, b) => acc + b.totalSlots, 0);
  const bookedSlots = batches.reduce((acc, b) => acc + b.bookedSlots, 0);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="hero-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="currentColor" />
            </pattern>
            <rect width="100" height="100" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-neutral-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-neutral-700">Limited Seats • Online Live Classes</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-3xl mx-auto mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
              {courseInfo.title}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-500 leading-relaxed">
              {courseInfo.subtitle}
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-neutral-100">
              <Code2 className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-neutral-700">AI Programming</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-neutral-100">
              <GraduationCap className="w-5 h-5 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-700">
                {availableBatches} Batches Open
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-neutral-100">
              <Users className="w-5 h-5 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-700">
                {totalSlots - bookedSlots} Slots Left
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-neutral-100">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-neutral-700">Secure Booking</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">What You&apos;ll Learn</h2>
              <p className="text-sm text-neutral-500">Complete E-Commerce Website Development</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courseTopics.map((topic, index) => {
              const Icon = topicIcons[index];
              return (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <Icon className="w-4 h-4 text-neutral-600" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">{topic}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Batch Selection - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-1">
                Select Your Batch
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                Choose a time slot that works best for your schedule
              </p>
            </motion.div>

            {/* Batch Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {batches.map((batch, index) => (
                <BatchCard
                  key={batch.id}
                  batch={batch}
                  index={index}
                  isSelected={selectedBatch?.id === batch.id}
                  onSelect={handleBatchSelect}
                />
              ))}
            </div>

            {/* Info Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Why Learn E-Commerce Development?
                </p>
                <p className="text-sm text-blue-700 leading-relaxed">
                  {courseInfo.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Booking Form - Right Side */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8">
              <BookingForm
                selectedBatch={selectedBatch}
                onSuccess={handleBookingSuccess}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        bookingData={bookingData}
      />
    </main>
  );
}

