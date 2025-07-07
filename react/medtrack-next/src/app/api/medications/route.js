import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";


async function getCurrentUser(req) {
    const email = req.headers.get("x-user-email");
    if (!email) return null;
    const user = await prisma.user_table.findUnique({ where: { email } });
    return user;
}

export async function GET(req) {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const medications = await prisma.medication.findMany({
        where: { userId: user.id },
        orderBy: { time: "asc" },
    });
    return NextResponse.json(medications);
}

export async function POST(req) {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { name, dosage, frequency, time, instructions } = await req.json();
    const medication = await prisma.medication.create({
        data: {
            name,
            dosage,
            frequency,
            time,
            instructions,
            userId: user.id,
            taken: false,
        },
    });
    return NextResponse.json(medication, { status: 201 });
}