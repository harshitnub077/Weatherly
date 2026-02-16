import type { PropsWithChildren } from 'react'
import Header from './TempHeader'

const layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-background text-on-surface">
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <footer className='border-t border-outline py-12 bg-surface'>
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm font-medium text-on-surface-variant">
                        © 2025 Weatherly • Designed for Modernity
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default layout