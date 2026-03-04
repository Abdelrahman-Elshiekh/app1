import { use } from "react";
import UserOrdersClient from "./UserOrdersClient";

export default function UserOrdersPage({
  params,
}: {
  params: Promise<{ cartOwner: string }>;
}) {
  const resolvedParams = use(params);
  const userid = resolvedParams.cartOwner;

  console.log("Cart Owner:", userid);

  if (!userid) {
    return <p>Cart owner ID not found</p>;
  }

  return <UserOrdersClient cartOwner={userid} />;
}
