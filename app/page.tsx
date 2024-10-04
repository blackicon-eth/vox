"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push("/verify");
    }
  }, [authenticated, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-center items-center gap-8 p-8 bg-gray-800 rounded-md">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-bold text-center text-wrap text-white">Welcome to the Vox app ✒️</h1>
          <div className="text-white text-md text-center">Create and sign reliable petitions in a totally anonymous way</div>
        </div>
        {ready && (
          <button
            className="flex bg-violet-600 hover:bg-violet-700 py-3 px-10 text-white rounded-lg text-lg"
            onClick={login}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
}
