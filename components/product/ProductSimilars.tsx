import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useCallback, useEffect } from "preact/compat";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

function SimilarSelector({ product }: Props) {

    if (!IS_BROWSER) return null;

    const productSimilars = useSignal<Product[] | null>(null);

    const getSimilars = useCallback(async () => {
        const result = await invoke.vtex.loaders.legacy.relatedProductsLoader({
            crossSelling: "similars",
            id: product.inProductGroupWithID
        });

        productSimilars.value = result;
    }, []);

    useEffect(() => {
        getSimilars();
    }, []);

    if (!productSimilars) return null;
    if (productSimilars.value === null) return null;
    if (productSimilars.value.length === 0) return null;
    
    return (
        <div>
            <ul class="flex flex-row gap-3">
                {productSimilars.value.map((similar) => (
                    <li>
                        <a href={similar.url}>
                            <img src={similar.image[0].url} />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SimilarSelector;