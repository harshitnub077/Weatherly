import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, X, MapPin } from "lucide-react";
import { searchCities } from "../../lib/weather-service";

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
                className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 bg-surface border border-outline rounded-full shadow-lg hover:shadow-xl transition-all group pointer-events-auto"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
            >
                <Search className="w-5 h-5 text-google-blue" />
                <span className="text-sm font-medium tracking-tight text-on-surface">Search city or location</span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-variant rounded-md border border-outline">
                    <Command className="w-3 h-3 text-on-surface-variant" />
                    <span className="text-xs font-bold text-on-surface-variant">K</span>
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
                            className="absolute inset-0 bg-on-surface/10 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="w-full max-w-3xl relative"
                        >
                            <div className="modern-card p-0 overflow-hidden shadow-2xl">
                                <div className="flex items-center gap-6 px-8 py-6 border-b border-outline">
                                    <Search className="w-6 h-6 text-soft-slate/20" />
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Enter city name..."
                                        className="flex-1 bg-transparent border-none outline-none text-2xl font-medium placeholder:text-on-surface-variant/40 text-on-surface"
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
                                                className="w-6 h-6 border-2 border-outline border-t-google-blue rounded-full mx-auto mb-4"
                                            />
                                            <span className="text-sm font-medium text-on-surface-variant">Searching...</span>
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
                                                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-variant group transition-all text-left w-full mx-2"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-surface-variant rounded-full text-on-surface-variant group-hover:bg-google-blue/10 group-hover:text-google-blue transition-colors border border-outline">
                                                            <MapPin className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-lg font-bold text-on-surface group-hover:text-google-blue transition-colors">
                                                                {city.name}
                                                            </div>
                                                            <div className="text-sm text-on-surface-variant">
                                                                {city.state ? `${city.state}, ` : ""}{city.country}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-medium text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                                                        View Weather
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center text-on-surface-variant/40 font-medium">
                                            Type a city name to search.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
