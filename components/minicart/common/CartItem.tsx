import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {

  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="grid grid-rows-1 gap-2"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        style={{ aspectRatio: "185 / 154" }}
        width={185}
        height={154}
        class="h-full object-contain"
      />
      <div class="flex flex-col gap-2">
        <span class="block text-sm text-black">{name}</span>
        <div class="flex items-center gap-2">
          <span class="line-through text-gray-300 text-sm">
            {formatPrice(list, currency, locale)}
          </span>
          <span class="text-base text-black font-bold">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;
  
              await onUpdateQuantity(quantity, index);
  
              if (analyticsItem) {
                analyticsItem.quantity = diff;
  
                sendEvent({
                  name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: { items: [analyticsItem] },
                });
              }
            })}
          />
        <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square hover:bg-transparent"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25.364" height="27.669" viewBox="0 0 25.364 27.669" class="max-w-[17px]">
              <path id="fi-rs-trash-xmark" d="M26.364,4.612H19.446V2.306A2.308,2.308,0,0,0,17.14,0H10.223A2.308,2.308,0,0,0,7.917,2.306V4.612H1V6.917H2.9L4.859,24.592A3.456,3.456,0,0,0,8.3,27.669H19.023a3.453,3.453,0,0,0,3.437-3.077L24.423,6.917h1.939V4.612ZM10.223,2.306H17.14V4.612H10.223Zm9.945,22.032a1.151,1.151,0,0,1-1.146,1.026H8.3a1.152,1.152,0,0,1-1.146-1.026L5.215,6.917H22.1l-1.936,17.42ZM9.12,19.072l2.932-2.932L9.12,13.209l1.63-1.63,2.932,2.932,2.932-2.932,1.63,1.63L15.312,16.14l2.932,2.932-1.63,1.63-2.932-2.932L10.75,20.7Z" transform="translate(-1)"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
