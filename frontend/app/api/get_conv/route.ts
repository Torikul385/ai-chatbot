import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const token = req.cookies.get("token")?.value as string;

  if (!token) {
    return NextResponse.json({
      flag: false,
      reply: "",
    });
  }

  fd.append("username", token);
  const request = await fetch(`${process.env.FASTAPI_URI}/get_conv`, {
    method: "POST",
    body: fd,
  });

  const data = await request.json();

  return NextResponse.json(data);
}
