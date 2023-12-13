import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
    Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
    products: Product[] | null;
    title?: string;
    description?: string;
    layout?: {
        headerAlignment?: "center" | "left";
        headerfontSize?: "Normal" | "Large";
    };
    cardLayout?: cardLayout;
    banner: ImageWidget;
}

function ProductShelfWithBanner({
    products,
    title,
    description,
    layout,
    cardLayout,
    banner
}: Props) {
    const id = useId();
    const platform = usePlatform();

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div class="w-full lg:bg-black flex flex-col gap-8 lg:gap-16 pt-0 pb-8 lg:pb-0 lg:mb-28">
            <div className="md:pt-16">

                <Header
                    title={title || ""}
                    description={description || ""}
                    fontSize={layout?.headerfontSize || "Large"}
                    alignment={layout?.headerAlignment || "center"}
                />
            </div>
            <div class="flex flex-col md:flex-row items-center gap-8 container bg-black lg:bg-transparent mt-[50px] lg:mt-0 pb-9 lg:pb-0">
                <Image
                    src={banner}
                    class="block w-[80vw] lg:w-[calc(40% - 16px)] relative mt-[-50px] lg:mt-0 lg:mb-[-50px] h-[calc(100% + 50px)] object-cover object-center"
                />
                <div
                    id={id}
                    class="container w-full lg:w-[calc(60% - 16px)] grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
                >
                    <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
                        {products?.map((product, index) => (
                            <Slider.Item
                                index={index}
                                class="carousel-item w-[270px] sm:w-[292px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
                            >
                                <ProductCard
                                    product={product}
                                    itemListName={title}
                                    layout={cardLayout}
                                    platform={platform}
                                    theme="light"
                                    index={index}
                                />
                            </Slider.Item>
                        ))}
                    </Slider>

                    <>
                        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
                            <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
                                <Icon size={24} id="ChevronLeft" strokeWidth={3} />
                            </Slider.PrevButton>
                        </div>
                        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
                            <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
                                <Icon size={24} id="ChevronRight" strokeWidth={3} />
                            </Slider.NextButton>
                        </div>
                    </>
                    <SliderJS rootId={id} />
                    <SendEventOnLoad
                        event={{
                            name: "view_item_list",
                            params: {
                                item_list_name: title,
                                items: products.map((product) =>
                                    mapProductToAnalyticsItem({
                                        product,
                                        ...(useOffer(product.offers)),
                                    })
                                ),
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductShelfWithBanner;
