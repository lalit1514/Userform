"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        >
            <Card
                onClick={() => !isFull && onSelect(batch)}
                className={cn(
                    "relative overflow-hidden cursor-pointer transition-all duration-300 border-2",
                    "touch-target",
                    isFull
                        ? "opacity-60 cursor-not-allowed bg-neutral-50 border-neutral-200"
                        : isSelected
                            ? "border-neutral-900 shadow-lg bg-white"
                            : "border-transparent hover:border-neutral-300 hover:shadow-md bg-white"
                )}
            >
                {/* Full Batch Overlay */}
                {isFull && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/80 to-red-100/80 z-10" />
                )}

                <CardContent className="p-5 md:p-6 relative z-20">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg text-neutral-900 tracking-tight">
                                {batch.name}
                            </h3>
                            <p className="text-sm text-neutral-500 mt-0.5">
                                Starts {batch.startDate}
                            </p>
                        </div>

                        {/* Status Badge */}
                        <Badge
                            variant={isFull ? "destructive" : "secondary"}
                            className={cn(
                                "text-xs font-medium px-2.5 py-1",
                                isFull
                                    ? "bg-red-500 text-white animate-subtle-pulse"
                                    : "bg-neutral-100 text-neutral-700"
                            )}
                        >
                            {isFull ? "Full" : `${availableSlots} left`}
                        </Badge>
                    </div>

                    {/* Batch Details */}
                    <div className="space-y-2.5 mb-5">
                        <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                            <Clock className="w-4 h-4 text-neutral-400" />
                            <span>{batch.timing}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                            <Calendar className="w-4 h-4 text-neutral-400" />
                            <span>{batch.days}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-neutral-600">
                            <Users className="w-4 h-4 text-neutral-400" />
                            <span>{batch.bookedSlots} / {batch.totalSlots} students enrolled</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-neutral-500">Enrollment Progress</span>
                            <span className={cn(
                                "font-medium",
                                isFull ? "text-red-500" : "text-neutral-700"
                            )}>
                                {Math.round(fillPercentage)}%
                            </span>
                        </div>
                        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${fillPercentage}%` }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                                className={cn(
                                    "h-full rounded-full",
                                    isFull
                                        ? "bg-gradient-to-r from-red-400 to-red-500"
                                        : fillPercentage >= 80
                                            ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                            : "bg-gradient-to-r from-emerald-400 to-emerald-500"
                                )}
                            />
                        </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && !isFull && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center"
                        >
                            <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
