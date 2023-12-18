import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const imageURL = /(https:\/\/ramarim\.vtexassets\.com\/arquivos\/ids\/)([0-9]*)(\/.*)/;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } }
  } = props;

  return (
    <>
      <div class="hidden lg:grid grid-cols-2 gap-4 min-w-[500px]">
        {images.map((img, index) => {
          const imageFullLine = index % 3 === 0;
          const optimizedURL = imageFullLine ? 
            img.url.replace(imageURL, "$1$2-600-auto$3")
            : img.url.replace(imageURL, "$1$2-380-auto$3");
          return (
            <Image
              class={imageFullLine ? "col-span-2" : ""}
              src={optimizedURL}
              alt={img.alternateName}
            />
          )
        })}
      </div>
      <div id={id} class="grid lg:hidden grid-flow-row">
        {/* Image Slider */}
        <div class="relative">
          <Slider class="carousel carousel-center gap-6 w-full">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full flex items-center justify-center"
              >
                <Image
                  class="w-full sm:max-w-[60vw]"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  src={img.url!}
                  alt={img.alternateName}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton
            class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
            disabled
          >
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
            disabled={images.length < 2}
          >
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
        <SliderJS rootId={id} />
      </div>
    </>
  );
}
