"use client";
import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/ChatInput";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import MD from "@/components/MD";
interface Message {
  id: string;
  is_me: boolean;
  text: string;
  created_at: string; // ISO string or any sortable date format
}

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);

  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const get_messages = async () => {
      setIsThinking(true);
      const fd = new FormData();
      fd.append("conv_id", pathname.split("/")[2]);

      const req = await fetch("/api/get_messages", {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const resp = await req.json();

      if (resp.chats) {
        const chats: Message[] = resp.chats;
        if (chats.length === 0) {
          router.push(`/chat`);
        }
        const msgs: Message[] = [];

        chats.map((chat) => {
          msgs.push({
            id: chat.id,
            created_at: chat.created_at,
            is_me: chat.is_me,
            text: chat.text,
          });
        });

        setMessages(msgs);
        setIsThinking(false);
      }
    };
    get_messages();
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sort messages by datetime ascending
  const sortedMessages = [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (text: string, file: null | File) => {
    setMessages((prev) => [
      ...prev,
      {
        created_at: Date.now().toString(),
        id: Date.now().toString(),
        is_me: true,
        text: text,
      },
    ]);
    setIsThinking(true);
    const fd = new FormData();
    fd.append("text", text);

    fd.append("conv_id", pathname.split("/")[2]);
    if (file) {
      fd.append("file", file as File);
    }

    const req = await fetch("/api/chat", {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    const res = await req.json();

    setIsThinking(false);
    if (res.flag) {
      setMessages((prev) => [
        ...prev,
        {
          created_at: Date.now().toString(),
          id: Date.now().toString(),
          is_me: false,
          text: res.reply,
        },
      ]);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center ">
      {/* Chat Messages Container */}

      {isThinking && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
          <h3 className="text-white text-xl font-semibold">Thinking...</h3>
        </div>
      )}

      <div className="flex-1 w-full md:w-3/5 min-w-[300px] max-w-3xl overflow-y-auto px-4 py-4 mt-4 mb-[90px]">
        {sortedMessages.map((m, idx) => (
          <div
            key={idx}
            className={`flex mb-2 ${m.is_me ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] break-words shadow-sm ${
                m.is_me ? "bg-blue-500 text-white" : "bg-white text-black"
              }`}
            >
              <MD content={m.text} />

              <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date(m.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Fixed at Bottom */}
      <div className="w-full fixed bottom-4 left-1/2 transform -translate-x-1/2 md:w-3/5 px-4">
        <ChatInput submit={handleSubmit} />
      </div>
    </div>
  );
}
