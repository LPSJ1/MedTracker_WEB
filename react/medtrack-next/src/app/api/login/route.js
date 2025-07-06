import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {email, password} = await req.json();
        const user = await prisma.user_table.findUnique({where:{email} });

        if (!user || user.password != password){
            return NextResponse.json({ error:"Invalid credentials"}, {status: 401});
        }

        return NextResponse.json({ success: true});
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Login failed"}, {status:500});
    }
}