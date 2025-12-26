import { motion } from "framer-motion";
import { Sunrise, Sunset } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function SunriseTimeline() {
    return (
        <GlassCard className="p-8 overflow-hidden" delay={0.5}>
            <div className="flex items-center justify-between mb-8">
                <span className="text-soft-slate/40 uppercase tracking-[0.3em] text-[10px] font-bold">Solar Transit</span>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Sunrise className="w-3 h-3 text-amber-glow" />
                        <span className="text-xs font-bold text-soft-slate/70">06:12</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sunset className="w-3 h-3 text-orange-400" />
                        <span className="text-xs font-bold text-soft-slate/70">18:45</span>
                    </div>
                </div>
            </div>

            <div className="relative h-20 flex items-center">
                <div className="absolute w-full h-[1px] bg-soft-slate/5" />

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
                            <stop offset="50%" stopColor="var(--color-amber-glow)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>

                <motion.div
                    className="absolute w-5 h-5 rounded-full bg-amber-glow shadow-[0_0_15px_rgba(245,158,11,0.4)] z-10"
                    style={{ left: "40%", top: "5px" }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>
        </GlassCard>
    );
}
