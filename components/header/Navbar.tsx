import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full px-4 gap-x-3 bg-black"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={138} height={19} />
          </a>
        )}

        <div class="flex gap-3">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex flex-row justify-between items-stretch container">
        <div class="flex-none w-header-laterals flex justify-start gap-x-5">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-[200px] bg-black flex justify-center py-5">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block"
            >
              <Image src={logo.src} alt={logo.alt} width={138} height={19} />
            </a>
          )}
        </div>
        <div class="flex-none w-header-laterals flex items-center justify-end gap-x-5">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
          <a
            class="flex items-center text-sm gap-x-1"
            href="/login"
            aria-label="Log in"
          >
            <svg id="_01_align_center" data-name="01 align center" xmlns="http://www.w3.org/2000/svg" width="13.989" height="18.652" viewBox="0 0 13.989 18.652">
              <path id="Caminho_10" data-name="Caminho 10" d="M16.989,21.772H15.434V17.852a2.3,2.3,0,0,0-2.3-2.3H6.852a2.3,2.3,0,0,0-2.3,2.3v3.919H3V17.852A3.857,3.857,0,0,1,6.852,14h6.284a3.857,3.857,0,0,1,3.852,3.852Z" transform="translate(-3 -3.12)"/>
              <path id="Caminho_11" data-name="Caminho 11" d="M10.663,9.326a4.663,4.663,0,1,1,4.663-4.663A4.663,4.663,0,0,1,10.663,9.326Zm0-7.772a3.109,3.109,0,1,0,3.109,3.109A3.109,3.109,0,0,0,10.663,1.554Z" transform="translate(-3.669)"/>
            </svg>
            Entrar
          </a>
          <a
            class="flex items-center text-sm gap-x-1"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <svg id="_01_align_center" data-name="01 align center" xmlns="http://www.w3.org/2000/svg" width="20" height="18.401" viewBox="0 0 20 18.401">
              <path id="Caminho_13" data-name="Caminho 13" d="M14.381.917a5.26,5.26,0,0,0-4.52,2.712A5.26,5.26,0,0,0,5.341.917,5.588,5.588,0,0,0,0,6.711c0,5.568,9,12,9.387,12.271l.475.336.475-.336c.383-.271,9.387-6.7,9.387-12.271A5.588,5.588,0,0,0,14.381.917ZM9.861,17.295c-2.673-2-8.218-6.9-8.218-10.584a3.945,3.945,0,0,1,3.7-4.15,3.945,3.945,0,0,1,3.7,4.15h1.644a3.945,3.945,0,0,1,3.7-4.15,3.945,3.945,0,0,1,3.7,4.15C18.079,10.393,12.534,15.3,9.861,17.295Z" transform="translate(0.005 -0.917)"/>
            </svg>
            Favoritos
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
        </div>
      </div>
    </>
  );
}

export default Navbar;
