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
  const request = await fetch(`${process.env.FASTAPI_URI}/chat`, {
    method: "POST",
    body: fd,
  });

  const data = await request.json();

  if (data.reply) {
    return NextResponse.json({
      flag: true,
      reply: data.reply,
    });
  } else {
    return NextResponse.json({
      flag: false,
      reply: "",
    });
  }
}
