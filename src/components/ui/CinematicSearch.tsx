import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, X, MapPin } from "lucide-react";
import { searchCities } from "../../lib/weather-service";
import { GlassCard } from "../ui/GlassCard";

interface SearchBarProps {
    onSelect: (lat: number, lon: number) => void;
}

export function CinematicSearch({ onSelect }: SearchBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }
        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            const data = await searchCities(query);
            setResults(data);
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <>
            {/* Search Beacon (Fixed Bottom) */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 bg-white/40 border border-white/50 rounded-full backdrop-blur-3xl shadow-2xl hover:bg-white/60 transition-all group pointer-events-auto ring-1 ring-black/5"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                <Search className="w-5 h-5 text-soft-slate/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-soft-slate/60">Search Atmosphere</span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-black/5 rounded-lg border border-black/5">
                    <Command className="w-3 h-3 text-soft-slate/40" />
                    <span className="text-[10px] font-bold text-soft-slate/50">K</span>
                </div>
            </motion.button>

            {/* Luminous Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-white/60 backdrop-blur-[40px]"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="w-full max-w-3xl relative"
                        >
                            <GlassCard className="p-6 border-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem]">
                                <div className="flex items-center gap-6 px-6 py-4 border-b border-black/5">
                                    <Search className="w-6 h-6 text-soft-slate/20" />
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search global coordinates..."
                                        className="flex-1 bg-transparent border-none outline-none text-2xl font-bold placeholder:text-soft-slate/10 text-soft-slate"
                                    />
                                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                                        <X className="w-6 h-6 text-soft-slate/20" />
                                    </button>
                                </div>

                                <div className="mt-6 max-h-[500px] overflow-y-auto custom-scrollbar-luminous px-2">
                                    {isSearching ? (
                                        <div className="p-12 text-center">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-6 h-6 border-2 border-soft-slate/10 border-t-soft-slate/40 rounded-full mx-auto mb-4"
                                            />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-soft-slate/20">Synthesizing Location</span>
                                        </div>
                                    ) : results.length > 0 ? (
                                        <div className="flex flex-col gap-2 p-2">
                                            {results.map((city, i) => (
                                                <button
                                                    key={`${city.lat}-${city.lon}-${i}`}
                                                    onClick={() => {
                                                        onSelect(city.lat, city.lon);
                                                        setIsOpen(false);
                                                        setQuery("");
                                                    }}
                                                    className="flex items-center justify-between p-6 rounded-[2rem] hover:bg-black/5 group transition-all text-left w-full hover:px-8"
                                                >
                                                    <div className="flex items-center gap-6">
                                                        <div className="p-3 bg-white/80 rounded-2xl text-soft-slate/20 group-hover:text-aurora-teal transition-colors shadow-sm ring-1 ring-black/5">
                                                            <MapPin className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xl font-bold text-soft-slate group-hover:text-aurora-teal transition-colors">
                                                                {city.name}
                                                            </div>
                                                            <div className="text-[10px] text-soft-slate/40 uppercase tracking-[0.2em] font-bold mt-1">
                                                                {city.state ? `${city.state}, ` : ""}{city.country}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-[11px] font-black text-soft-slate/10 uppercase tracking-widest opacity-0 group-hover:opacity-30 transition-opacity">
                                                        Connect Signal
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : query.length >= 2 ? (
                                        <div className="p-12 text-center text-soft-slate/20 font-black uppercase tracking-[0.4em] text-[10px]">
                                            Coordinate mismatch. Try another quadrant.
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center text-soft-slate/10 font-bold uppercase tracking-[0.5em] text-[10px]">
                                            Initialize search sequence...
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
