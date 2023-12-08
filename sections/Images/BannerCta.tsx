import type { ImageWidget } from 'apps/admin/widgets.ts';
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

interface BannerCTA {
    srcMobile?: ImageWidget;
    srcDesktop?: ImageWidget;
    alt?: string;
    title?: string;
    buttonText?: string;
    href?: string;
}

interface Props {
   // banners?: BannerCTA[];
}

const BannerCTA = (props: Props) => {
    const id = useId();

    const { banners } = props;

    console.log(banners);

    return (
        <>
            <div id={id} class="relative order-1 sm:order-2">
                <Slider class="carousel carousel-center gap-6 w-screen">
                    {banners?.map((banner, index) => (
                        <Slider.Item
                            index={index}
                            class="carousel-item w-full"
                        >
                            <div className="w-96 h-96 flex flex-col m-auto">
                                <div className="mt-64">
                                    <div className="flex justify-center">
                                        <h3 className="font-normal text-3xl text-white uppercase">
                                            {banner?.title}
                                        </h3>
                                    </div>
                                    <div className="flex justify-center">
                                        {banner?.buttonText && (
                                            <a
                                                href={banner.href}
                                                className="mt-5 bg-transparent border border-solid border-white text-base text-white px-14 py-2 md:px-24 uppercase"
                                            >
                                                {banner.buttonText}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
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
            {banners?.map((banner, index) => (
                <div
                    key={index}
                    className={`bg-cover flex mt-2 mx-2`}
                    style={{
                        backgroundImage: `url("${banner?.srcDesktop || banner?.srcMobile}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                    alt={banner.alt}
                >
                    <div className="w-96 h-96 flex flex-col m-auto">
                        <div className="mt-64">
                            <div className="flex justify-center">
                                <h3 className="font-normal text-3xl text-white uppercase">
                                    {banner?.title}
                                </h3>
                            </div>
                            <div className="flex justify-center">
                                {banner?.buttonText && (
                                    <a
                                        href={banner.href}
                                        className="mt-5 bg-transparent border border-solid border-white text-base text-white px-14 py-2 md:px-24 uppercase"
                                    >
                                        {banner.buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default BannerCTA;
