import { motion } from "framer-motion";
import { Wind } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function AQIMeter({ aqi, status }: { aqi: number, status: string }) {
    return (
        <GlassCard className="min-h-[300px]" delay={0.3}>
            <div className="flex flex-col h-full justify-between gap-8">
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-on-surface-variant uppercase tracking-wider text-xs font-bold">Air Quality Index</span>
                        <div className="p-2 bg-google-green/10 rounded-xl">
                            <Wind className="w-5 h-5 text-google-green animate-pulse" />
                        </div>
                    </div>

                    <div className="flex items-baseline gap-6">
                        <span className="text-8xl font-bold leading-none tracking-tight tabular-nums text-on-surface">{aqi}</span>
                        <div className="flex flex-col">
                            <span className="text-google-green font-bold tracking-wide uppercase text-xs mb-1">{status}</span>
                            <span className="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">Atmospheric Signal</span>
                        </div>
                    </div>
                </div>

                <div className="relative mt-4 h-32 flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.03, 0.08, 0.03]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-google-green rounded-full blur-[80px]"
                    />

                    <div className="w-full flex items-end gap-[4px] h-full px-4">
                        {[...Array(24)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 6 }}
                                animate={{
                                    height: [12, 35 + Math.sin(i * 0.6) * 25 + Math.random() * 15, 12],
                                }}
                                transition={{
                                    duration: 3 + Math.sin(i * 0.3),
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.08
                                }}
                                className="flex-1 bg-gradient-to-t from-google-green/5 via-google-green/30 to-outline rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
