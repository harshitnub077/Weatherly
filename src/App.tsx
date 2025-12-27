import { useEffect } from "react";
import { CosmicBackground } from "./components/3d/CosmicBackground";
import { WeatherDashboard } from "./components/weather/WeatherDashboard";
import { CinematicSearch } from "./components/ui/CinematicSearch";
import { useWeather } from "./hooks/useWeather";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const { data, loading, setLocation } = useWeather(35.6762, 139.6503); // Initial: Tokyo

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [setLocation]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background select-none">

      {/* Ethereal Visual Layer */}
      <CosmicBackground />

      <CinematicSearch onSelect={(lat, lon) => setLocation({ lat, lon })} />

      {/* UI Layer */}
      <div className="relative z-10 w-full min-h-screen scroll-smooth">
        <AnimatePresence mode="wait">
          {!loading && data ? (
            <motion.div
              key={`${data.lat}-${data.lon}`}
              initial={{ opacity: 0, y: 10, filter: "blur(15px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(15px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <WeatherDashboard data={data} loading={loading} />
            </motion.div>
          ) : (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none bg-background">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-8"
              >
                <motion.img
                  src="/logo-new.png"
                  alt="Weatherly Logo"
                  className="h-24 w-auto object-contain mb-4"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm font-medium tracking-widest text-on-surface-variant flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
                  Preparing Atmosphere...
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Soft Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/50" />
    </main>
  );
}

export default App;
