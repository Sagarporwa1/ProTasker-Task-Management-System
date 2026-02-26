import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/lib/models/Task';
import { taskSchema } from '@/lib/schemas/taskSchema';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const tasks = await Task.find({}).sort({ createdAt: -1 });
        return NextResponse.json(tasks);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Validate request body
        const validatedData = taskSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json(
                { error: 'Invalid data', details: validatedData.error.flatten() },
                { status: 400 }
            );
        }

        const newTask = await Task.create(validatedData.data);
        return NextResponse.json(newTask, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
