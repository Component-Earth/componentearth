const theme = require("./bf.json");
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

module.exports = {
    corePlugins: {
        container: false,
    },
    content: {
        files: [
            "./*.php",
            "./blocks/**/*.twig",
            "./blocks/**/*.php",
            "./blocks/**/*.js",
            "./blocks/**/*.css",
            "./template-parts/*.php",
            "./template-parts/*.twig",
            "./template-parts/**/*.php",
            "./template-parts/**/*.twig",
            "./templates/*.php",
            "./templates/*.twig",
            "./partials/*.php",
            "./partials/*.twig",
            "./partials/**/*.php",
            "./partials/**/*.twig",
            "./components/*.php",
            "./components/*.twig",
            "./components/**/*.php",
            "./components/**/*.twig",
            "./estatik4/**/*.php"
        ],
        extract,
    },
    safelist: [],
    theme: {
        fontSize,
        screens: {
            sm: "36rem", //576px
            md: "48rem", //768px
            lg: "62rem", //992px
            xl: "75rem", //1200px
            "2xl": "87.5rem", //1400px
            "3xl": "100rem",
            "4xl": "110rem",
            "5xl": "115rem",
            "6xl": "117rem", //1600px            
            "7xl": "140rem", //1600px
        },
        extend: {
            fontSize: {
                'tiny': 'clamp(0.75rem)',
                'sm': 'clamp(0.875rem)',
                'md': 'clamp(1.125rem)',
                'lg': 'clamp(1.25rem)'
            },
            borderRadius: {
                corners: theme.corners,
            },
            fontFamily: {
                "primary-300": ["Maxitype_Rhymes_Trial-300", "sans-serif"],
                "primary": ["Maxitype_Rhymes_Trial", "sans-serif"],
                "primary-500": ["Maxitype_Rhymes_Trial-500", "sans-serif"],
                "primary-600": ["Maxitype_Rhymes_Trial-600", "sans-serif"],
                "primary-700": ["Maxitype_Rhymes_Trial-700", "sans-serif"],
                "secondary-300": ["Geist-300", "sans-serif"],
                "secondary": ["Geist", "sans-serif"],
                "secondary-500": ["Geist-500", "sans-serif"],
                "secondary-600": ["Geist-600", "sans-serif"],
                "secondary-700": ["Geist-700", "sans-serif"],
                "tertiary-300": ["GeistMono-300", "sans-serif"],
                "tertiary": ["GeistMono", "sans-serif"],
                "tertiary-500": ["GeistMono-500", "sans-serif"],
                "tertiary-600": ["GeistMono-600", "sans-serif"],
                "tertiary-700": ["GeistMono-700", "sans-serif"],
            },
            colors: theme.colors,
        },
    },
    darkMode: "selector",
    plugins: [
        function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        },
        function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'translate-z': (value) => ({
                        '--tw-translate-z': value,
                        transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
                    }),
                },
                { values: theme('translate'), supportsNegativeValues: true }
            )
        },
        function ({ addUtilities }) {
            addUtilities({
                ".center-y": {
                    top: "50%",
                    transform: "translateY(-50%)",
                },
                ".center-x": {
                    left: "50%",
                    transform: "translateX(-50%)",
                },
                ".center-xy": {
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                },
                ".text-inherit-all": {
                    "font-size": "inherit",
                    color: "inherit",
                    "font-weight": "inherit",
                    "line-height": "inherit",
                    "letter-spacing": "inherit",
                    "font-family": "inherit",
                },
            });
        },
        fluid,
    ],
};
