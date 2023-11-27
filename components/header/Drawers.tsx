import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

const MENU_TITLE = "Menu";
const SEARCH_TITLE = "Buscar";
const MINICART_TITLE = "Sacola"

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const HeaderLogin = (props: any) => {
  const {closeFunction: { onClose } } = props;
  // Validar
  const isUserLoggedIn = true;

  return (
    <div class="flex justify-between items-center bg-black p-4">
      <a
        class="flex items-center gap-x-2 text-white fill-white"
        href={ isUserLoggedIn ? "/account" : "/login" }
        aria-label="Log in"
      >
        <svg id="_01_align_center" data-name="01 align center" xmlns="http://www.w3.org/2000/svg" width="13.989" height="18.652" viewBox="0 0 13.989 18.652">
          <path id="Caminho_10" data-name="Caminho 10" d="M16.989,21.772H15.434V17.852a2.3,2.3,0,0,0-2.3-2.3H6.852a2.3,2.3,0,0,0-2.3,2.3v3.919H3V17.852A3.857,3.857,0,0,1,6.852,14h6.284a3.857,3.857,0,0,1,3.852,3.852Z" transform="translate(-3 -3.12)"/>
          <path id="Caminho_11" data-name="Caminho 11" d="M10.663,9.326a4.663,4.663,0,1,1,4.663-4.663A4.663,4.663,0,0,1,10.663,9.326Zm0-7.772a3.109,3.109,0,1,0,3.109,3.109A3.109,3.109,0,0,0,10.663,1.554Z" transform="translate(-3.669)"/>
        </svg>
        <span class="block truncate text-sm max-w-[200px]">{ isUserLoggedIn ? "Olá, sergioluizfrancajunior@gmail.com" : "Entrar" }</span>
      </a>
      {onClose && (
        <button class="py-3 text-white" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

const SearchHeader = (props: any) => {
  const {closeFunction: { onClose } } = props;

  return (
    <div class="flex justify-between items-center bg-black px-4">
      <div class="flex items-center gap-x-2 text-white fill-white text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="18.677" height="18.677" viewBox="0 0 18.677 18.677">
          <path id="Caminho_29" data-name="Caminho 29" d="M18.645,17.546l-4.867-4.867a7.784,7.784,0,1,0-1.1,1.1l4.867,4.867ZM7.764,13.982a6.217,6.217,0,1,1,6.217-6.217,6.217,6.217,0,0,1-6.217,6.217Z" transform="translate(0.032 0.032)"/>
        </svg>
        Buscar
      </div>
      {onClose && (
        <button class="py-3 text-white" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

const MinicartHeader = (props: any) => {
  const {closeFunction: { onClose } } = props;

  return (
    <div class="flex justify-between items-center p-4">
      <div class="flex items-center text-lg text-black uppercase font-medium">
        Sacola
      </div>
      {onClose && (
        <button class="py-3 text-black" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

const Aside = (
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full max-w-[100vw]">
    { title === MENU_TITLE && <HeaderLogin closeFunction={{onClose}} /> }
    { title === SEARCH_TITLE && <SearchHeader closeFunction={{onClose}} /> }
    { title === MINICART_TITLE && <MinicartHeader closeFunction={{onClose}} /> }
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value || displaySearchDrawer.value}
      onClose={() => {
        displayMenu.value = false;
        displaySearchDrawer.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
            displaySearchDrawer.value = false;
          }}
          title={displayMenu.value ?  MENU_TITLE : SEARCH_TITLE}
        >
          {displayMenu.value && <Menu {...menu} />}
          {searchbar && displaySearchDrawer.value && (
            <div class="w-screen">
              <Searchbar {...searchbar} />
            </div>
          )}
        </Aside>
      }
    >
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            title={MINICART_TITLE}
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
