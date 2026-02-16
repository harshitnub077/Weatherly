import { Link } from 'react-router-dom'
import { useTheme } from '../context/theme-provider'
import { Sun, Moon } from 'lucide-react'


const AppHeader = () => {
    const { theme, setTheme } = useTheme();

    // Determine active theme (including system preference)
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <header className='sticky top-0 z-50 w-full border-b border-outline bg-surface/80 backdrop-blur-md py-3'>
            <div className='container mx-auto flex h-16 items-center justify-between px-6'>
                <Link to={"/"} className="flex items-center gap-2">
                    <img
                        src={isDark ? "/logo-dark.png" : "/logo-light.png"}
                        alt="Weatherly Logo"
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className={`p-2 rounded-full hover:bg-surface-variant transition-all duration-300
                            ${isDark ? "rotate-180" : "rotate-0"}
                        `}
                    >
                        {isDark ? (
                            <Sun className='h-5 w-5 text-google-yellow' />
                        ) : (
                            <Moon className='h-5 w-5 text-google-blue' />
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default AppHeader