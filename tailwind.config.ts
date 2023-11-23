import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: { 
    container: { 
      center: true,
      screens: {}
    },
    extend: {
      width: {
        "header-laterals": "calc(50% - 100px)"
      }
    }
  },
};
