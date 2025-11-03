"use client";
import Link from "next/link";
import { useState } from "react";

type UserData = {
  username: string;
  password: string;
  name: string;

  email: string;
  dob: string; // string for HTML date input
  is_male: boolean;
};

export default function Page() {
  const [data, setData] = useState<UserData>({
    username: "",
    password: "",
    name: "",
    email: "",
    dob: "",
    is_male: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("data", JSON.stringify(data));
    const req = await fetch("/api/signup", {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    const res = await req.json();
    if (!req.ok) {
      alert("user created error");
    } else {
      alert("user created successfully");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={data.username}
              onChange={(e) =>
                setData((p) => ({ ...p, username: e.target.value }))
              }
              className="w-full  text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="text"
              value={data.password}
              onChange={(e) =>
                setData((p) => ({ ...p, password: e.target.value }))
              }
              className="w-full text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-gray-900 text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
              className="w-full text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) =>
                setData((p) => ({ ...p, email: e.target.value }))
              }
              className="w-full text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={data.dob}
              onChange={(e) => setData((p) => ({ ...p, dob: e.target.value }))}
              className="w-full text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Gender
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={data.is_male}
                  onChange={() => setData((p) => ({ ...p, is_male: true }))}
                  className="text-gray-900 focus:ring-indigo-400"
                />
                <span className="text-gray-900">Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={!data.is_male}
                  onChange={() => setData((p) => ({ ...p, is_male: false }))}
                  className="text-gray-900 focus:ring-indigo-400"
                />
                <span className="text-gray-900">Female</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-3 text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-lg transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
