import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      const nome =
        (e.currentTarget.elements.namedItem("nome") as RadioNodeList)?.value;


      // const res = await invoke({
      //   key: "deco-sites/ramarim/actions/newsletter/record.ts",
      //   props
      // });

      const res = await invoke.vtex.actions.masterdata.createDocument({ data: { email, nome }, acronym: "NL" });
    } finally {
      loading.value = false; 
    }
  };

  return (
    <div class="text-white flex flex-col items-center lg:py-11 py-16 px-11 lg:flex-row lg:justify-between">
      <div class="flex flex-col">
        <p class="text-center lg:text-lg mb-7 lg:mb-0 lg:text-start lg:w-80">{content?.description}</p>
      </div>
      <div class="flex flex-col">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-col lg:flex-row items-center gap-6">
            <div class=" flex flex-col justify-center lg:flex-row lg:gap-6">
              <input
                name="nome"
                class="lg:flex-none input w-60 lg:w-60 input-bordered rounded-none placeholder-center text-center border-1 border-solid border-white mt-4 lg:mt-0 text-sm bg-transparent text-white"
                placeholder={"SEU NOME"}
              />
              <input
                name="email"
                class="lg:flex-none input w-60 lg:w-80 input-bordered rounded-none  placeholder-center text-center mt-4 lg:mt-0 border-1 border-solid border-white text-sm bg-transparent text-white"
                placeholder={"SEU EMAIL"}
              />
            </div>
            <div class="flex ">
              <button
                type="submit"
                class="btn disabled:loading w-60 lg:w-28 mt-4 lg:mt-0 rounded-none bg-white"
                disabled={loading}
              >
                {"ASSINAR!"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
