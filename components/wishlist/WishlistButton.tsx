import { useComputed, useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useWishlist } from "apps/vtex/hooks/useWishlist.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
}

function WishlistButton({
  variant = "icon",
  productGroupID,
  productID,
}: Props) {
  const { user } = useUser();
  const item = { sku: productID, productId: productGroupID };
  const { loading, addItem, removeItem, getItem } = useWishlist();
  const listItem = useComputed(() => getItem(item));
  const fetching = useSignal(false);

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  const clickHandle = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isUserLoggedIn) {
      window.alert("Please log in before adding to your wishlist");

      return;
    }

    if (loading.value) {
      return;
    }

    try {
      fetching.value = true;
      inWishlist
        ? await removeItem({ id: listItem.value!.id }!)
        : await addItem(item);
    } finally {
      fetching.value = false;
    }
  }

  if (variant === "icon") {
    return (
      <Button
        class="btn-circle btn-ghost gap-2"
        loading={fetching.value}
        aria-label="Add to wishlist"
        onClick={clickHandle}
      >
        <Icon
          id="Heart"
          size={24}
          strokeWidth={2}
          fill={inWishlist ? "black" : "none"}
        />
      </Button>
    )
  }
  
  if (variant === "full") {
    return (
      <button
        class="flex items-center gap-1 text-sm font-semibold"
        loading={fetching.value}
        aria-label="Add to wishlist"
        onClick={clickHandle}
      >
        <Icon
          id="Heart"
          size={21}
          strokeWidth={2}
          fill={inWishlist ? "black" : "none"}
        />
        {inWishlist ? 
          "Remover da lista de Favoritos" : 
          "Colocar na lista de Favoritos"
        }
      </button>
    )
  }

  return null;
}

export default WishlistButton;
