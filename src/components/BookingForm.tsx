"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
            <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-neutral-900">
                        Complete Your Booking
                    </CardTitle>
                    <CardDescription className="text-neutral-500">
                        Fill in your details to secure your spot
                    </CardDescription>
                </CardHeader>

                <CardContent>
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
                                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                                            Selected Batch
                                        </p>
                                        <p className="font-medium text-neutral-900">{selectedBatch.name}</p>
                                        <p className="text-sm text-neutral-500">{selectedBatch.timing}</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                                        Selected
                                    </Badge>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100"
                            >
                                <p className="text-sm text-amber-700 text-center">
                                    Please select a batch above to continue
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-sm font-medium text-neutral-700 flex items-center gap-2"
                            >
                                <User className="w-4 h-4 text-neutral-400" />
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className={cn(
                                    "h-12 px-4 bg-neutral-50 border-neutral-200 rounded-xl",
                                    "focus:bg-white focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100",
                                    "placeholder:text-neutral-400 transition-all duration-200",
                                    errors.name && "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100"
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
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium text-neutral-700 flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4 text-neutral-400" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className={cn(
                                    "h-12 px-4 bg-neutral-50 border-neutral-200 rounded-xl",
                                    "focus:bg-white focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100",
                                    "placeholder:text-neutral-400 transition-all duration-200",
                                    errors.email && "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100"
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
                            <Label
                                htmlFor="phone"
                                className="text-sm font-medium text-neutral-700 flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4 text-neutral-400" />
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className={cn(
                                    "h-12 px-4 bg-neutral-50 border-neutral-200 rounded-xl",
                                    "focus:bg-white focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100",
                                    "placeholder:text-neutral-400 transition-all duration-200",
                                    errors.phone && "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100"
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
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Course Fee</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-neutral-900">{courseInfo.currency}{courseInfo.price.toLocaleString()}</span>
                                        <span className="text-lg text-neutral-400 line-through">{courseInfo.currency}{courseInfo.originalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    50% OFF
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            className="pt-2"
                            whileHover={{ scale: selectedBatch ? 1.01 : 1 }}
                            whileTap={{ scale: selectedBatch ? 0.98 : 1 }}
                        >
                            <Button
                                type="submit"
                                disabled={!selectedBatch || isSubmitting}
                                className={cn(
                                    "w-full h-14 text-base font-medium rounded-xl transition-all duration-300",
                                    "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200",
                                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
                                    "flex items-center justify-center gap-2"
                                )}
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
                            </Button>
                        </motion.div>

                        <p className="text-xs text-center text-neutral-400 pt-2">
                            By booking, you agree to our terms and conditions
                        </p>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
