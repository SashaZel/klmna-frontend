/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                brick: {
                    50: "#fef3f2",
                    100: "#fde5e3",
                    200: "#fccfcc",
                    300: "#f9ada8",
                    400: "#f37e76",
                    500: "#ea5f55",
                    600: "#d5382d",
                    700: "#b32c22",
                    800: "#942820",
                    900: "#7b2721",
                    950: "#43100c",
                },
                choco: {
                    50: "#f9f5f5",
                    100: "#f4ecec",
                    200: "#ecdcdc",
                    300: "#ddc4c4",
                    400: "#c8a1a1",
                    500: "#b28181",
                    600: "#9c6666",
                    700: "#815454",
                    800: "#6c4848",
                    900: "#5c4040",
                    950: "#301f1f",
                },

                lemon: {
                    50: "#fdfce9",
                    100: "#faf7c7",
                    200: "#f7ed91",
                    300: "#f2de5c",
                    400: "#ebc824",
                    500: "#dbb117",
                    600: "#bd8911",
                    700: "#976311",
                    800: "#7d5016",
                    900: "#6b4118",
                    950: "#3e220a",
                },
                plum: {
                    50: "#fbebff",
                    100: "#f7daff",
                    200: "#f3bcff",
                    300: "#ef94ff",
                    400: "#f669ff",
                    500: "#ff47fa",
                    600: "#ff26e7",
                    700: "#e71bce",
                    800: "#ba19a8",
                    900: "#921d87",
                    950: "#22071f",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
