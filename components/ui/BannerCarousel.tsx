import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Banner {
  desktop: ImageWidget;
  mobile: ImageWidget;
  alt: string;
  theme?: "light" | "dark";
  position?: "left" | "right";
  action?: {
    href: string;
    title: string;
    subTitle: string;
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
        title: "Demo Store",
        subTitle: "Visit our site and start building now:",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/24278f9e-412d-4a8a-b2d3-57353bb1b368",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/afa2c07c-74f4-496d-8647-5cc58f48117b",
    },
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
        title: "Demo Store",
        subTitle: "Visit our site and start building now:",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/eeaa624c-a3e1-45e8-a6fe-034233cfbcd0",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7949d031-9a79-4639-b85e-62fd90af85a9",
    },
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
        title: "Demo Store",
        subTitle: "Visit our site and start building now:",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ae89571c-4a7c-44bf-9aeb-a341fd049d19",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7ec121e4-5cfe-4b7b-b942-d1ed4493803d",
    },
  ],
  preload: true,
};

 function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    theme,
    mobile,
    position,
    desktop,
    action,
  } = image;

  const isDarkTheme = !theme ? false : theme === "light" ? false : true;
  const isLeftPosition = !position ? true : position === "right" ? true : false;

  const darkButton = "flex items-center gap-x-2 border py-2 px-8 border-black uppercase text-black hover:text-white max-sm:text-white hover:bg-black max-sm:bg-black";
  const lightButton = "flex items-center gap-x-2 border py-2 px-8 border-white uppercase text-white hover:text-black max-sm:text-black hover:bg-white max-sm:bg-white";

  const leftBox = "flex flex-col items-center sm:items-start w-80 absolute max-sm:bottom-0 sm:top-1/2 max-sm:translate-x-[-50%] sm:translate-y-[-50%] left-1/2 sm:left-28 gap-y-3 sm:gap-y-5 py-5 max-sm:pb-12 max-sm:mb-4";
  const rightBox = "flex flex-col items-center sm:items-end w-80 absolute max-sm:bottom-0 sm:top-1/2 max-sm:translate-x-[-50%] sm:translate-y-[-50%] right-1/2 sm:right-28 gap-y-3 sm:gap-y-5 py-5 max-sm:pb-12 max-sm:mb-4";

  return (
    <a
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative h-[600px] overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={360}
          height={600}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
      {action && (
        <div class={isLeftPosition ? leftBox : rightBox}>
          <span class={isDarkTheme ? "text-dark text-4xl" : "text-white text-4xl"}>
            {action.title}
          </span>
          <span class={isDarkTheme ? "text-dark" : "text-white"}>
            {action.subTitle}
          </span>
          <button class={isDarkTheme ? darkButton : lightButton}>
            {action.label}
            <Icon
              class={isDarkTheme ? "text-dark" : "text-white"}
              size={20}
              id="ChevronRight"
              strokeWidth={3}
            />
          </button>
        </div>
      )}
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="flex items-center justify-center border-2 border-white w-11 h-11 rounded-full bg-gray-500/25">
          <Icon
            class="text-base-100"
            size={22}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="flex items-center justify-center border-2 border-white w-11 h-11 rounded-full bg-gray-500/25">
          <Icon
            class="text-base-100"
            size={22}
            id="ChevronRight"
            strokeWidth={2}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      <Buttons />

      {/* <Dots images={images} interval={interval} /> */}

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
