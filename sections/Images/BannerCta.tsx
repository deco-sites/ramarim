import type { ImageWidget } from 'apps/admin/widgets.ts';


interface Props {
    srcMobile?: ImageWidget;
    srcDesktop?: ImageWidget;
    alt?: string;
    title?: string;
    buttonText?: string;
    href?: string;
}

const BannerCTA = ({
    srcMobile = {},
    srcDesktop = {},
    title = 'BOLSAS',
    alt = title,
    buttonText = 'COMPRAR',
    href = '',
}: Props) => {

    return (
        <div
            className={`bg-cover`}
            style={{
                backgroundImage: `url("${srcDesktop || srcMobile}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            alt={alt}>
            <div className="w-96 h-96 flex flex-col m-auto">
                <div className="mt-64">
                    <div className="flex justify-center">
                        <h3 className="font-normal text-3xl text-white uppercase">
                            {title}
                        </h3>
                    </div>
                    <div className="flex justify-center">
                        <a
                            href={href}
                            className="mt-5 bg-transparent border border-solid border-white text-base text-white px-14 py-2 md:px-24"
                        >
                            {buttonText}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerCTA;
