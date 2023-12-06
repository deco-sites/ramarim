import type { ImageWidget } from 'apps/admin/widgets.ts';


interface Props {
    srcMobile?: ImageWidget;
    srcDesktop?: ImageWidget;
    alt?: string;
    title?: string;
    subTitle?: string;
    buttonText?: string;
    href?: string;
}
const Infocard = ({
    srcMobile = {},
    srcDesktop = {},
    title = 'OUTLET ',
    subTitle = 'RAMARIM',
    alt = title,
    buttonText = 'CONFIRA',
    href = '',
}: Props) => {

    return (
        <div className="lg:container">
            <div
                className={`bg-cover`}
                style={{
                    backgroundImage: `url("${srcDesktop || srcMobile}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                alt={alt}>
                <div className="flex flex-row-reverse md:ml-24 h-[344px] md:h-[500px]">
                    <div className="mt-32 mr-8 md:mt-[170px] md:mr-[200px]">
                        <div className=" md:w-1/4">
                            <h3 className="text-[40px] font-bold text-white ">{title}</h3>
                            <h4 className="text-[40px] font-extralight text-white mb-4 mt-[-15px]">{subTitle}</h4>
                            <a className="mt-5 bg-transparent border border-solid border-white text-base text-white px-14 py-2 md:px-[20px]" href={href}>{buttonText}</a>
                        </div>
                        <div className="md:w-4/5"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Infocard;