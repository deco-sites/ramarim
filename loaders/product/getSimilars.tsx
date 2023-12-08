import { withIsSimilarTo } from "deco-sites/std/packs/vtex/utils/similars.ts";
import type { Context } from "deco-sites/std/packs/vtex/accounts/vtex.ts";

async function loader(
    props: any,
    req: Request,
    ctx: Context,
): Promise<any | null> {
    return await withIsSimilarTo(ctx, props);
}

export default loader;