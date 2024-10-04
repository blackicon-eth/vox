"use client";
import { getEmbeddedConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [message, setMessage] = useState("");
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const embeddedWallet = getEmbeddedConnectedWallet(wallets);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-center items-center gap-8 p-7 bg-gray-800 rounded-md">
        <h1 className="text-4xl font-bold text-center text-wrap text-white">Welcome to the Vox app ✨</h1>
        {ready && !authenticated ? (
          <button
            className="flex bg-violet-600 hover:bg-violet-700 py-3 px-10 text-white rounded-lg text-lg"
            onClick={login}
          >
            Log in
          </button>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <div className="bg-gray-400 px-10 py-3 rounded-md">{embeddedWallet?.chainId}</div>
            <button
              className="flex
            bg-yellow-600 hover:bg-yellow-700 py-3 px-10 text-white rounded-lg text-lg"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        )}
        {authenticated && user && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <label className="text-lg font-bold text-green-400">{user.wallet?.address}</label>
              <label className="text-lg font-bold text-white">Sign with wallet</label>
            </div>
            <div className="flex gap-3 items-center">
              <Input
                type="text"
                placeholder="Enter message to sign"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <button
                className="flex bg-violet-600 hover:bg-violet-700 py-3 px-10 text-white rounded-lg text-lg"
                onClick={async () => {
                  const provider = await embeddedWallet?.getEthereumProvider();
                  console.log(provider);
                  const signature = await provider?.request({
                    method: "personal_sign",
                    params: [message, embeddedWallet?.address],
                  });
                  console.log(signature);
                }}
              >
                Sign
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
