"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2, Feather, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { usePrivy } from "@privy-io/react-auth";
import { Petition } from "@/lib/supabase/types";

const mockedPetitions: Petition[] = [
  {
    id: 1,
    creator: "John Doe",
    name: "Save the Rainforest",
    description: "A petition to save the rainforest from deforestation.",
    extendeddescription: "The rainforest is home to many species of plants and animals.",
    enddate: "2023-12-31",
    goal: 1000,
  },
  {
    id: 2,
    creator: "Jane Smith",
    name: "Protect Ocean Life",
    description: "A petition to protect ocean life from pollution.",
    extendeddescription: "The ocean is home to many species of fish and other marine life.",
    enddate: "2023-11-30",
    goal: 2000,
  },
];

export default function PetitionList() {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  const itemsPerPage = 10;

  const fetchMockedPetitions = useCallback(async () => {
    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      setPetitions(mockedPetitions);
      setTotalPages(1);
      setLoading(false);
    }, 1000);
  }, []);

  const fetchPetitions = useCallback(async () => {
    setLoading(true);
    const { data, error, count } = await supabase
      .from("petition")
      .select("*", { count: "exact" })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (error) {
      console.error("Error fetching petitions:", error);
    } else {
      console.log("Fetched petitions:", data);
      setPetitions(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    }
    setLoading(false);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchPetitions();
  }, [currentPage, fetchPetitions]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen bg-[#f0e7d8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Loader2 className="w-12 h-12 text-[#8b4513] animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[#f0e7d8] font-serif p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-6xl mx-auto bg-[#d3c7a2] rounded-lg shadow-2xl overflow-hidden"
        style={{
          backgroundImage: "url('/background/paper-texture-2.jpg')",
          backgroundBlendMode: "multiply",
        }}
        variants={tableVariants}
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-[#4a2c0f] mb-6">Active Petitions</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#4a2c0f] text-xl">Name</TableHead>
                <TableHead className="text-[#4a2c0f] text-xl">Creator</TableHead>
                <TableHead className="text-[#4a2c0f] text-xl">End Date</TableHead>
                <TableHead className="text-[#4a2c0f] text-xl">Signatures Goal</TableHead>
                <TableHead className="text-[#4a2c0f] text-xl">Signed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {petitions.map((petition) => (
                <tr
                  key={petition.id}
                  onClick={() => setSelectedPetition(petition)}
                  className="cursor-pointer hover:bg-[rgba(229,231,235,0.5)]"
                >
                  <TableCell className="text-[#5e3a1a] text-md">{petition.name}</TableCell>
                  <TableCell className="text-[#5e3a1a] text-md">{petition.creator}</TableCell>
                  <TableCell className="text-[#5e3a1a] text-md">{new Date(petition.enddate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-[#5e3a1a] text-md">{petition.goal}</TableCell>
                  <TableCell className="text-[#5e3a1a] text-md">Yes</TableCell>
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center p-4 bg-[#8b4513] text-[#f0e7d8]">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="ghost"
            className="text-[#f0e7d8] hover:text-[#d3c7a2]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="ghost"
            className="text-[#f0e7d8] hover:text-[#d3c7a2]"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPetition && (
          <Dialog open={!!selectedPetition} onOpenChange={() => setSelectedPetition(null)}>
            <DialogContent
              className="bg-[#d3c7a2] text-[#4a2c0f]"
              style={{
                backgroundImage: "url('/background/paper-texture-2.jpg')",
                backgroundBlendMode: "multiply",
              }}
            >
              <DialogHeader>
                <DialogTitle>{selectedPetition.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p>
                  <strong>Creator:</strong> {selectedPetition.creator}
                </p>
                <p>
                  <strong>Description:</strong> {selectedPetition.description}
                </p>
                <p>
                  <strong>Extended Description:</strong> {selectedPetition.extendeddescription}
                </p>
                <p>
                  <strong>End Date:</strong> {new Date(selectedPetition.enddate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Signatures Goal:</strong> {selectedPetition.goal}
                </p>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => console.log("Sign anonymously")}
                  className="bg-[#8b4513] hover:bg-[#6e3710] text-[#f0e7d8]"
                >
                  Sign Anonymously
                </Button>
                <Button
                  onClick={() => console.log("Sign as doxxed")}
                  className="bg-[#5e3a1a] hover:bg-[#4a2c0f] text-[#f0e7d8]"
                >
                  Sign as Doxxed
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
