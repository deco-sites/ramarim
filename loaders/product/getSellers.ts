import { AppContext } from "apps/vtex/mod.ts";
import { fetchSafe } from "deco-sites/std/utils/fetchVTEX.ts";

export interface Props {
  data: Record<string, unknown>;
  acronym: string;
}

const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): any => {
  console.log(req);

  const response = await fetchSafe("https://ramarim.myvtex.com/api/checkout/pub/regions?country=BRA&postalCode=05407002");

  const json = await response.json();

  return json;
};

export default loader;