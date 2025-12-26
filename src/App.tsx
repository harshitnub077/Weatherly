import { CosmicBackground } from "./components/3d/CosmicBackground";
import { WeatherDashboard } from "./components/weather/WeatherDashboard";
import { CustomCursor } from "./components/ui/CustomCursor";
import { CinematicSearch } from "./components/ui/CinematicSearch";
import { useWeather } from "./hooks/useWeather";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const { data, loading, setLocation } = useWeather(35.6762, 139.6503); // Initial: Tokyo

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-pearl-white select-none">
      <CustomCursor />
      <div className="noise-overlay" />

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
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[10px] font-black uppercase tracking-[1.5em] text-soft-slate/20"
              >
                Harmonizing Atmosphere
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Soft Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.02)]" />

      {/* Bottom Glow */}
      <div className="fixed bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-white/80 to-transparent pointer-events-none z-0" />
    </main>
  );
}

export default App;
