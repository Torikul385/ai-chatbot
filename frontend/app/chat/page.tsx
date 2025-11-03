"use client";
import ChatInput from "@/components/ChatInput";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const check_user = async () => {
      const req = await fetch("/api/check_user", {
        method: "POST",
        credentials: "include",
      });

      const res = await req.json();
      if (res) {
        // do nothing
      } else {
        router.push("/");
      }
    };

    check_user();
  }, []);
  const handleSubmit = async (text: string, file: null | File) => {
    const fd = new FormData();
    fd.append("text", text);
    fd.append("username", "torikul");
    if (file) {
      fd.append("file", file as File);
    }

    const req = await fetch("/api/conv", {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    const res = await req.json();

    if (res.flag && res.conv_id) {
      router.push(`chat/${res.conv_id}`);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center -mt-20 h-screen">
        <ChatInput submit={handleSubmit} />
      </div>
    </div>
  );
}
