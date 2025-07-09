import { Resend } from 'resend';

export async function POST(req){
    const {to, subject, text} = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY);


    try {
        const data = await resend.emails.send({
            from: 'Medtrack <onboarding@resend.dev>',
            to,
            subject,
            text,
        });
        return Response.json({success: true, data});
    }   catch (error) {
        return Response.json({success: false, error: error.message}, {status: 500});
    }
}