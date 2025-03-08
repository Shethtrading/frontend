"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminAccess({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const sessionPass = sessionStorage.getItem("admin_auth");
    if (sessionPass === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      sessionStorage.setItem("admin_auth", password);
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg mb-4">Enter Admin Password</h2>
        <input
          type="password"
          className="w-full p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button onClick={handleLogin} className="mt-4 bg-blue-600 px-4 py-2 rounded">
          Submit
        </button>
        <button onClick={() => router.push("/")} className="mt-2 block text-sm text-gray-400">
          Back to Home
        </button>
      </div>
    </div>
  );
}
