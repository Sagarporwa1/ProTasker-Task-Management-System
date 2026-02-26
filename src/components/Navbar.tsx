'use client';

import { CheckCircle2, Layout } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                            <CheckCircle2 size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            ProTasker
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            <Layout size={16} />
                            <span>Personal Workspace</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
