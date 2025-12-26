import { motion } from "framer-motion";
import { Wind } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function AQIMeter({ aqi, status }: { aqi: number, status: string }) {
    return (
        <GlassCard className="min-h-[300px]" delay={0.3}>
            <div className="flex flex-col h-full justify-between gap-8">
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-soft-slate/30 uppercase tracking-[0.4em] text-[10px] font-bold">Respiration Index</span>
                        <div className="p-2 bg-aurora-teal/10 rounded-xl">
                            <Wind className="w-5 h-5 text-aurora-teal animate-pulse" />
                        </div>
                    </div>

                    <div className="flex items-baseline gap-6">
                        <span className="text-[6.5rem] font-black leading-none tracking-tighter tabular-nums text-soft-slate">{aqi}</span>
                        <div className="flex flex-col">
                            <span className="text-aurora-teal font-black tracking-[0.2em] uppercase text-[11px] mb-1">{status}</span>
                            <span className="text-soft-slate/30 text-[10px] font-bold tracking-widest">MOLECULAR SENSING</span>
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
                        className="absolute inset-0 bg-aurora-teal rounded-full blur-[80px]"
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
                                className="flex-1 bg-gradient-to-t from-aurora-teal/5 via-aurora-teal/30 to-soft-slate/5 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
