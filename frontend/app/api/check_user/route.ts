import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (token) {
    return NextResponse.json(true);
  } else {
    return NextResponse.json(false);
  }
}
