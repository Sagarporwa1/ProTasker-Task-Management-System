'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, LayoutGrid, ListChecks, CheckCircle2, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import Modal from '@/components/ui/Modal';
import TaskForm from '@/components/TaskForm';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) {
        console.error('API error:', res.status);
        setTasks([]);
        return;
      }
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CRUD Handlers
  const handleCreateTask = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchTasks();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (data: any) => {
    if (!editingTask) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/tasks/${editingTask._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchTasks();
        setIsModalOpen(false);
        setEditingTask(null);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setTasks(tasks.map(t => t._id === id ? { ...t, status } : t));
      }
    } catch (error) {
      console.error('Error status change:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTasks(tasks.filter(t => t._id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openEditModal = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, filterStatus]);

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  }), [tasks]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-12 transition-colors duration-300">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between py-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Keep track of your projects and daily objectives.
            </p>
          </div>
          <button
            onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Tasks', value: stats.total, color: 'text-indigo-600', icon: LayoutGrid },
            { label: 'To Do', value: stats.todo, color: 'text-zinc-500', icon: ListChecks },
            { label: 'In Progress', value: stats.inProgress, color: 'text-blue-500', icon: Clock },
            { label: 'Completed', value: stats.done, color: 'text-emerald-500', icon: CheckCircle2 },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon size={14} className={stat.color} />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-11 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <div className="flex items-center gap-1.5 px-3 py-2 text-zinc-400">
              <Filter size={16} />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            {['all', 'todo', 'in-progress', 'done'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all",
                  filterStatus === status
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-white dark:bg-zinc-900 text-zinc-500 hover:text-indigo-600 border border-zinc-200 dark:border-zinc-800"
                )}
              >
                {status.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Task Grid */}
        {loading && tasks.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-zinc-400">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            <p>Scanning your tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400">
            <LayoutGrid size={48} className="mb-4 opacity-10" />
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm">Try a different search or create a new objective.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={openEditModal}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Persistence Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          initialData={editingTask}
          isLoading={loading}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        />
      </Modal>
    </main>
  );
}
