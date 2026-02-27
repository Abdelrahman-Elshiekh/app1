import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
export default function Loading() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing Product...</ItemTitle>
        </ItemContent>
        
      </Item>
    </div>
  );
}
