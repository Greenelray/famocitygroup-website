import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { message: "Please complete your name, email, and message before submitting." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Thank you for reaching out to Famocity. We will get back to you shortly."
  });
}
