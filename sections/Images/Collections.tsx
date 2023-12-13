import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "../../components/ui/Image.tsx";

export interface Props {
  variant: "one" | "two";
  collections: Collection[];
}

interface Collection {
  /**
   * @title Title
   */
  label: string;
  link: string;
  image: ImageWidget;
  btn: string;
}

const btn = "Comprar"

function Collections({ variant, collections }: Props) {
  if (variant === "one") {
    return (
      <div class="container py-3 tablet:py-11 text-black">
        <ul class="flex md:justify-center gap-5 overflow-y-hidden carousel carousel-start scrollbar-none -mx-[24px] mobile:-mx-[50px] laptop:-mx-[70px]">
          {collections?.map((collection, index) => {
            const isFirst = index === 0;
            const isLast = index === collections.length - 1;

            return (
              <li
                key={"collection-" + index}
                class={`carousel-item box-border ${
                  isFirst ? "pl-[24px] mobile:pl-[50px] laptop:pl-[70px]" : ""
                } ${
                  isLast ? "pr-[24px] mobile:pr-[50px] laptop:pr-[70px]" : ""
                }`}
              >
                <a
                  href={collection.link}
                  class="relative flex justify-center items-end p-6 w-[310px] desktop:w-[calc((100vw-70px-70px)/4-20px)] monitor:w-[310px] h-[480px] border border-solid border-white text-base text-white shrink-0 snap-start desktop:shrink uppercase"
                >
                  <p class="z-10 text-center text-black">{collection.label}</p>
                  <a class="border border-solid border-white text-base text-white px-14 py-2 md:px-24 uppercase">{collection.btn}</a>
                  <div class="h-full w-full bg-grey-1 absolute top-0 left-0 z-0">
                    <Image
                      alt="Imagem da coleção"
                      width={310}
                      height={480}
                      loading="lazy"
                      fetchPriority="auto"
                      src={collection.image}
                      class="object-cover h-full w-full"
                    />
                  </div>
                  <div
                    class="absolute h-full w-full top-0 left-0 z-[1]"
                  
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (variant === "two") {
    return (
      <div class="container py-3 mt-3 tablet:mt-7 text-black">
        <ul class="flex desktop:justify-center gap-5 overflow-y-hidden carousel carousel-start scrollbar-none -mx-[24px] mobile:-mx-[50px] laptop:-mx-[70px]">
          {collections?.map((collection, index) => {
            const isFirst = index === 0;
            const isLast = index === collections.length - 1;

            return (
              <li
                key={"collection-" + index}
                class={`carousel-item box-border ${
                  isFirst ? "pl-[24px] mobile:pl-[50px] laptop:pl-[70px]" : ""
                } ${
                  isLast ? "pr-[24px] mobile:pr-[50px] laptop:pr-[70px]" : ""
                }`}
              >
                <a
                  href={collection.link}
                  aria-label={`Clique para ver produtos de: ${collection.label}`}
                  class="flex flex-col items-center gap-5 w-[350px] h-[481px] text-body text-black shrink-0 desktop:shrink group"
                >
                  
                  <h4 class="text-center text-large tracking-wide font-medium uppercase">
                    {collection.label}
                  </h4>
                  <div class="h-full w-full bg-grey-1 relative">
                    <Image
                      alt="Imagem da coleção"
                      width={350}
                      height={410}
                      loading="lazy"
                      fetchPriority="auto"
                      src={collection.image}
                      class="object-cover absolute top-0 left-0 h-full w-full"
                    />
                  </div>
                  <p class="shrink-0 text-center text-small border-b border-transparent group-hover:border-black">
                    SHOP NOW
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
}

export default Collections;