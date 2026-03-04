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


export function DropdownMenuIcons({ Logout }: { Logout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image width={30} height={30} alt="user" src={userimage} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          <Link href={"/profile"}>Profile</Link>
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
