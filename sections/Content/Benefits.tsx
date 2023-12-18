import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { asset } from "$fresh/runtime.ts";

const InstallmentBenefit = () => {
  return (
    <div className={`flex gap-2 p-5 order-1`}>
      <div className="flex items-center">
        <Image
          src={asset("./image/credit_card.png")}
          alt={"Até 6x sem juros"}
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold text-black uppercase">ATÉ 6X</div>
        <p className="text-xs text-black uppercase">SEM JUROS!</p>
      </div>
    </div>
  )
}

const DevolutionBenefit = () => {
  return (
    <div className={`flex gap-2 p-5 order-last md:order-2`}>
      <div className="flex items-center">
        <Image
          src={asset("./image/box.png")}
          alt={"Primeira devolução é por nossa conta"}
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold text-black uppercase">1° DEVOLUÇÃO</div>
        <p className="text-xs text-black uppercase">É POR NOSSA CONTA!</p>
      </div>
    </div>
  )
}

const MarketplaceBenefit = () => {
  return (
    <div className={`group flex gap-2 p-5 border border-solid border-black hover:border-white order-3 hover:bg-black text-black hover:text-white`}>
      <div className="flex items-center">
        <Image
          src={asset("./image/store.png")}
          alt={"VENDA NA RAMARIM, FAÇA PARTE DO NOSSO MARKETPLACE!"}
          className="max-w-full max-h-full object-cover group-hover:invert"
        />
      </div>
      <div className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold text-black uppercase">VENDA NA RAMARIM</div>
        <p className="text-xs text-black uppercase">FAÇA PARTE DO NOSSO MARKETPLACE!</p>
      </div>
    </div>
  )
}

const StoreBenefit = () => {
  return (
    <div className={`group flex gap-2 p-5 border border-solid border-black hover:border-white order-4 hover:bg-black text-black hover:text-white`}>
      <div className="flex items-center">
        <Image
          src={asset("./image/pin.png")}
          alt={"PERTO DE VOCÊ, ENCONTRE O VENDEDOR NA SUA CIDADE!"}
          className="max-w-full max-h-full object-cover group-hover:invert"
        />
      </div>
      <div className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold uppercase">PERTO DE VOCÊ</div>
        <p className="text-xs uppercase">ENCONTRE O VENDEDOR NA SUA CIDADE!</p>
      </div>
    </div>
  )
}

const Benefits = () => {
  const id = useId();
  return (
    <div id={id} className="container m-auto flex flex-col items-center gap-3 mx-[10px] md:flex-row md:gap-11 justify-center py-3 my-14">
      <InstallmentBenefit />
      <DevolutionBenefit />
      <MarketplaceBenefit />
      <StoreBenefit />
    </div>
  );
};

export default Benefits;
