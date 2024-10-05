import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "Vox",
    other: {
      ...(await fetchMetadata(
        // provide a full URL to your /frames endpoint
        new URL("/frames", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
      )),
    },
  };
}

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-start pt-10 bg-[#f0e7d8]">{"You should not be here :)"}</div>
  );
}
