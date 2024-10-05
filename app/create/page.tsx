"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();

  const hasIdentity = false; // TODO: Check if the user has an identity onchain

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!authenticated) {
    router.push("/");
    return null; // Prevent rendering the rest of the component
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      {!hasIdentity ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <div>You need to verify yourself first</div>
          <Button
            onClick={() => {
              // opens the verification page in another tab
              window.open("/verify", "_blank");
            }}
          >
            Test
          </Button>
        </div>
      ) : (
        <div>Create page</div>
      )}
    </div>
  );
}
