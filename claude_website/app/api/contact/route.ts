import { NextRequest } from 'next/server';

/**
 * Contact form submission endpoint.
 *
 * Currently stubbed — returns a success response without sending any email.
 *
 * To wire up email delivery:
 * 1. Install Resend: `npm install resend`
 * 2. Add RESEND_API_KEY to .env.local
 * 3. Replace the stub with:
 *    import { Resend } from 'resend';
 *    const resend = new Resend(process.env.RESEND_API_KEY);
 *    await resend.emails.send({
 *      from: 'noreply@cego-ceramics.com',
 *      to: 'hello@cego-ceramics.com',
 *      subject: `New inquiry: ${body.inquiryType}`,
 *      text: JSON.stringify(body, null, 2),
 *    });
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.email || !body.name) {
      return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: replace stub with real email delivery (see comments above)
    console.log('[contact] Received submission:', { name: body.name, email: body.email, inquiryType: body.inquiryType });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
