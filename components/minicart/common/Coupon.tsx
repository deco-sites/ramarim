import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  return (
    <div class="flex justify-between items-center px-4">
      <span class="text-sm uppercase text-black">Cupom de desconto</span>
      {display || !coupon
        ? (
          <form
            class="join"
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

              const input = elements.namedItem("coupon") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                await onAddCoupon(text);
                setDisplay(false);
              } finally {
                setLoading(false);
              }
            }}
          >
            <input
              name="coupon"
              class="border border-black rounded-none outline-none w-32 text-xs p-2 join-item placeholder:text-gray-700 placeholder:uppercase"
              type="text"
              value={coupon ?? ""}
              placeholder={"Insira o cupom"}
            />
            <button
              class="border border-black bg-black rounded-none outline-none text-white text-xs uppercase p-2 join-item"
              type="submit"
              htmlFor="coupon"
              loading={loading}
            >
              Adicionar
            </button>
          </form>
        )
        : (
          <Button
            class="btn-ghost underline font-normal"
            onClick={() => setDisplay(true)}
          >
            {coupon || "Adicionar"}
          </Button>
        )}
    </div>
  );
}

export default Coupon;
