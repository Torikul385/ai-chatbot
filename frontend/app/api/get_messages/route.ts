import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const request = await fetch(`${process.env.FASTAPI_URI}/get_messages`, {
    method: "POST",
    body: fd,
  });

  const data = await request.json();
  return NextResponse.json(data);
}
