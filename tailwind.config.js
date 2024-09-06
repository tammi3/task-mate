/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        work: "#a18aff",
        school: "#825B32",
        personal: "#00b3ff ",
        others: "#fd99af",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
};

// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//     "./node_modules/flowbite/**/*.js",
//   ],
//   theme: {
//     extend: {

//     },
//     variants: {
//       extend: {},
//     },
//     plugins: [require("flowbite/plugin")],
//   },
// };
