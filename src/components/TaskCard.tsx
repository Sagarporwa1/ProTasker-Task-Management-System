'use client';

import { motion } from 'framer-motion';
import {
    MoreVertical,
    Clock,
    AlertCircle,
    CheckCircle2,
    Trash2,
    Edit2
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
    task: {
        _id: string;
        title: string;
        description?: string;
        status: 'todo' | 'in-progress' | 'done';
        priority: 'low' | 'medium' | 'high';
    };
    onEdit: (task: any) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: string) => void;
}

const statusColors = {
    todo: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-700',
    'in-progress': 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30',
    done: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30',
};

const priorityColors = {
    low: 'text-zinc-500',
    medium: 'text-amber-500',
    high: 'text-rose-500',
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm transition-all hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize transition-colors",
                            statusColors[task.status]
                        )}>
                            {task.status.replace('-', ' ')}
                        </span>
                        <span className={cn(
                            "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider",
                            priorityColors[task.priority]
                        )}>
                            <AlertCircle size={10} />
                            {task.priority}
                        </span>
                    </div>
                    <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {task.title}
                    </h4>
                    {task.description && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                            {task.description}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <MoreVertical size={20} />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xl z-10">
                            <button
                                onClick={() => { onEdit(task); setShowMenu(false); }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                            >
                                <Edit2 size={16} /> Edit Task
                            </button>
                            <button
                                onClick={() => { onDelete(task._id); setShowMenu(false); }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                            <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
                            <div className="px-3 py-2">
                                <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2">Move To</p>
                                <div className="flex flex-col gap-1">
                                    {['todo', 'in-progress', 'done'].filter(s => s !== task.status).map(s => (
                                        <button
                                            key={s}
                                            onClick={() => { onStatusChange(task._id, s); setShowMenu(false); }}
                                            className="text-left py-1 text-xs text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                                        >
                                            {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400">
                    <Clock size={14} />
                    <span className="text-xs">Modified just now</span>
                </div>
                <div className="flex -space-x-2">
                    {/* Avatar placeholders for aesthetic */}
                    <div className="h-6 w-6 rounded-full border-2 border-white dark:border-zinc-900 bg-indigo-100 text-[10px] flex items-center justify-center font-bold text-indigo-600">JD</div>
                </div>
            </div>
        </motion.div>
    );
}
