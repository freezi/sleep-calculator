module.exports = {
  plugins: {
    // https://tailwindcss.com/docs/using-with-preprocessors
    "tailwindcss/nesting": "postcss-nesting",
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
