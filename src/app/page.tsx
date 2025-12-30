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
  Zap,
  BookOpen,
  Clock,
  Award,
  CheckCircle
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
    <main className="min-h-screen noise-texture">
      {/* Decorative Floating Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Soft blobs */}
        <div className="blob-decoration blob-primary w-[500px] h-[500px] -top-48 -right-48" />
        <div className="blob-decoration blob-accent w-[350px] h-[350px] top-1/3 -left-32" />
        <div className="blob-decoration blob-success w-[300px] h-[300px] bottom-20 right-1/4" />

        {/* Floating geometric shapes */}
        <div className="floating-shape floating-circle animate-float" style={{ top: '15%', left: '8%' }} />
        <div className="floating-shape floating-ring animate-float-delayed" style={{ top: '25%', right: '12%' }} />
        <div className="floating-shape floating-square animate-float" style={{ top: '60%', left: '5%' }} />
        <div className="floating-shape floating-plus animate-float-delayed" style={{ top: '45%', right: '8%' }} />
        <div className="floating-shape floating-circle animate-float-delayed" style={{ bottom: '20%', left: '15%' }} />
        <div className="floating-shape floating-ring animate-float" style={{ bottom: '35%', right: '15%' }} />
      </div>

      {/* Hero Section */}
      <section className="section-hero relative pt-10 pb-12 sm:pt-16 sm:pb-16">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-md border border-gray-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">
                Limited Seats Available
              </span>
              <span className="flex h-2 w-2 relative ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
          </motion.div>

          {/* Accent Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <div className="accent-line" />
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center max-w-3xl mx-auto mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-5">
              <span className="text-highlight">{courseInfo.title}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed">
              {courseInfo.subtitle}
            </p>
          </motion.div>

          {/* Stats Row with decorative separators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-2 mb-10"
          >
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 card-glow-hover">
              <div className="icon-box icon-box-primary w-10 h-10">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Course</p>
                <p className="text-sm font-semibold text-gray-900">AI Programming</p>
              </div>
            </div>

            <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />

            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 card-glow-hover">
              <div className="icon-box icon-box-success w-10 h-10">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Batches</p>
                <p className="text-sm font-semibold text-gray-900">{availableBatches} Open</p>
              </div>
            </div>

            <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />

            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 card-glow-hover">
              <div className="icon-box icon-box-warning w-10 h-10">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Slots Left</p>
                <p className="text-sm font-semibold text-gray-900">{totalSlots - bookedSlots}</p>
              </div>
            </div>

            <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />

            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 card-glow-hover">
              <div className="icon-box icon-box-accent w-10 h-10">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Payment</p>
                <p className="text-sm font-semibold text-gray-900">100% Secure</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 corner-accent overflow-hidden"
        >
          {/* Subtle striped background */}
          <div className="absolute inset-0 striped-bg rounded-3xl" />

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="icon-box icon-box-primary w-14 h-14 rounded-2xl glow-dot">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">What You&apos;ll Learn</h2>
                <p className="text-gray-500">Complete E-Commerce Website Development</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {courseTopics.map((topic, index) => {
                const Icon = topicIcons[index];
                return (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-200"
                  >
                    <div className="relative">
                      <div className="number-circle text-xs">{index + 1}</div>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">
                        {topic}
                      </span>
                    </div>
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Fancy Divider */}
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="divider-fancy text-gray-400 text-sm font-medium">
          Choose Your Batch
        </div>
      </div>

      {/* Main Content */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Batch Selection - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="icon-box icon-box-accent w-10 h-10 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Select Your Batch
                </h2>
              </div>
              <p className="text-gray-500 ml-[52px] mb-6">
                Pick your preferred schedule • Classes start soon
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

            {/* Info Note with corner accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative flex items-start gap-4 p-5 rounded-2xl bg-indigo-50 border border-indigo-100 overflow-hidden"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />

              <div className="icon-box icon-box-primary w-12 h-12 rounded-xl flex-shrink-0 relative">
                <Award className="w-6 h-6" />
              </div>
              <div className="relative">
                <p className="text-base font-semibold text-indigo-900 mb-1">
                  Why Learn E-Commerce Development?
                </p>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  {courseInfo.description}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Certificate Included
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Lifetime Access
                  </span>
                </div>
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

      {/* Bottom Decorative Footer Line */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <p className="text-center text-xs text-gray-400 mt-4">
          © 2025 AI Programming Masterclass • All rights reserved
        </p>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        bookingData={bookingData}
      />
    </main>
  );
}
