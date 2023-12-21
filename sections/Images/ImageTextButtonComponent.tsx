import type { ImageWidget } from 'apps/admin/widgets.ts';

interface ImageTextButtonProps {
    isMobile?: ImageWidget;
    isDesktop?: ImageWidget;
    alt?: string;
    title: string;
    text: string;
    buttonText: string;
}

const ImageTextButtonComponent = ({
    isDesktop,
    isMobile,
    alt,
    title,
    text,
    buttonText,
}: ImageTextButtonProps) => {
    return (
        <div className="container relative w-full my-8">
            <div className="lg:float-left lg:w-[834px] lg:h-[666px] lg:ml-[8px] lg:mb-20">
                <img
                    src={isDesktop || isMobile}
                    alt={alt}
                    className="w-full h-full"
                />
            </div>

            <div className="w-[90%] m-auto relative -mt-[4.75rem] p-[38px] lg:absolute lg:top-2/4 lg:right-0 lg:w-2/4 lg:px-[68px] lg:py-[63px] bg-black lg:mr-[40px] lg:mt-[4.75rem]">
                <h2 className="text-white leading-[3rem] text-[40px] mb-5">{title}</h2>
                <p className="text-base text-white md:text-xl">{text}</p>
                <div className="mt-[35px]">
                    <a className="text-white py-2 px-8 border border-solid border-white">
                        {buttonText}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ImageTextButtonComponent;
