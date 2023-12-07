import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import MeasurementChart from "./MeasurementChart.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const platform = usePlatform();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;

  const {
    url,
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
  } = product;

  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  return (
    <div class="flex flex-col">
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <h1>
          <span class="font-medium text-xl capitalize">
            {isVariantOf?.name}
          </span>
        </h1>
        <div>
          {gtin && (
            <span class="text-sm text-base-300">
              Ref. {gtin}
            </span>
          )}
        </div>
      </div>
      {/* Prices */}
      <div class="flex items-center justify-between mt-4">
        <div>
          <div class="flex flex-row gap-2 items-center">
            {(listPrice ?? 0) > price && (
              <span class="line-through text-base-300 text-xs">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}
            <span class="font-medium text-xl text-secondary">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>
          <span class="text-sm text-base-300">
            {installments}
          </span>
        </div>
        <WishlistButton
          variant="full"
          productID={productID}
          productGroupID={productGroupID}
        />
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      <MeasurementChart />
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <AddToCartButtonVTEX
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  seller={seller}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            }]}
          />
        )}
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          <div
            class="ml-2 mt-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </span>
      </div>
      <div class="mt-4 sm:mt-6">
        {
          isVariantOf.additionalProperty?.map((property) => {
            if ([
              "video-produto",
              "sellerid",
              "tamanho",
              "cor"
            ].includes(property.name?.toLowerCase())) return null;

            return (
              <div class="mt-2">
                <span>{property.name}</span>
                <div>
                  {property.value}
                </div>
              </div>
            )
          })
        }
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
