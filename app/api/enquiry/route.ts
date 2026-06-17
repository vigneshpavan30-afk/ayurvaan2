import { NextRequest, NextResponse } from "next/server";

// Forwards an enquiry to the Google Apps Script webhook, which appends it to the
// Sheet and emails the admin. Kept server-side so the script URL stays private
// and we avoid browser CORS issues with script.google.com.
export async function POST(req: NextRequest) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "GOOGLE_SCRIPT_URL is not configured." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }

  const payload = {
    name,
    email,
    phone: String(body.phone ?? "").trim(),
    occasion: String(body.occasion ?? "").trim(),
    date: String(body.date ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Webhook returned an error.", data },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Could not reach the enquiry webhook." },
      { status: 502 }
    );
  }
}
