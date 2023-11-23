import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator">
      <span
        class={`flex items-center justify-center absolute top-0 right-0 w-4 h-4 bg-white lg:bg-black text-black lg:text-white rounded-full text-xs ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class="btn-circle btn-sm btn-ghost fill-white lg:fill-black hover:bg-transparent"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <svg id="_01_align_center" data-name="01 align center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path id="Caminho_9" data-name="Caminho 9" d="M13.989,4.663a4.663,4.663,0,0,0-9.326,0H0V16.32a2.331,2.331,0,0,0,2.331,2.331H16.32a2.331,2.331,0,0,0,2.331-2.331V4.663ZM9.326,1.554a3.109,3.109,0,0,1,3.109,3.109H6.217A3.109,3.109,0,0,1,9.326,1.554ZM17.1,16.32a.777.777,0,0,1-.777.777H2.331a.777.777,0,0,1-.777-.777V6.217H4.663V7.772H6.217V6.217h6.217V7.772h1.554V6.217H17.1Z"/>
        </svg>
      </Button>
    </div>
  );
}

export default CartButton;
