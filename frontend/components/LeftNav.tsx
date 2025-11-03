"use client";
import { MessageCirclePlus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

type ConvType = {
  id: string;
  text: string;
};
export default function LeftNav() {
  const router = useRouter();
  const [convs, setConvs] = useState<ConvType[]>([]);
  useEffect(() => {
    const get_conv = async () => {
      const fd = new FormData();

      const req = await fetch("/api/get_conv", {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      const res = await req.json();

      const conversations: ConvType[] = res;
      const convers: ConvType[] = [];
      conversations.map((conv) => {
        if (conv.text.length) {
          convers.push(conv);
        }
      });
      setConvs(convers);
    };
    get_conv();
    //
  }, []);
  const button_css =
    "block text-left w-full p-3 hover:bg-zinc-800 cursor-pointer";
  return (
    <div className=" max-h-screen overflow-y-auto min-w-[250px]">
      <div className="sticky top-0 z-20 bg-gray-800 py-3">
        <div>
          <button
            type="button"
            onClick={() => {
              router.push("/chat");
            }}
            className={button_css + " flex items-center gap-2"}
          >
            <MessageCirclePlus />
            <Link href="/chat" className="inline-flex block items-center">
              New Chat
            </Link>
          </button>
        </div>

        <div></div>
        <div>
          <h3 className={`p-2 text-center text-xl`}>Chat History</h3>
        </div>
      </div>

      <div>
        {convs.map((conv) => {
          return (
            <Link
              className={`${button_css}`}
              href={`/chat/${conv.id}`}
              key={conv.id}
            >
              {conv.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

type ChatType = {
  title: string;
  text: string;
};

const chats: ChatType[] = [
  { title: "Welcome Message", text: "Hey there! How can I help you today?" },
  { title: "User Question", text: "Can you explain how to use React hooks?" },
  {
    title: "Assistant Reply",
    text: "Sure! Hooks let you use state and lifecycle in functional components.",
  },
  {
    title: "Next.js Routing",
    text: "How do I create dynamic routes in Next.js?",
  },
  {
    title: "Next.js Answer",
    text: "Use the [id].tsx syntax inside the pages folder for dynamic routing.",
  },
  { title: "Python Help", text: "Whats a generator in Python?" },
  {
    title: "Python Answer",
    text: "A generator is a function that yields values lazily using the `yield` keyword.",
  },
  { title: "AI Project", text: "Give me ideas for AI agent projects." },
  {
    title: "AI Ideas",
    text: "You can try chatbot, sentiment analyzer, or document summarizer apps.",
  },
  {
    title: "Frontend Question",
    text: "How can I integrate Tailwind with Next.js?",
  },
  {
    title: "Frontend Answer",
    text: "Install Tailwind, set up `postcss.config.js`, and include styles in `_app.tsx`.",
  },
  {
    title: "Database Query",
    text: "How do I connect to PostgreSQL using Prisma?",
  },
  {
    title: "Database Answer",
    text: "Set your connection URL in `.env` and run `npx prisma generate`.",
  },
  { title: "TypeScript Question", text: "What is a type alias in TypeScript?" },
  {
    title: "TypeScript Answer",
    text: "A type alias lets you name a custom type using `type MyType = {...}`.",
  },
  { title: "OOP Concept", text: "What is polymorphism in OOP?" },
  {
    title: "OOP Answer",
    text: "Polymorphism allows objects to be treated as instances of their parent class.",
  },
  { title: "Machine Learning", text: "How does gradient descent work?" },
  {
    title: "ML Answer",
    text: "It iteratively updates parameters to minimize the loss function.",
  },
  {
    title: "React Question",
    text: "Whats the difference between props and state?",
  },
  {
    title: "React Answer",
    text: "Props are external inputs, while state is internal data managed by the component.",
  },
  { title: "FastAPI", text: "How to create a POST endpoint in FastAPI?" },
  {
    title: "FastAPI Answer",
    text: "Use `@app.post('/path')` and define a function that takes a request body model.",
  },
  { title: "Docker Question", text: "How do I containerize a Python app?" },
  {
    title: "Docker Answer",
    text: "Write a Dockerfile, build it with `docker build`, and run it using `docker run`.",
  },
  { title: "Git Question", text: "How to undo the last commit?" },
  {
    title: "Git Answer",
    text: "Use `git reset --soft HEAD~1` to undo while keeping changes staged.",
  },
  { title: "Linux Question", text: "How can I list all running processes?" },
  { title: "Linux Answer", text: "Use the `ps aux` or `top` command." },
  {
    title: "Closing Message",
    text: "Thanks for chatting! Have a great day 🚀",
  },
];
