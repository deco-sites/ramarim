import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col items-center gap-6">
            <svg id="_01_align_center" data-name="01 align center" xmlns="http://www.w3.org/2000/svg" width="68.332" height="68.332" viewBox="0 0 68.332 68.332">
              <path id="Caminho_9" data-name="Caminho 9" d="M51.249,17.083a17.083,17.083,0,0,0-34.166,0H0V59.791a8.542,8.542,0,0,0,8.542,8.542H59.791a8.542,8.542,0,0,0,8.542-8.542V17.083ZM34.166,5.694A11.389,11.389,0,0,1,45.555,17.083H22.777A11.389,11.389,0,0,1,34.166,5.694Zm28.472,54.1a2.847,2.847,0,0,1-2.847,2.847H8.542a2.847,2.847,0,0,1-2.847-2.847V22.777H17.083v5.694h5.694V22.777H45.555v5.694h5.694V22.777H62.638Z"/>
            </svg>
            <span class="block text-center font-medium text-[17px] uppercase max-w-[130px]">Sua sacola está vazia</span>
            <button
              class="text-sm py-4 px-12 uppercase border-black bg-black text-white rounded-none"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Ver produtos
            </button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            {/* <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div> */}

            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full" style="box-shadow: 0 0 10px rgba(0,0,0,.15);">
              <div class="border-b border-base-200 py-4">
                <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
              </div>
              <div class="flex flex-col gap-y-4 px-4 pt-4">
                {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <div class="w-full flex justify-between text-base">
                  <span class="uppercase">Subtotal</span>
                  <span>
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>
                <div class="flex justify-between items-center w-full">
                  <span class="uppercase">Total</span>
                  <span class="font-bold text-lg text-black">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
              </div>

              <div class="p-4">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="rounded-none outline-none w-full bg-black text-xl uppercase text-white p-4 font-light leading-none h-auto"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Finalizar Compra
                  </Button>
                  <span class="block text-xs text-black uppercase text-center mt-1">
                    *Taxas e fretes serão calculados no checkout
                  </span>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
