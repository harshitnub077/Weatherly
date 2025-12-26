import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function MoonTracker() {
    const illumination = 85;
    const phase = "Waxing Gibbous";

    return (
        <GlassCard className="min-h-[300px]" delay={0.4}>
            <div className="flex flex-col h-full justify-between gap-8">
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-soft-slate/30 uppercase tracking-[0.4em] text-[10px] font-bold">Lunar Cycle</span>
                        <div className="p-2 bg-soft-slate/5 rounded-xl border border-soft-slate/10">
                            <Moon className="w-5 h-5 text-soft-slate/40" />
                        </div>
                    </div>

                    <div className="flex items-baseline gap-6">
                        <span className="text-[6.5rem] font-black leading-none tracking-tighter tabular-nums text-soft-slate">{illumination}%</span>
                        <div className="flex flex-col">
                            <span className="text-soft-slate/60 font-black tracking-[0.2em] uppercase text-[11px] mb-1">{phase}</span>
                            <span className="text-soft-slate/30 text-[10px] font-bold tracking-widest">LUNAR ALIGNMENT</span>
                        </div>
                    </div>
                </div>

                <div className="relative h-40 flex items-center justify-center overflow-visible">
                    <div className="absolute inset-0 bg-ethereal-blue/20 rounded-full blur-[100px]" />

                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 40px rgba(51, 65, 85, 0.03)",
                                "0 0 80px rgba(51, 65, 85, 0.08)",
                                "0 0 40px rgba(51, 65, 85, 0.03)"
                            ]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="w-28 h-28 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 relative overflow-hidden ring-1 ring-slate-100"
                    >
                        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/moon.png')]" />
                        <motion.div
                            className="absolute inset-0 bg-slate-900/50 rounded-full"
                            style={{
                                clipPath: "inset(0 0 0 20%)",
                                marginLeft: "20%"
                            }}
                        />
                    </motion.div>

                    <div className="absolute w-[180%] h-[180%] border border-soft-slate/[0.03] rounded-full scale-[0.5] opacity-30" />
                </div>
            </div>
        </GlassCard>
    );
}
