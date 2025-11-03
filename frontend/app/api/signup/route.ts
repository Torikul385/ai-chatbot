import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();

  const uri = `${process.env.FASTAPI_URI}/signup`;
  const request = await fetch(uri, {
    method: "POST",
    body: fd,
  });

  const data = await request.json();

  return NextResponse.json(data);
}
