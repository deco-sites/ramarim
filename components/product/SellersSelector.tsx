import { invoke } from "../../runtime.ts";
import { useCallback, useEffect } from "preact/compat";

export default function SellersSelector() {
    console.log("SellersSelector");

    const getSellers = useCallback(async () => {
        console.log("getSellers");
        const result = await invoke["deco-sites/ramarim"].loaders.product.getSellers({});
        console.log("TESTE:", result);
    }, []);

    useEffect(() => {
        console.log("useEffect");
        getSellers();
    }, []);

    return null;
}