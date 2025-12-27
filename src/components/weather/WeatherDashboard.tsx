import { motion } from "framer-motion";
import { TextReveal } from "../ui/TextReveal";
import { LiveWeather } from "./LiveWeather";
import { GlassCard } from "../ui/GlassCard";
import { AQIMeter } from "../aqi/AQIMeter";
import { MoonTracker } from "../cosmic/MoonTracker";
import { SunriseTimeline } from "./SunriseTimeline";
import type { WeatherData } from "../../lib/weather-service";

interface DashboardProps {
    data: WeatherData;
    loading?: boolean;
}

export function WeatherDashboard({ data }: DashboardProps) {
    return (
        <div className="container mx-auto px-6 py-12 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
            {/* Header Info */}
            <div className="lg:col-span-12 mb-12">
                <motion.div>
                    <TextReveal className="text-7xl md:text-[10rem] font-black mb-2 tracking-tighter text-on-surface" key={data.name} delay={0.2}>
                        {data.name}
                    </TextReveal>
                    <div className="flex flex-wrap items-center gap-8 mt-4">
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.6, x: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-on-surface-variant text-lg font-medium tracking-tight"
                        >
                            {data.lat.toFixed(4)}° N, {data.lon.toFixed(4)}° E
                        </motion.p>
                        <div className="h-4 w-[1px] bg-outline" />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 1.2 }}
                            className="text-sm font-medium text-on-surface-variant"
                        >
                            Weather Analytics
                        </motion.span>
                    </div>
                </motion.div>
            </div>

            {/* Main Grid: Data Columns */}
            <div className="lg:col-span-8 flex flex-col gap-12">
                <LiveWeather data={data} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <AQIMeter aqi={data.aqi} status={data.aqi_status} />
                    <MoonTracker />
                </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-12">
                <SunriseTimeline />

                <GlassCard className="min-h-[250px] group border-soft-slate/5" delay={0.6}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">Weather Summary</h3>
                    </div>
                    <p className="text-xl font-medium leading-relaxed text-on-surface">
                        {`Currently in ${data.name}, it's ${data.description}. The temperature feels like ${data.feels_like}°, with humidity at ${data.humidity}%.`}
                    </p>

                    <div className="mt-10 pt-8 border-t border-outline flex items-center justify-between">
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Reliability: 99.1%</span>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-background" />)}
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-2 gap-8">
                    {[
                        { label: "Wind Velocity", value: `${data.wind_speed} km/h` },
                        { label: "Molecular Mass", value: `${data.pressure} hPa` },
                        { label: "H2O Volume", value: `${data.humidity}%` },
                        { label: "Optical Depth", value: `${data.clouds}%` }
                    ].map((item, i) => (
                        <GlassCard key={item.label} className="p-6 flex flex-col items-start text-left group" delay={0.7 + i * 0.1}>
                            <span className="text-on-surface-variant text-xs font-medium mb-2 group-hover:text-on-surface transition-colors">{item.label}</span>
                            <span className="text-2xl font-bold tabular-nums tracking-tight text-on-surface">{item.value}</span>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
