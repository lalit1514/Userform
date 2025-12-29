"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, User, X, Download, Share2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingData } from "./BookingForm";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingData: BookingData | null;
}

export function SuccessModal({ isOpen, onClose, bookingData }: SuccessModalProps) {
    if (!bookingData) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md mx-4 p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
                {/* Success Header */}
                <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-500 px-6 py-10 text-center">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="1" fill="white" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg"
                    >
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </motion.div>

                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-2xl font-bold text-white">
                            Booking Confirmed!
                        </DialogTitle>
                        <DialogDescription className="text-emerald-50">
                            Your slot has been successfully reserved
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Booking Details */}
                <div className="p-6 space-y-6">
                    {/* Student Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                            <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-neutral-600" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase tracking-wider">Student</p>
                                <p className="font-medium text-neutral-900">{bookingData.name}</p>
                            </div>
                        </div>

                        {/* Batch Info */}
                        <div className="p-4 bg-neutral-50 rounded-xl space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-neutral-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Batch</p>
                                    <p className="font-medium text-neutral-900">{bookingData.batch.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pl-13">
                                <Clock className="w-4 h-4 text-neutral-400" />
                                <span className="text-sm text-neutral-600">{bookingData.batch.timing}</span>
                            </div>

                            <div className="flex items-center gap-3 pl-13">
                                <Calendar className="w-4 h-4 text-neutral-400" />
                                <span className="text-sm text-neutral-600">{bookingData.batch.days}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Confirmation Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100"
                    >
                        <p className="text-sm text-blue-700">
                            A confirmation email has been sent to <strong>{bookingData.email}</strong>
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        <Button
                            variant="outline"
                            className="h-12 rounded-xl border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Receipt
                        </Button>
                        <Button
                            variant="outline"
                            className="h-12 rounded-xl border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                    </motion.div>

                    {/* Done Button */}
                    <Button
                        onClick={onClose}
                        className="w-full h-14 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium"
                    >
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
