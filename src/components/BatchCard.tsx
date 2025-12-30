"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, Users, Check, Star } from "lucide-react";
import { Batch } from "@/data/batches";
import { cn } from "@/lib/utils";

interface BatchCardProps {
    batch: Batch;
    index: number;
    isSelected: boolean;
    onSelect: (batch: Batch) => void;
}

export function BatchCard({ batch, index, isSelected, onSelect }: BatchCardProps) {
    const isFull = batch.bookedSlots >= batch.totalSlots;
    const availableSlots = batch.totalSlots - batch.bookedSlots;
    const fillPercentage = (batch.bookedSlots / batch.totalSlots) * 100;

    // Weekend Batch is Popular
    const isPopular = batch.id === "batch-5";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={!isFull ? { y: -4 } : {}}
            whileTap={!isFull ? { scale: 0.98 } : {}}
            className="relative"
        >
            <div
                onClick={() => !isFull && onSelect(batch)}
                className={cn(
                    "relative overflow-hidden rounded-2xl transition-all duration-300 bg-white border-2",
                    "touch-target cursor-pointer",
                    isFull
                        ? "opacity-60 cursor-not-allowed border-gray-200 bg-gray-50"
                        : isSelected
                            ? "border-indigo-500 shadow-lg"
                            : "border-gray-100 hover:border-gray-200 hover:shadow-lg",
                    isPopular && !isFull && "ring-2 ring-amber-200 ring-offset-2"
                )}
                style={{
                    boxShadow: isSelected
                        ? '0 8px 24px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(79, 70, 229, 0.1)'
                        : undefined
                }}
            >
                {/* Popular Ribbon */}
                {isPopular && !isFull && (
                    <div className="absolute top-0 right-0 z-30 overflow-hidden w-24 h-24">
                        <div className="absolute top-3 right-[-35px] w-[140px] bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider text-center py-1.5 transform rotate-45 shadow-md">
                            <span className="flex items-center justify-center gap-1">
                                <Star className="w-3 h-3 fill-white" />
                                Popular
                            </span>
                        </div>
                    </div>
                )}

                {/* Full Batch Overlay */}
                {isFull && (
                    <div className="absolute inset-0 bg-gray-100/50 z-10" />
                )}

                <div className="relative z-20 p-5 md:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 tracking-tight">
                                {batch.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Starts {batch.startDate}
                            </p>
                        </div>

                        {/* Status Badge */}
                        <div
                            className={cn(
                                "badge",
                                isFull
                                    ? "badge-danger animate-pulse-soft"
                                    : availableSlots <= 5
                                        ? "badge-warning"
                                        : "badge-success"
                            )}
                        >
                            {isFull ? "Full" : `${availableSlots} left`}
                        </div>
                    </div>

                    {/* Batch Details */}
                    <div className="space-y-3 mb-5">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center" style={{ boxShadow: '0 2px 8px rgba(79, 70, 229, 0.08)' }}>
                                <Clock className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="text-gray-700">{batch.timing}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center" style={{ boxShadow: '0 2px 8px rgba(16, 185, 129, 0.08)' }}>
                                <Calendar className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700">{batch.days}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center" style={{ boxShadow: '0 2px 8px rgba(245, 158, 11, 0.08)' }}>
                                <Users className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="text-gray-700">{batch.bookedSlots} / {batch.totalSlots} students enrolled</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400 font-medium">Enrollment Progress</span>
                            <span className={cn(
                                "font-semibold",
                                isFull ? "text-red-500" : fillPercentage >= 80 ? "text-amber-500" : "text-green-500"
                            )}>
                                {Math.round(fillPercentage)}%
                            </span>
                        </div>
                        <div className="h-2.5 rounded-full progress-track">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${fillPercentage}%` }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                                className={cn(
                                    "progress-fill",
                                    isFull
                                        ? "progress-fill-danger"
                                        : fillPercentage >= 80
                                            ? "progress-fill-warning"
                                            : "progress-fill-success"
                                )}
                            />
                        </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && !isFull && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-4 left-4 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center"
                            style={{ boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}
                        >
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
