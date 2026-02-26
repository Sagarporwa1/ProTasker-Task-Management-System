# ProTasker - Task Management System

A premium, full-stack Task Management application built as a technical assignment for **Aiking Solution**.

![ProTasker Dashboard](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80) 

## 🚀 Live Demo
[View Live on Vercel](https://your-deployment-url.vercel.app)

## ✨ Features
- **Full CRUD**: Create, read, update, and delete tasks.
- **RESTful API**: Robust backend endpoints built with Node.js (Next.js API Routes).
- **Modern UI**: Clean, responsive dashboard with glassmorphic aesthetics.
- **State Management**: Real-time filtering and search for tasks.
- **Validation**: Schema-level validation using Zod.
- **Animations**: Fluid interactions powered by Framer Motion.
- **Dark Mode Support**: Adapts beautifully to system preferences.

## 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js (Next.js Edge/Serverless Functions).
- **Database**: MongoDB Atlas with Mongoose ORM.
- **Validation**: Zod.

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (for connection string)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/aiking-task-manager.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/aiking-task-manager
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🔌 API Documentation (Node.js)

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/tasks` | `GET` | Fetch all tasks |
| `/api/tasks` | `POST` | Create a new task |
| `/api/tasks/[id]` | `GET` | Get a specific task by ID |
| `/api/tasks/[id]` | `PUT` | Update a task (partial updates supported) |
| `/api/tasks/[id]` | `DELETE` | Remove a task |

### Validation Example (Zod)
```typescript
{
  title: string;       // Required, min 1 char
  description?: string; // Optional
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}
```

## 📐 Project Structure
```text
src/
├── app/                  # App router pages & API routes
│   ├── api/              # RESTful API endpoints (Node.js)
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Base layout
│   └── page.tsx          # Dashboard UI
├── components/           # UI Components
│   ├── ui/               # Base UI components (Modal)
│   ├── Navbar.tsx
│   ├── TaskCard.tsx
│   └── TaskForm.tsx
├── lib/                  # Utilities & DB logic
│   ├── models/           # Mongoose Models
│   ├── schemas/          # Zod Validation Schemas
│   ├── db.ts             # MongoDB Connection
│   └── utils.ts          # Tailwind utilities
```

## 🚀 Deployment on Vercel
1. Connect your Github repository to Vercel.
2. In the "Environment Variables" section, add `MONGODB_URI`.
3. Click **Deploy**.

---
Built with ❤️ for Aiking Solution.
