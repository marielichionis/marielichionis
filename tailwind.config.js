module.exports = {
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: true,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "hsl(var(--foreground))",
        "gray-dark": "#1f2024",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 204, 112, 0.7), 0 0 40px rgba(200, 80, 192, 0.5), 0 0 60px rgba(65, 88, 208, 0.3)",
        glow2:
          "0 0 20px rgba(50, 255, 50, 0.7), 0 0 40px rgba(20, 200, 20, 0.5), 0 0 60px rgba(5, 150, 5, 0.3)",
      },
      keyframes: {
        "bg-position": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "pop-blob": {
          "0%": { transform: "scale(1)" },
          "33%": { transform: "scale(1.2)" },
          "66%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
        colors: {
          filter: {
            "blur-20": "blur(20px)",
            "blur-25": "blur(25px)",
          },
        },
      },
      animation: {
        fill: "fill 1s forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee-horizontal": "marquee-x var(--duration) infinite linear",
        "marquee-vertical": "marquee-y var(--duration) linear infinite",
        "bg-position": "bg-position 3s infinite alternate",
        "pop-blob": "pop-blob 4s infinite",
        "flip-words": "flip-words 8s infinite",
        fadeIn: "fadeIn 0.5s ease-in",
        "blink-red": "blink-red 2s infinite linear",
        sparkle: "sparkle 2s ease-in-out infinite",
        meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
        trail: "trail var(--duration) linear infinite",
        led: "led 100ms ease-in-out",
        float: "float 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        slow: "cubic-bezier(.405, 0, .025, 1)",
        "minor-spring": "cubic-bezier(0.76,0.34,0.38,1.64)",
      },
      transitionDuration: {
        mid: "3s",
        long: "10s",
      },
    },
  },
};
