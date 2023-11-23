import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="join border rounded-none w-min">
      <button
        class="block m-1.5"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        <svg id="_01_align_center" xmlns="http://www.w3.org/2000/svg" width="15.761" height="15.761" viewBox="0 0 15.761 15.761">
          <path id="Caminho_61" data-name="Caminho 61" d="M14.293,13.18a7.88,7.88,0,1,0-1.113,1.113ZM8.2,14.5A6.294,6.294,0,1,1,14.5,8.2,6.294,6.294,0,0,1,8.2,14.5Z" transform="translate(-0.312 -0.312)"/>
          <rect id="Retângulo_271" data-name="Retângulo 271" width="6.294" height="1.574" transform="translate(4.746 7.106)"/>
        </svg>
      </button>
      <input
        class="w-9 px-3 text-center join-item [appearance:textfield]"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <button
        class="block m-1.5"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        <svg id="_01_align_center" xmlns="http://www.w3.org/2000/svg" width="15.765" height="15.764" viewBox="0 0 15.765 15.764">
          <path id="Caminho_59" data-name="Caminho 59" d="M14.295,13.182a7.882,7.882,0,1,0-1.113,1.113ZM8.205,14.5a6.3,6.3,0,1,1,6.3-6.3A6.3,6.3,0,0,1,8.205,14.5Z" transform="translate(-0.31 -0.311)"/>
          <path id="Caminho_60" data-name="Caminho 60" d="M132.684,128.749H131.11v2.361h-2.361v1.574h2.361v2.361h1.574v-2.361h2.361V131.11h-2.361Z" transform="translate(-124.002 -124.002)"/>
        </svg>
      </button>
    </div>
  );
}

export default QuantitySelector;
