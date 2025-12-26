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
            <div className="lg:col-span-12 mb-8">
                <motion.div>
                    <TextReveal className="text-8xl md:text-[12rem] font-black mb-4 tracking-tighter text-soft-slate" key={data.name} delay={0.2}>
                        {data.name}
                    </TextReveal>
                    <div className="flex flex-wrap items-center gap-8 mt-4">
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.4, x: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-soft-slate text-xl font-bold tracking-[0.4em] uppercase"
                        >
                            {data.lat.toFixed(4)}° N / {data.lon.toFixed(4)}° E
                        </motion.p>
                        <div className="h-[2px] w-12 bg-soft-slate/10" />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 1.2 }}
                            className="text-xs font-black uppercase tracking-[0.8em]"
                        >
                            Ethereal Signal / V4
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
                        <div className="w-2 h-2 rounded-full bg-amber-glow animate-pulse" />
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-soft-slate/40">Atmospheric Logic</h3>
                    </div>
                    <p className="text-2xl font-bold leading-[1.5] text-soft-slate/80">
                        {`Synchronized detection in ${data.name} indicates ${data.description}. Sensation is calibrated at ${data.feels_like}°, with moisture indexing at ${data.humidity}%.`}
                    </p>

                    <div className="mt-10 pt-8 border-t border-soft-slate/5 flex items-center justify-between">
                        <span className="text-[10px] text-soft-slate/40 uppercase tracking-widest font-black">Neural Consistency: 99.1%</span>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-100" />)}
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
                        <GlassCard key={item.label} className="p-8 flex flex-col items-center justify-center text-center group" delay={0.7 + i * 0.1}>
                            <span className="text-soft-slate/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4 group-hover:text-soft-slate/40 transition-colors">{item.label}</span>
                            <span className="text-3xl font-black tabular-nums tracking-tighter text-soft-slate">{item.value}</span>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
