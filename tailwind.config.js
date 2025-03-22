/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'meteor': 'meteor 5s linear infinite',
        'pulse-slow': 'pulse 6s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float-1': 'float1 25s ease-in-out infinite',
        'float-2': 'float2 30s ease-in-out infinite',
        'float-3': 'float3 35s ease-in-out infinite',
        'float-4': 'float4 40s ease-in-out infinite',
        'float-5': 'float5 45s ease-in-out infinite',
        'float-6': 'float6 50s ease-in-out infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: 0 },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -50px) rotate(15deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(-10deg)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-40px, -30px) rotate(-15deg)' },
          '66%': { transform: 'translate(30px, 40px) rotate(10deg)' },
        },
        float3: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(50px, -20px) rotate(10deg)' },
          '66%': { transform: 'translate(-40px, -40px) rotate(-20deg)' },
        },
        float4: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-30px, 50px) rotate(-5deg)' },
          '66%': { transform: 'translate(40px, -30px) rotate(15deg)' },
        },
        float5: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(20px, 60px) rotate(20deg)' },
          '66%': { transform: 'translate(-50px, -20px) rotate(-15deg)' },
        },
        float6: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-60px, -30px) rotate(-20deg)' },
          '66%': { transform: 'translate(30px, 40px) rotate(25deg)' },
        },
      },
    },
  },
  plugins: [heroui(), require("tailwindcss-animate")],
}