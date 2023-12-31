import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}


function Result({
  page,
  layout,
  cardLayout,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;
  const productsFound = (
    <h6 class="text-black text-xs">
      {pageInfo.records} Produtos
    </h6>
    /*{ <div>{productsFound}</div> }*/
  );

  const Pagination = (
    <div class="flex justify-center my-4">
      <div class="join">
        <a
          aria-label="previous page link"
          rel="prev"
          href={pageInfo.previousPage ?? "#"}
          class="btn bg-transparent hover:bg-slate-50 border-none join-item"
        >
          <Icon id="ChevronLeft" size={24} strokeWidth={2} />
        </a>

        <a class="btn bg-transparent border-none hover:bg-slate-50 join-item mx-[1px]"
          href={pageInfo.previousPage}>
          {pageInfo.previousPage && pageInfo.previousPage.replace('?page=', "")}
        </a>

        <span class="btn join-item border border-solid hover:bg-slate-50 bg-transparent border-black">
          {pageInfo.currentPage}
        </span>

        <a class="btn bg-transparent border-none hover:bg-slate-50 join-item mx-[1px]"
          href={pageInfo.nextPage}>
          {pageInfo.nextPage && (pageInfo.nextPage).replace('?page=', "")}
        </a>
        <a
          aria-label="next page link"
          rel="next"
          href={pageInfo.nextPage ?? "#"}
          class="btn bg-transparent border-none hover:bg-slate-50 join-item"
        >
          <Icon id="ChevronRight" size={24} strokeWidth={2} />
        </a>
      </div>
    </div>
  )


  return (
    <>
      <div class="container px-4 sm:py-10">
        <SearchControls
          breadcrumb={breadcrumb}
          sortOptions={sortOptions}
          filters={filters}
          productsFound={productsFound}
          displayFilter={layout?.variant === "drawer"}
          Pagination={Pagination}
        />
        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[300px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow">
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>


      </div>
      {Pagination}
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,


              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
