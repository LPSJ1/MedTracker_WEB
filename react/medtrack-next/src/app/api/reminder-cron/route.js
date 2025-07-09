import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    console.log('remincer-cron enpoint calling');
    const now = new Date();
    const oneMinuteLater = new Date(now.getTime() + 60 * 1000);
    const timeStr = oneMinuteLater.toTimeString().slice(0, 5);


    const meds = await prisma.medication.findMany({
        where: {
            time: timeStr,
            taken: false,
        },
        include: {user: true},
    });


    console.log('Med found:', meds.length, meds);

    for (const med of meds) {

    console.log('Sending to:', med.user?.email);

        try {
        await resend.emails.send({
            from: 'Medtrack <onboarding@resend.dev>',
            to: med.user.email,
            subject: 'Medication Reminder',
            text: `Reimnder: Take your medication "${med.name}" at ${med.time}.`,
        });
    } catch (error) {
        console.error('Email error:',error);
    }  
    
    } 

    return Response.json({success:true, count: meds.length});



}