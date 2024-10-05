"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { authenticated, user, logout } = usePrivy();
  const router = useRouter();

  return (
    <nav className="border-b bg-gray-400">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">Vox</span>
          </Link>
          <div className="hidden md:block ml-10">
            <div className="flex items-baseline space-x-4">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Create petition
              </Link>
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Sign a petition
              </Link>
            </div>
          </div>
        </div>
        {authenticated && (
          <div>
            <div className="hidden md:block">
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Address</p>
                        <p className="text-xs leading-none text-muted-foreground">{shortenAddress(user?.wallet?.address)}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Button
                        onClick={async () => {
                          await logout();
                          router.push("/");
                        }}
                      >
                        Log out
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
