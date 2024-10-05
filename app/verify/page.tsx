"use client";
import { verify } from "@/lib/zkpass";
import { useAccount, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { AttestationABI } from "@/lib/abi/AttestationABI";
import { contractAddress, mockedData } from "@/lib/constants";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { authenticated, ready, user } = usePrivy();
  const account = useAccount();
  const router = useRouter();
  const { writeContract } = useWriteContract();

  // A function that starts the zkpass verification process and mints a token
  // if the verification goes well and the mintToken checkbox is checked
  const handleVerify = async () => {
    // Verify
    const { response, message } = await verify(
      process.env.NEXT_PUBLIC_APP_ID!,
      process.env.NEXT_PUBLIC_SCHEMA_ID!,
      account.address
    );

    // If the response is null, show an alert with the message
    if (!response && user?.wallet?.address) {
      //alert(message);
      try {
        const hexTaskId = ethers.hexlify(ethers.toUtf8Bytes(mockedData.taskId)) as `0x${string}`; // to hex
        const hexSchemaId = ethers.hexlify(ethers.toUtf8Bytes(process.env.NEXT_PUBLIC_SCHEMA_ID!)) as `0x${string}`; // to hex

        const args = {
          taskId: hexTaskId,
          schemaId: hexSchemaId,
          uHash: mockedData.uHash as `0x${string}`,
          recipient: user.wallet.address as `0x${string}`,
          publicFieldsHash: mockedData.publicFieldsHash as `0x${string}`,
          validator: mockedData.validatorAddress as `0x${string}`,
          allocatorSignature: mockedData.allocatorSignature as `0x${string}`,
          validatorSignature: mockedData.validatorSignature as `0x${string}`,
        };

        writeContract({
          address: contractAddress,
          abi: AttestationABI,
          functionName: "attest",
          args: [args],
        });
      } catch (err) {
        alert(JSON.stringify(err));
        console.log("error", err);
      }
      return;
    }

    // Log the response and, if the mintToken checkbox is checked, mint a token
    console.log("Transgate response: ", response);
    if (response && response.recipient) {
      try {
        const hexTaskId = ethers.hexlify(ethers.toUtf8Bytes(response.taskId)) as `0x${string}`; // to hex
        const hexSchemaId = ethers.hexlify(ethers.toUtf8Bytes(process.env.NEXT_PUBLIC_SCHEMA_ID!)) as `0x${string}`; // to hex

        const args = {
          taskId: hexTaskId,
          schemaId: hexSchemaId,
          uHash: response.uHash,
          recipient: response.recipient,
          publicFieldsHash: response.publicFieldsHash,
          validator: response.validatorAddress,
          allocatorSignature: response.allocatorSignature,
          validatorSignature: response.validatorSignature,
        };

        writeContract({
          address: contractAddress,
          abi: AttestationABI,
          functionName: "attest",
          args: [args],
        });
      } catch (err) {
        alert(JSON.stringify(err));
        console.log("error", err);
      }
    }
  };

  if (ready && !authenticated) {
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 pb-20 sm:p-14 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <div className="flex flex-col gap-1 justify-center items-center mb-12">
        <h1 className="text-4xl font-bold">zkPass Schema SDK Tester</h1>
        <p className="text-sm text-center">
          A simple app that tests the schema verification process using TransGate and the SDK.
        </p>
      </div>

      {/* Verify button, Connect button and minting checkbox */}
      <div className="flex gap-4 mt-8 items-center">
        <button
          className={`${!account.address ? "bg-gray-400" : "bg-yellow-300"} px-5 py-2 text-black rounded-md`}
          onClick={handleVerify}
          disabled={!account.address}
        >
          Verify
        </button>
      </div>
    </div>
  );
}
