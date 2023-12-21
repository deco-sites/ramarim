import type { ImageWidget } from 'apps/admin/widgets.ts';
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";

interface BannerCTA {
    srcMobile?: ImageWidget;
    srcDesktop?: ImageWidget;
    alt?: string;
    title?: string;
    buttonText?: string;
    href?: string;
}

interface Props {
   banners?: BannerCTA[];
}

const Banner = (banner: BannerCTA, index: number) => {
    return (
        <div key={index} className="relative w-full">
            <Image
                src={banner?.srcDesktop || banner?.srcMobile}
                alt={banner.alt}
                loading="lazy"
                class="w-full h-auto"
            />
            <div className="absolute bottom-0 left-1/2 translate-x-[-50%] pb-5">
                <div className="flex justify-center">
                    <h3 className="font-normal text-3xl text-white uppercase">
                        {banner?.title}
                    </h3>
                </div>
                <div className="flex justify-center">
                    {banner?.buttonText && (
                        <a
                            href={banner.href}
                            className="mt-5 bg-transparent border border-solid border-white text-base text-white px-14 py-2 lg:px-24 uppercase"
                        >
                            {banner.buttonText}
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

const BannerCTA = ({
    banners = []
}: Props) => {
    const id = useId();

    return (
        <>
            {/* Mobile */}
            {
                banners.length > 0 ? (
                    <div id={id} class="container flex sm:hidden relative order-1 sm:order-2">
                        <Slider class="carousel carousel-center gap-6 w-screen">
                            {banners?.map((banner, index) => (
                                <Slider.Item
                                    index={index}
                                    class="carousel-item w-full"
                                >
                                    <Banner {...banner} index={index} />
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
                            disabled={banners.length < 2}
                        >
                            <Icon size={24} id="ChevronRight" strokeWidth={3} />
                        </Slider.NextButton>

                        <SliderJS rootId={id} />
                    </div>
                ) : null
            }
            {/* Desktop */}
            <div class="hidden md:flex container gap-4">
                {banners?.map((banner, index) => (
                    <Banner {...banner} index={index} />
                ))}
            </div>
        </>
    );
};

export default BannerCTA;