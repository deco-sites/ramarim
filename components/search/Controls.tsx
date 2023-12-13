import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions" | "productsFound" | "Pagination">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions, productsFound, Pagination }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
            <div>
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[100px]">
        <div class="flex flex-row items-center sm:p-0 my-9">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-row items-center justify-between sm:gap-4 sm:border-none my-8">
          <Button
            class={displayFilter ? "btn-ghost" : "bg-black text-white uppercase sm:hidden font-normal"}
            onClick={() => {
              open.value = true;
            }}
          >
            FILTROS
          </Button>
          {productsFound}
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}

        </div>
       <div class="md:hidden">{Pagination}</div> 
      </div>
      <div class="hidden md:block">{Pagination}</div> 
    </Drawer>
  );
}

export default SearchControls;
