import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  const image = item?.image?.[0];

  if (item.children === undefined) {
    return (
      <div class="p-4">
        <a class="block hover:underline text-sm uppercase" href={item.url}>{item.name}</a>
      </div>
    );
  }

  return (
    <div class="collapse collapse-arrow">
      <input type="checkbox" class="min-h-[unset]" />
      <div class="collapse-title uppercase text-sm min-h-[unset] h-auto flex items-center">{item.name}</div>
      <div class="collapse-content px-0">
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alternateName}
            class="pb-6 px-4"
            width={300}
            height={332}
            loading="lazy"
          />
        )}
        <ul class="divide-y divide-base-200">
          {/* <li>
            <a class="underline text-sm" href={item.url}>Ver todos</a>
          </li> */}
          {item.children?.map((node) => (
            <li class="px-4 py-3">
              <a class="hover:underline" href={node.url}>
                <span class="text-[13.5px] uppercase font-semibold">{node.name}</span>
              </a>

              <ul class={node.name.search(/tamanho/i) !== -1 ? "flex gap-2 mt-4" : "flex flex-col gap-1 mt-4"}>
                {node.children?.map((leaf) => (
                  <li>
                    <a class={node.name.search(/tamanho/i) !== -1 ? "flex items-center justify-center rounded-full w-10 h-10 border-solid border-black bg-black text-white" : "hover:underline"} href={leaf.url}>
                      <span class={node.name.search(/tamanho/i) !== -1 ? "text-xs" : "text-[13.5px]"}>{leaf.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="flex flex-col divide-y divide-base-200 bg-white">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col divide-y">
        <li class="bg-black">
          <a
            class="flex items-center gap-3 p-4 text-white fill-white"
            href="/wishlist"
          >
            <svg id="_01_align_center" data-name="01 align center" xmlns="http://www.w3.org/2000/svg" width="19.732" height="18.401" viewBox="0 0 19.732 18.401">
              <path id="Caminho_13" data-name="Caminho 13" d="M14.381.917a5.26,5.26,0,0,0-4.52,2.712A5.26,5.26,0,0,0,5.341.917,5.588,5.588,0,0,0,0,6.711c0,5.568,9,12,9.387,12.271l.475.336.475-.336c.383-.271,9.387-6.7,9.387-12.271A5.588,5.588,0,0,0,14.381.917ZM9.861,17.295c-2.673-2-8.218-6.9-8.218-10.584a3.945,3.945,0,0,1,3.7-4.15,3.945,3.945,0,0,1,3.7,4.15h1.644a3.945,3.945,0,0,1,3.7-4.15,3.945,3.945,0,0,1,3.7,4.15C18.079,10.393,12.534,15.3,9.861,17.295Z" transform="translate(0.005 -0.917)"/>
            </svg>
            <span class="text-sm uppercase">Favoritos</span>
          </a>
        </li>
        <li class="bg-black">
          <a
            class="flex items-center gap-3 p-4 text-white"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" size={24} strokeWidth={2} />
            <span class="text-sm uppercase">Lojas</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
