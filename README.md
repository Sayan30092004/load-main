# Load Forecaster
React + Typescripte + Vite

# Overview

Load Forecaster is a web-based application that predicts blackout probability for specific locations. It integrates a flat world map focused on West Bengal and uses AI-driven analysis to estimate the likelihood of power outages.
![LP](https://github.com/user-attachments/assets/e9d07046-885c-42fc-b352-e614e29d99b9)

# Features

Blackout Prediction: Provides real-time probability estimates of blackouts for selected loc
ations.

Integrated Map: Displays a flat world map centered on West Bengal for easy location selection.

AI-Powered Forecasting: Uses machine learning models to analyze power grid data and predict outages.

User-Friendly Interface: Simple and intuitive UI for seamless interaction.

This template provides a minimal setup to get React working in Vite with HMR and some ESLinthttps://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
