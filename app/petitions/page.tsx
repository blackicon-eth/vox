"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { usePrivy } from "@privy-io/react-auth";
import { Petition } from "@/lib/supabase/types";
import { shortenAddress } from "@/lib/utils";

export default function PetitionList() {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(
    null
  );
  const [showUserPetitions, setShowUserPetitions] = useState(false);
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  const itemsPerPage = 10;

  const fetchPetitions = useCallback(async () => {
    if (!authenticated) return;

    setLoading(true);
    let query = supabase.from("petition").select("*", { count: "exact" });

    if (showUserPetitions && user?.wallet?.address) {
      query = query.eq("creator", user.wallet.address.toString());
    }

    const { data, error, count } = await query.range(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage - 1
    );

    if (error) {
      console.error("Error fetching petitions:", error);
    } else {
      setPetitions(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    }
    setLoading(false);
  }, [
    currentPage,
    itemsPerPage,
    showUserPetitions,
    authenticated,
    user?.wallet?.address,
  ]);

  useEffect(() => {
    if (authenticated) {
      fetchPetitions();
    }
  }, [authenticated, currentPage, fetchPetitions, showUserPetitions]);

  if (!ready) {
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

  return (
    <motion.div
      className="min-h-screen bg-[#f0e7d8] p-8"
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
          <h1 className="text-3xl font-bold text-center text-[#4a2c0f] mb-6">
            {showUserPetitions ? "My Petitions" : "Active Petitions"}
          </h1>
          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="user-petitions"
                checked={showUserPetitions}
                onCheckedChange={setShowUserPetitions}
              />
              <Label htmlFor="user-petitions">Show only my petitions</Label>
            </div>
          </div>
          {loading ? (
            <motion.div
              className="flex justify-center items-center h-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="w-12 h-12 text-[#8b4513] animate-spin" />
            </motion.div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[#4a2c0f] text-xl">Name</TableHead>
                  <TableHead className="text-[#4a2c0f] text-xl">
                    Creator
                  </TableHead>
                  <TableHead className="text-[#4a2c0f] text-xl">
                    End Date
                  </TableHead>
                  <TableHead className="text-[#4a2c0f] text-xl">
                    Signatures Goal
                  </TableHead>
                  <TableHead className="text-[#4a2c0f] text-xl">
                    Current Signatures
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {petitions.map((petition) => (
                  <TableRow
                    key={petition.id}
                    onClick={() => setSelectedPetition(petition)}
                    className="cursor-pointer hover:bg-[rgba(229,231,235,0.5)]"
                  >
                    <TableCell className="text-[#5e3a1a] text-md">
                      {petition.name}
                    </TableCell>
                    <TableCell className="text-[#5e3a1a] text-md">
                      {shortenAddress(petition.creator)}
                    </TableCell>
                    <TableCell className="text-[#5e3a1a] text-md">
                      {new Date(petition.enddate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-[#5e3a1a] text-md">
                      {petition.goal}
                    </TableCell>
                    <TableCell className="text-[#5e3a1a] text-md">
                      {petition.votes || 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="flex justify-between items-center py-2 px-4 bg-[#8b4513] text-[#f0e7d8]">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="ghost"
            className="text-[#f0e7d8] hover:text-[#d3c7a2]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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
          <Dialog
            open={!!selectedPetition}
            onOpenChange={() => setSelectedPetition(null)}
          >
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
                  <strong>Extended Description:</strong>{" "}
                  {selectedPetition.extendeddescription}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(selectedPetition.enddate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Signatures Goal:</strong> {selectedPetition.goal}
                </p>
                <p>
                  <strong>Current Signatures:</strong>{" "}
                  {selectedPetition.votes || 0}
                </p>
              </div>
              <DialogFooter>
                {selectedPetition.creator === user?.wallet?.address ? (
                  <div>
                    <Button
                      onClick={() => console.log("Edit petition")}
                      className="bg-[#8b4513] hover:bg-[#6e3710] text-[#f0e7d8]"
                    >
                      Edit Petition
                    </Button>
                    <Button
                      onClick={() => console.log("Delete petition")}
                      className="bg-[#5e3a1a] hover:bg-[#4a2c0f] text-[#f0e7d8]"
                    >
                      Delete Petition
                    </Button>
                  </div>
                ) : (
                  <div>
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
                  </div>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
