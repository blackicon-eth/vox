"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, FileUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { hasUserIdentity } from "@/lib/utils";

export default function CreatePetition() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [extendedDescription, setExtendedDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [endDate, setEndDate] = useState("");
  const [goal, setGoal] = useState("");
  const [hasIdentity, setHasIdentity] = useState(false);

  useEffect(() => {
    const checkIdentity = async () => {
      if (user && user.wallet?.address) {
        const identity = await hasUserIdentity(user.wallet.address);
        setHasIdentity(identity);
      }
    };
    checkIdentity();
  }, [user]);

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f0e7d8]">
        <Loader2 className="w-12 h-12 text-[#8b4513] animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.wallet?.address) {
      console.error("User address is not available.");
      return;
    }

    try {
      const { data, error } = await supabase.from("petition").insert([
        {
          creator: user.wallet?.address.toString(),
          name: title,
          description: description,
          extendeddescription: extendedDescription,
          enddate: endDate,
          goal: parseInt(goal, 10),
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
        // You might want to redirect the user or show a success message here
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f0e7d8] p-4 my-14">
      {hasIdentity ? (
        <motion.div
          className="w-full max-w-2xl p-8 bg-[#d3c7a2] rounded-lg shadow-2xl overflow-hidden"
          style={{
            backgroundImage: "url('/background/paper-texture-2.jpg')",
            backgroundBlendMode: "multiply",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-bold text-center text-[#4a2c0f] mb-6">
            Create a New Petition
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-[#4a2c0f]">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#f0e7d8] border-[#8b4513]"
                required
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-[#4a2c0f]">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#f0e7d8] border-[#8b4513]"
                required
              />
            </div>
            <div>
              <Label htmlFor="extendedDescription" className="text-[#4a2c0f]">
                Extended Description
              </Label>
              <Textarea
                id="extendedDescription"
                value={extendedDescription}
                onChange={(e) => setExtendedDescription(e.target.value)}
                className="bg-[#f0e7d8] border-[#8b4513]"
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="text-[#4a2c0f]">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-[#f0e7d8] border-[#8b4513]"
                required
              />
            </div>
            <div>
              <Label htmlFor="goal" className="text-[#4a2c0f]">
                Goal (Signatures)
              </Label>
              <Input
                id="goal"
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="bg-[#f0e7d8] border-[#8b4513]"
                required
                min="1"
                step="1"
              />
            </div>
            <div>
              <Label htmlFor="image" className="text-[#4a2c0f]">
                Upload Image
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="bg-[#f0e7d8] border-[#8b4513]"
                  accept="image/*"
                />
                <FileUp className="w-6 h-6 text-[#8b4513]" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#8b4513] hover:bg-[#6e3710] text-[#f0e7d8]"
            >
              Create Petition
            </Button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="relative w-full max-w-2xl p-12 bg-[#d3c7a2] rounded-lg shadow-2xl overflow-hidden"
          style={{
            backgroundImage: "url('/background/paper-texture-2.jpg')",
            backgroundBlendMode: "multiply",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-2 bg-[#8b4513]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-full h-2 bg-[#8b4513]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          />
          <div className="flex flex-col justify-center items-center gap-8">
            <motion.div
              className="flex flex-col justify-center items-center gap-4"
              variants={titleVariants}
            >
              <h1 className="text-3xl font-bold text-center text-[#4a2c0f] leading-tight">
                Create your onchain identity
              </h1>
              <User className="w-12 h-12 text-[#8b4513]" />
              <p className="text-lg text-center text-[#5e3a1a]">
                Before creating or signing petitions, you need to create an
                onchain identity. Click the button below, follow the
                instructions, and come back here.
              </p>
            </motion.div>
            <motion.button
              className="flex items-center justify-center bg-[#8b4513] hover:bg-[#6e3710] py-3 px-10 text-[#f0e7d8] rounded-lg text-lg font-semibold shadow-md"
              onClick={() => {
                // Redirect to the identity creation page _blank
                window.open("/verify", "_blank");
              }}
              variants={buttonVariants}
              whileHover="hover"
            >
              Create Identity
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
