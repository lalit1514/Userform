"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Calendar, Clock, User, X, Download, Share2 } from "lucide-react";
import { BookingData } from "./BookingForm";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingData: BookingData | null;
}

// Confetti particle component
const ConfettiParticle = ({ index }: { index: number }) => {
    const colors = ["#4F46E5", "#10B981", "#F97316", "#8B5CF6", "#EC4899"];
    const randomColor = colors[index % colors.length];
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 0.5;
    const randomDuration = 2 + Math.random() * 2;

    return (
        <motion.div
            initial={{
                x: `${randomX}%`,
                y: -20,
                rotate: 0,
                opacity: 1
            }}
            animate={{
                y: 400,
                rotate: 720,
                opacity: 0
            }}
            transition={{
                duration: randomDuration,
                delay: randomDelay,
                ease: "easeOut"
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
                backgroundColor: randomColor,
                left: `${randomX}%`
            }}
        />
    );
};

export function SuccessModal({ isOpen, onClose, bookingData }: SuccessModalProps) {
    if (!bookingData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    >
                        <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                            {/* Confetti */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <ConfettiParticle key={i} index={i} />
                                ))}
                            </div>

                            {/* Success Header */}
                            <div className="relative px-6 py-10 text-center bg-green-50 border-b border-green-100">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                                    className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-5 bg-green-500 shadow-lg"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative space-y-2"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        🎉 Booking Confirmed!
                                    </h2>
                                    <p className="text-green-600">
                                        Your slot has been successfully reserved
                                    </p>
                                </motion.div>
                            </div>

                            {/* Booking Details */}
                            <div className="p-6 space-y-5">
                                {/* Student Info */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="icon-box icon-box-primary w-12 h-12 rounded-xl">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Student</p>
                                            <p className="font-semibold text-gray-900">{bookingData.name}</p>
                                        </div>
                                    </div>

                                    {/* Batch Info */}
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                                        <div className="flex items-center gap-4">
                                            <div className="icon-box icon-box-success w-12 h-12 rounded-xl">
                                                <Calendar className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Batch</p>
                                                <p className="font-semibold text-gray-900">{bookingData.batch.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 ml-16">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{bookingData.batch.timing}</span>
                                        </div>

                                        <div className="flex items-center gap-3 ml-16">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{bookingData.batch.days}</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Confirmation Message */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-center p-4 rounded-xl bg-indigo-50 border border-indigo-100"
                                >
                                    <p className="text-sm text-indigo-700">
                                        ✉️ A confirmation email has been sent to <strong>{bookingData.email}</strong>
                                    </p>
                                </motion.div>

                                {/* Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    <button className="btn-secondary h-12 rounded-xl flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Receipt
                                    </button>
                                    <button className="btn-secondary h-12 rounded-xl flex items-center justify-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                </motion.div>

                                {/* Done Button */}
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={onClose}
                                    className="btn-primary w-full"
                                >
                                    Continue Exploring
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
