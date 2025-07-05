import { prisma} from "../../../lib/prisma";
import { NextResponse} from "next/server";

export async function POST(req) {
    try {
        const {first_name, last_name, email, phone_number, password } = await req.json();

        //checking if the user in question is there
        const existing = await prisma.user_table.findUnique({where: {email} });
        if (existing) {
            return NextResponse.json({error: "User already exists"}, {status:300});

        }

        await prisma.user_table.create({
            data: {first_name, last_name, email, phone_number, password}
        });

        return NextResponse.json({ success: true});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error:"Signup failed"}, {status:500});
    }


    }
