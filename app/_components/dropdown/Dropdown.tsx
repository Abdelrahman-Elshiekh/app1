
import userimage from '../../../assets/images/user.png'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import Link from "next/link";

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { useQuery } from '@tanstack/react-query';
import { CartInterface } from '@/app/types/cart-interface';


export function DropdownMenuIcons({ Logout }: { Logout: () => void }) {

const {
    data: cartdata,
    isLoading,
    isError,
  } = useQuery<CartInterface>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const resp = await fetch("/api/cart");
      const payload = await resp.json();
      return payload;
    },
  });
  const cartOwner = cartdata?.data?.cartOwner;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image width={30} height={30} alt="user" src={userimage} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <DropdownMenuItem disabled={!cartOwner}>
            <UserIcon className="mr-2" />
            {cartOwner ? (
              <Link href={`/userorders/${cartOwner}`}>See My Orders</Link>
            ) : (
              <span className="text-gray-400 cursor-not-allowed">
                See My Orders
              </span>
            )}
          </DropdownMenuItem>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={Logout} variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}




