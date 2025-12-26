import { motion } from "framer-motion";
import { Wind, Droplets, Thermometer, Cloud } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import type { WeatherData } from "../../lib/weather-service";

export function LiveWeather({ data }: { data: WeatherData }) {
    return (
        <GlassCard className="p-10 md:p-16 overflow-visible" delay={0.4}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div className="relative group">
                    <div className="flex items-center gap-4 mb-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="p-4 bg-soft-slate/5 rounded-2xl border border-soft-slate/5"
                        >
                            <Cloud className="w-6 h-6 text-soft-slate/30" />
                        </motion.div>
                        <span className="text-soft-slate/40 uppercase tracking-[0.3em] text-[10px] font-bold">Atmospheric Flux</span>
                    </div>

                    <div className="relative flex items-baseline">
                        <span className="text-[10rem] md:text-[14rem] font-black leading-none tracking-[-0.08em] select-none text-soft-slate md:drop-shadow-sm">
                            {data.temp}
                        </span>
                        <span className="text-4xl md:text-6xl font-bold text-soft-slate/20 ml-2">°</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-2 mt-4"
                    >
                        <div className="w-2 h-2 rounded-full bg-aurora-teal animate-pulse" />
                        <span className="text-xs uppercase tracking-widest font-bold text-soft-slate/60">
                            {data.description}
                        </span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-x-16 gap-y-10 border-l border-soft-slate/5 pl-12">
                    <WeatherStat icon={<Thermometer className="w-4 h-4" />} label="Sensation" value={`${data.feels_like}°`} />
                    <WeatherStat icon={<Wind className="w-4 h-4" />} label="Velocity" value={`${data.wind_speed} km/h`} />
                    <WeatherStat icon={<Droplets className="w-4 h-4" />} label="Humidity" value={`${data.humidity}%`} />
                    <WeatherStat icon={<Cloud className="w-4 h-4" />} label="Coverage" value={`${data.clouds}%`} />
                </div>
            </div>
        </GlassCard>
    );
}

function WeatherStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex flex-col items-start gap-2 relative group-hover:translate-x-2 transition-transform duration-500">
            <div className="flex items-center gap-3 text-soft-slate/30 uppercase text-[9px] font-bold tracking-[0.3em]">
                <div className="p-2 rounded-xl bg-soft-slate/5 text-soft-slate/40">
                    {icon}
                </div>
                {label}
            </div>
            <div className="text-3xl font-black tracking-tighter text-soft-slate tabular-nums">
                {value}
            </div>
        </div>
    );
}
