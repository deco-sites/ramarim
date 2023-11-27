/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";
import Image from "apps/website/components/Image.tsx";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "O que você procura?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div
      class="w-full grid gap-8 px-4 py-6 overflow-y-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={id} action={action} class="relative join">
        <span class="block absolute top-1/2 left-3 translate-y-[-50%]">
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
        </span>
        <input
          ref={searchInputRef}
          id="search-input"
          class="flex flex-grow outline-none border-none rounded-none pl-10 py-2 pr-4 bg-base-200 placeholder:text-black text-sm"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <button
          class="hidden lg:inline-flex items-center h-full px-3"
          onClick={() => displaySearchPopup.value = false}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </button>
      </form>

      <div
        class={`overflow-y-scroll ${!hasProducts && !hasTerms ? "hidden" : ""}`}
      >
        <div class="gap-4 flex flex-col sm:flex-row">
          {
            searches.length > 0 ? (
              <div class="flex flex-col gap-6">
                <span
                  class="font-medium text-xl"
                  role="heading"
                  aria-level={3}
                >
                  Sugestões
                </span>
                <ul id="search-suggestion" class="flex flex-col gap-6">
                  {searches.map(({ term }) => (
                    <li>
                      <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                        <span>
                          <Icon
                            id="MagnifyingGlass"
                            size={24}
                            strokeWidth={0.01}
                          />
                        </span>
                        <span dangerouslySetInnerHTML={{ __html: term }} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          }
          {
            products.length > 0 ? (
              <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
                <span
                  class="font-normal text-lg uppercase"
                  role="heading"
                  aria-level={3}
                >
                  Produtos sugeridos
                </span>
                <div class="flex flex-col gap-y-4">
                  {products.map((product, index) => (
                    <a class="flex items-center gap-x-6" href={product.url}>
                      <Image
                        src={product.image[0].url!}
                        alt={product.image[0].name}
                        width={115}
                        height={96}
                        loading="lazy"
                        decoding="async"
                      />
                      <span class="text-sm">{product.isVariantOf.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
