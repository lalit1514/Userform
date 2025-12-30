"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, ArrowRight, Loader2, CheckCircle2, Tag } from "lucide-react";
import { Batch, courseInfo } from "@/data/batches";
import { createBooking } from "@/lib/firestore";
import { cn } from "@/lib/utils";

interface BookingFormProps {
    selectedBatch: Batch | null;
    onSuccess: (data: BookingData) => void;
}

export interface BookingData {
    name: string;
    email: string;
    phone: string;
    batch: Batch;
}

export function BookingForm({ selectedBatch, onSuccess }: BookingFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedBatch) return;
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Save booking to Firestore
            await createBooking({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                batchId: selectedBatch.id,
                batchName: selectedBatch.name
            });

            onSuccess({
                ...formData,
                batch: selectedBatch
            });

            // Reset form
            setFormData({ name: "", email: "", phone: "" });
        } catch (error) {
            console.error("Booking error:", error);
            setErrors({
                phone: error instanceof Error ? error.message : "Failed to create booking. Please try again."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-900">
                        Complete Your Booking
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        Fill in your details to secure your spot
                    </p>
                </div>

                <div className="p-6">
                    {/* Selected Batch Display */}
                    <AnimatePresence mode="wait">
                        {selectedBatch ? (
                            <motion.div
                                key={selectedBatch.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6"
                            >
                                <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                                    <div>
                                        <p className="text-xs text-indigo-500 uppercase tracking-wider font-medium mb-1">
                                            Selected Batch
                                        </p>
                                        <p className="font-semibold text-gray-900">{selectedBatch.name}</p>
                                        <p className="text-sm text-gray-600">{selectedBatch.timing}</p>
                                    </div>
                                    <div className="badge badge-success flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Selected
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100"
                            >
                                <p className="text-sm text-amber-700 text-center font-medium">
                                    ☝️ Please select a batch above to continue
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700 flex items-center gap-2"
                            >
                                <User className="w-4 h-4 text-indigo-500" />
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className={cn(
                                    "input-elegant w-full",
                                    errors.name && "error"
                                )}
                            />
                            <AnimatePresence>
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-sm text-red-500"
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700 flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4 text-green-500" />
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className={cn(
                                    "input-elegant w-full",
                                    errors.email && "error"
                                )}
                            />
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-sm text-red-500"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="phone"
                                className="text-sm font-medium text-gray-700 flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4 text-amber-500" />
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className={cn(
                                    "input-elegant w-full",
                                    errors.phone && "error"
                                )}
                            />
                            <AnimatePresence>
                                {errors.phone && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-sm text-red-500"
                                    >
                                        {errors.phone}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Price Display */}
                        <div className="p-5 rounded-2xl bg-green-50 border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                        <Tag className="w-3.5 h-3.5" />
                                        Course Fee
                                    </p>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-bold text-gray-900">{courseInfo.currency}{courseInfo.price.toLocaleString()}</span>
                                        <span className="text-lg text-gray-400 line-through">{courseInfo.currency}{courseInfo.originalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="px-4 py-2 rounded-full bg-green-500 text-white text-sm font-bold shadow-md">
                                    50% OFF
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            className="pt-2"
                            whileHover={{ scale: selectedBatch ? 1.01 : 1 }}
                            whileTap={{ scale: selectedBatch ? 0.99 : 1 }}
                        >
                            <button
                                type="submit"
                                disabled={!selectedBatch || isSubmitting}
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        Pay {courseInfo.currency}{courseInfo.price.toLocaleString()} & Book Now
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </motion.div>

                        <p className="text-xs text-center text-gray-400 pt-2">
                            🔒 Secure payment • By booking, you agree to our terms
                        </p>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
