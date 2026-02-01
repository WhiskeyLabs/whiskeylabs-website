import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Send Email via Resend
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'Whiskey Labs Contact <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL || 'your-email@example.com',
            subject: `New Transmission from ${name}`,
            text: `Identity: ${name}\nChannel: ${email}\nPayload: ${message}`,
            replyTo: email,
        });

        if (emailError) {
            console.error('Resend Error:', emailError);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        // 2. Optional: Slack Notification (if SLACK_WEBHOOK_URL is provided)
        if (process.env.SLACK_WEBHOOK_URL) {
            await fetch(process.env.SLACK_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: `🚀 *New Lead Inbound*\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`,
                }),
            });
        }

        return NextResponse.json({ success: true, data: emailData });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
