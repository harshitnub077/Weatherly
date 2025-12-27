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
                            className="p-3 bg-google-blue/5 rounded-xl border border-google-blue/10"
                        >
                            <Cloud className="w-5 h-5 text-google-blue" />
                        </motion.div>
                        <span className="text-on-surface-variant uppercase tracking-wider text-xs font-bold">Current Weather</span>
                    </div>

                    <div className="relative flex items-baseline">
                        <span className="text-8xl md:text-[10rem] font-bold leading-none tracking-tight select-none text-on-surface">
                            {data.temp}
                        </span>
                        <span className="text-4xl md:text-6xl font-medium text-on-surface-variant ml-2">°</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-2 mt-2"
                    >
                        <div className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
                        <span className="text-sm font-medium text-on-surface-variant capitalize">
                            {data.description}
                        </span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-12 border-l border-outline pl-12">
                    <WeatherStat icon={<Thermometer className="w-4 h-4" />} label="Feels Like" value={`${data.feels_like}°`} />
                    <WeatherStat icon={<Wind className="w-4 h-4" />} label="Wind" value={`${data.wind_speed} km/h`} />
                    <WeatherStat icon={<Droplets className="w-4 h-4" />} label="Humidity" value={`${data.humidity}%`} />
                    <WeatherStat icon={<Cloud className="w-4 h-4" />} label="Clouds" value={`${data.clouds}%`} />
                </div>
            </div>
        </GlassCard>
    );
}

function WeatherStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex flex-col items-start gap-3 transition-transform duration-300">
            <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                <div className="p-2 rounded-lg bg-google-blue/5 text-google-blue">
                    {icon}
                </div>
                {label}
            </div>
            <div className="text-4xl font-bold tracking-tight text-on-surface tabular-nums">
                {value}
            </div>
        </div>
    );
}
