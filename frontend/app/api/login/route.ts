import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const fd = await req.formData();

  const uri = `${process.env.FASTAPI_URI}/login`;
  const request = await fetch(uri, {
    method: "POST",
    body: fd,
  });

  const data = await request.json();
  const res = NextResponse.json(data);

  if (data.flag) {
    // save a cookie
    res.cookies.set("token", data.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 101, // 101 days
      sameSite: "lax",
    });
  }

  return res;
}
