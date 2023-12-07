import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import ProductInfo from "./ProductInfo.tsx";
import GallerySlider from "./Gallery/ImageSlider.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductMain(props: Props) {
  const { breadcrumbList } = props.page;

  return (
    <div class="container">
      <Breadcrumb 
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      />
      <div class="flex flex-col lg:flex-row">
        <GallerySlider page={props.page} />
        <ProductInfo page={props.page} />
      </div>
    </div>
  )
}