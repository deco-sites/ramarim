interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "border border-black bg-black text-white",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-gray-300 text-black hover:border-black",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder text-xs">
      <div
        class={`w-11 h-11 ${
          variants[variant]
        }`}
      >
        <span class="uppercase">
          {content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
