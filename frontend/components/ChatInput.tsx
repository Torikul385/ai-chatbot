"use client";

import { Send, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

type ChatInputType = {
  submit: (text: string, file: File | null) => void;
};

export default function ChatInput({ submit }: ChatInputType) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<null | HTMLInputElement>(null);
  const isActive = text.trim().length > 0;

  return (
    <div className="w-full  min-w-[300px] px-4 md:w-3/5 m-auto">
      <div className="border-[1px] border-zinc-400 bg-zinc-800 flex p-3 rounded-md items-center">
        <div>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (!["application/pdf", "text/plain"].includes(file.type)) {
                  alert("Only PDF and TXT files are allowed!");
                  e.target.value = "";
                  return;
                }
                setFile(file);
              }
            }}
            accept=".pdf, .txt"
            className="hidden"
            name=""
            id=""
            ref={ref}
          />

          <button
            onClick={() => {
              ref.current?.click();
            }}
            type="button"
          >
            <Upload />
          </button>
        </div>
        <div className="w-full">
          <input
            className="w-full p-2 outline-none"
            placeholder="Ask anything"
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            name=""
            id=""
          />
        </div>
        <div>
          <button
            onClick={() => {
              if (text.trim().length) {
                submit(text, file);
                setFile(null);
                setText("");
              }
            }}
            type="button"
          >
            <Send
              className={`${isActive ? "cursor-pointer" : "text-slate-700"}`}
            />
          </button>
        </div>
      </div>
      <div className="mt-1">
        {file && (
          <div className="flex items-center gap-1 ">
            <button
              onClick={() => {
                setFile(null);
              }}
              type="button"
              className="p-1 rounded-full "
            >
              <X className="w-10 w-10 text-gray-600 hover:text-gray-300 cursor-pointer" />
            </button>
            <span className="text-sm">{file.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
