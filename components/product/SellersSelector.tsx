import { invoke } from "../../runtime.ts";
import { Product } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";
import { formatPrice } from "$store/sdk/format.ts";
import { useCallback, useEffect } from "preact/compat";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

const LOADING_TIME = 1000;

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function getSimulationVariables(simulation: SimulationOrderForm) {
    const {
        purchaseConditions: {
            itemPurchaseConditions: [{
                slas: [{
                    price,
                    shippingEstimate
                }]
            }]
        }
    } = simulation;

    const days = parseInt(shippingEstimate.replace(/[^0-9]+/, ""));

    return { price, days };
} 

function orderMethods(simulations: SimulationOrderForm[]): SimulationOrderForm[] {
    if (simulations.length <= 1) return simulations;
  
    const pivot = simulations[0];
    const leftArr = [];
    const rightArr = [];
  
    for (let index = 1; index < simulations.length; index++) {
        const currSimulation = getSimulationVariables(simulations[index]);
        const pivotSimulation = getSimulationVariables(pivot);
        if (
            currSimulation.price <= pivotSimulation.price &&
            currSimulation.days <= pivotSimulation.days
        ) leftArr.push(simulations[index]);
        else rightArr.push(simulations[index]);
    }
  
    return [...orderMethods(leftArr), pivot, ...orderMethods(rightArr)];
}

function SellerCard({
    productName: name,
    productUrl: url,
    productGroupID,
    method
}) {
    console.log("METHOD:", method);
    console.log("NAME:", name);
    console.log("URL:", url);
    const {
        purchaseConditions: {
            itemPurchaseConditions: [{
                id,
                price,
                listPrice,
                seller,
                slas: [{
                    price: shippingPrice,
                    shippingEstimate
                }]
            }]
        }
    } = method;

    const discount = price && listPrice ? listPrice - price : 0;

    return (
        <li class="block border-b border-white last:border-none pb-3">
            <div class="flex justify-between items-start pb-2">
                <div class="flex flex-col gap-1">
                    <div class="flex items-baseline text-base font-semibold gap-1">
                        Frete:
                        <span class={`text-xl font-semibold ${
                            shippingPrice === 0 ? "text-[#16b90b]" : "text-white"
                        }`}>
                            {shippingPrice === 0 ? "Grátis" : (
                                formatPrice(shippingPrice / 100, "BRL", "pt-BR")
                            )}
                        </span>
                    </div>
                    <span class="text-xs text-[#919191]">Em até {formatShippingEstimate(shippingEstimate)}</span>
                </div>
                <AddToCartButtonVTEX
                    url={url || ""}
                    name={name}
                    productID={id}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                    seller={seller}
                />
            </div>
            <div class="flex items-baseline text-sm gap-1">
                <span>Vendido por:</span>
                <span class="text-base font-semibold uppercase">{seller}</span>
            </div>
        </li>
    )
}

export default function SellersSelector(product: Product) {
    const loading = useSignal<boolean>(false);
    const simulateResult = useSignal<SimulationOrderForm[] | null>(null);
    const {
      url,
      name = "",
      isVariantOf
    } = product;

    const productGroupID = isVariantOf?.productGroupID ?? "";

    const getSellers = useCallback(async () => {
        loading.value = true;
        const simulations = [];
        const sellers = product.offers.offers.filter((offer) => {
            return offer.inventoryLevel.value > 0;
        });

        for (const index in sellers) {
            simulations.push(invoke.vtex.actions.cart.simulation({
                items: [{
                    id: product.productID,
                    quantity: 1,
                    seller: sellers[index].seller,
                }],
                postalCode: "12942500",
                country: "BRA"
            }));
        }

        try {
            const result = await Promise.all(simulations);
            simulateResult.value = result;
        } finally {
            setTimeout(() => loading.value = false, LOADING_TIME);
        }
    }, []);

    useEffect(() => {
        getSellers();
    }, [product]);

    if (simulateResult.value === null) return null;
    if (simulateResult.value.length === 0) return null;

    const methods = orderMethods(simulateResult.value);
    
    return (
        <ul class="flex flex-col gap-4 p-4 mt-4 bg-black text-white">
            <span class="block uppercase">Outras ofertas de vendedores Ramarim</span>
            {
                loading.value ?
                        <div class="w-full flex items-center justify-center h-16">
                            <span class="loading loading-ring" />
                        </div>
                    :
                        <>
                            {methods.map((method, index) => {
                                if (index < 2) return <SellerCard method={method} productUrl={url} productName={name} productGroupID={productGroupID} />
                                return null
                            })}
                            {methods.length > 2 ?
                                <div class="collapse collapse-arrow rounded-none">
                                    <input type="checkbox" class="min-h-[0]" />
                                    <div class="collapse-title min-h-[0] !p-0 flex gap-2 underline mb-4">
                                        <span class="uppercase underline">Ver mais ofertas</span>
                                    </div>
                                    <div class="collapse-content !p-0">
                                        <ul class="flex flex-col gap-4">
                                            {methods.map((method, index) => {
                                                if (index >= 2) return <SellerCard method={method} productUrl={url} productName={name} productGroupID={productGroupID} />
                                                return null
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            : null}
                        </>
            }
        </ul>
    );
}