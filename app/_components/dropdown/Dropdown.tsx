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
          {cartOwner ? (
            <DropdownMenuItem>
              <UserIcon className="mr-2" />
              <Link href={`/userorders/${cartOwner}`}>See My Orders</Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem disabled>
              <UserIcon className="mr-2" />
              Loading Orders...
            </DropdownMenuItem>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={Logout} variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}





//
// import {
//   CreditCardIcon,
//   LogOutIcon,
//   SettingsIcon,
//   UserIcon,
// } from "lucide-react"

// export function DropdownMenuIcons({ Logout }: { Logout: () => void }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline"><Image width={30} height={30} alt='user' src={userimage}/></Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         <DropdownMenuItem>
//  <Link href={"/profile"}>
//    <UserIcon />
//     Profile
//  </Link>;
//           
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={Logout} variant="destructive">
//           <LogOutIcon />
//           Log out
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
