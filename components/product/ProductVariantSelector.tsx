import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
// import { usePartial } from "apps/website/hooks/usePartial.ts";
import ProductSimilars from "$store/islands/ProductSimilars.tsx";

interface Props {
  product: Product;
}

const allowedNames = [
  "tamanho",
  "cor"
]

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <ul class="flex flex-col gap-4">
      <ProductSimilars product={{...product}} />
      {Object.keys(possibilities).map((name) => {
        if (!allowedNames.includes(name.toLowerCase())) return null;

        return (
          <li class="flex flex-col gap-2">
            <span class="text-sm">{name}</span>
            <ul class="flex flex-row gap-3">
              {Object.entries(possibilities[name]).map(([value, link]) => {
                // const partial = usePartial({ href: link });
  
                return (
                  <li>
                    <a href={link}>
                      <Avatar
                        content={value}
                        variant={link === url
                          ? "active"
                          : link
                          ? "default"
                          : "disabled"}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  );
}

export default VariantSelector;
