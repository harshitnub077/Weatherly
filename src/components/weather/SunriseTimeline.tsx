import { motion } from "framer-motion";
import { Sunrise, Sunset } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function SunriseTimeline() {
    return (
        <GlassCard className="p-8 overflow-hidden" delay={0.5}>
            <div className="flex items-center justify-between mb-8">
                <span className="text-on-surface-variant uppercase tracking-wider text-xs font-bold">Sun Schedule</span>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Sunrise className="w-4 h-4 text-google-yellow" />
                        <span className="text-sm font-medium text-on-surface">06:12</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sunset className="w-4 h-4 text-google-red" />
                        <span className="text-sm font-medium text-on-surface">18:45</span>
                    </div>
                </div>
            </div>

            <div className="relative h-20 flex items-center">
                <div className="absolute w-full h-[1px] bg-outline" />

                <svg className="absolute w-full h-24 -top-8 overflow-visible pointer-events-none">
                    <motion.path
                        d="M 0 60 Q 150 -40 300 60"
                        fill="none"
                        stroke="url(#sun-gradient-v4)"
                        strokeWidth="1.5"
                        strokeDasharray="4 8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <defs>
                        <linearGradient id="sun-gradient-v4" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="var(--color-google-yellow)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>

                <motion.div
                    className="absolute w-5 h-5 rounded-full bg-google-yellow shadow-[0_0_15px_rgba(251,188,4,0.4)] z-10"
                    style={{ left: "40%", top: "5px" }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>
        </GlassCard>
    );
}
