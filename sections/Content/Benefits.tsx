import Icon, { AvailableIcons} from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface Props {
  title?: string;
  description?: string;
  benefits?: Array<{
    label: string;
    icon: AvailableIcons;
    description: string;
    iconRight?: AvailableIcons;
  }>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "",
    description = "",
    benefits = [{
      icon: "Truck",
      label: "ATÉ 6X",
      description: "SEM JUROS!",
    }, {
      icon: "Discount",
      label: "1° DEVOLUÇÃO",
      description: "É POR NOSSA CONTA!",
    }, {
      icon: "ArrowsPointingOut",
      label: "VENDA NA RAMARIM",
      description: "FAÇA PARTE DO NOSSO MARKETPLACE!",
      iconRight: "Truck",
    },
    {
      icon: "ArrowsPointingOut",
      label: "PERTO DE VOCÊ",
      description: "ENCONTRE O VENDEDOR NA SUA CIDADE!",
      iconRight: "Truck",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-primary text-primary-content p-4 lg:px-8 lg:py-4" : ""
        } flex gap-4 ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } ${
          showDivider && benefitLayout !== "piledup"
            ? "border-b border-neutral-300"
            : ""
        } ${showDivider ? "pb-4 lg:pr-8 lg:border-b-0" : ""} ${
          showDivider && !reverse ? "lg:pb-0" : ""
        }`}
      >
        <div class="flex-none">
          <Icon
            id={benefit.icon}
            class={reverse ? "text-base-100" : "text-primary"}
            width={36}
            height={36}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
        <div class="flex-auto flex flex-col">
          <div
            class={`text-base md:text-lg font-semibold text-black uppercase`}
          >
            {benefit.label}
          </div>
          <p
            class={`text-xs text-black uppercase`}
          >
            {benefit.description}

            <span>
              {benefit?.iconRight}
            </span>
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
            <Header
              title={title}
              description={description}
              alignment={layout?.headerAlignment || "center"}
            />
            <div class="w-full flex justify-center">
              <div class="flex flex-col gap-4 lg:gap-8 w-full lg:grid grid-flow-col auto-cols-fr">
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:grid-flow-col lg:auto-cols-fr lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full lg:gap-8 lg:grid-flow-col lg:auto-cols-fr">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
