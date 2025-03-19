## Load Forecaster
React + Typescripte + Vite

## Overview

Load Forecaster is a web-based application that predicts blackout probability for specific locations. It integrates a flat world map focused on West Bengal and uses AI-driven analysis to estimate the likelihood of power outages.

![LP](https://github.com/user-attachments/assets/e9d07046-885c-42fc-b352-e614e29d99b9)

## Features

Blackout Prediction: Provides real-time probability estimates of blackouts for selected loc
ations.
Integrated Map: Displays a flat world map centered on West Bengal for easy location selection.

AI-Powered Forecasting: Uses machine learning models to analyze power grid data and predict outages.

User-Friendly Interface: Simple and intuitive UI for seamless interaction.

## Technology Stack

 - Frontend: React.js + Typescripte + Vite
 - Backend: Python (Flask)
 - Machine Learning: TensorFlow
 - Mapping Service: OpenStreetMap / Leaflet.js

## Architectural Block Diagram

![mermaid-flow-1x](https://github.com/user-attachments/assets/849c1bd4-dca4-4b13-9f2c-5c48329f33a1)

## Installation and Setup

### Prerequisites
- Ensure you have the following installed:
    Node.js and npm
### Steps:
#### 1. Clone the repository:
``` Terminal
git clone https://github.com/yourusername/load-forecaster.git
cd load-forecaster
```
#### 2. Start in Google Colab
- Enable GPU for better performance.
- Install necessary dependencies.
- Upload any required files.
- Run your Flask backend code.
- Use **ngrok** to expose your Colab Flask server and get a public URL.
- Two api tokens would be required one open-router-api key of deepseek-r1-distill-llama-70b:free and ngrok token .

#### 3. Install frontend dependencies (if applicable):
``` Terminal
npm install
npm i react-leaflet
npm run dev
```
#### 4. Frontend Display Components
i) Navigation & Controls
- Back to Landing Button (Top left): Allows users to return to the main dashboard.
- Zoom Controls (Top left): + and - buttons for zooming in/out on the map.
- Settings & Search (Top right): Icons for additional settings, search, and map-related features.

ii) Map Integration
- Leaflet.js/OpenStreetMap: The map is rendered using Leaflet.js, an open-source mapping library.
- Region Boundaries: West Bengal’s state boundary is highlighted in blue using GeoJSON data.
- Location Markers: Pins indicate key locations (e.g., Kolkata, Asansol) with interactive popups.

iii) Data Sidebar (Right Panel)
- Title: Displays insights for the selected location.
- Energy Metrics:
-- Load Demand
-- Installed Capacity → Shows available energy generation.
-- Blackout Probability → Key metric for forecasting power outages.
- Charts & Details Toggle: Users can switch between Charts and Details views.
- Graph: Month vs Load Demand
  
![main](https://github.com/user-attachments/assets/38300449-7b87-4cc4-a414-f1996bbac1e0)

## Demo Video

https://github.com/user-attachments/assets/13c94446-3bca-4c63-8260-6343ee2c14b6

## Report on Synthetic Dataset and Blackout Chance Calculation
### 1. Introduction
This report outlines the methodology used to create the synthetic dataset for load forecasting and the formula applied to calculate blackout chances. The synthetic data was designed to reflect realistic energy consumption patterns and grid load variations, based on a combination of publicly available data, educated estimates, and domain-specific considerations.

### 2. Considerations for Creating the Synthetic Dataset
The synthetic dataset was generated to simulate real-world load demand data. The following key factors were considered:

#### a) Historical Data and Educated Guesses
- Data patterns and trends from publicly available sources were analyzed and incorporated.
- Educated guesses were made to fill gaps and create realistic variability in load demand.

#### b) Industrial Variables
- Industrial demand was modeled based on sector-wise consumption patterns.
- Peak operational hours and shifts in industrial activity were reflected in the data.

#### c) Seasonal Factors
- Seasonal changes in temperature, daylight hours, and weather conditions were factored in.
- Higher energy consumption was modeled for summer and winter months due to heating and cooling needs.

#### d) Operational Factors
- Grid efficiency, line losses, and maintenance periods were incorporated.
- Outages and infrastructure limitations were accounted for in the data.

#### e) Load Demand Variability
- Load demand was modeled to reflect daily and weekly variations.
- Sudden spikes due to industrial activity or weather events were included.

### 3. Formula for Blackout Chance Calculation
The blackout chance was calculated using the following formula:

\[
P_{\text{blackout}} = \max\left(0, \frac{(D - C)}{D} \cdot F_{\text{season}} \cdot F_{\text{industrial}} \cdot F_{\text{operational}} \cdot 100\%\right)
\]

Where:
- \( P_{\text{blackout}} \) = Probability of blackout (in percentage)
- \( D \) = Load demand at a given time (MW)
- \( C \) = Installed capacity (MW)
- \( F_{\text{season}} \) = Seasonal adjustment factor (e.g., higher in summer/winter)
- \( F_{\text{industrial}} \) = Industrial load factor (based on peak operation hours)
- \( F_{\text{operational}} \) = Operational factor (reflecting grid efficiency, maintenance, etc.)

#### Explanation:
- If load demand exceeds installed capacity, the blackout chance increases.
- Multiplying by seasonal, industrial, and operational factors adjusts the probability based on real-world constraints and fluctuations.
- If load demand is below capacity, the blackout chance is zero.

### 4. Conclusion
The synthetic dataset was constructed to provide a realistic foundation for load forecasting by incorporating diverse real-world factors. The blackout probability formula reflects the dynamic nature of power grids, accounting for industrial activity, seasonal variations, and operational conditions.
   
## Usage
### Why Use Load Forecaster?
- Power Grid Management: Helps utility companies optimize power distribution and prevent blackouts.
- Disaster Preparedness: Provides early warnings for areas with high blackout risks.
- Smart City Planning: Assists city planners in improving energy infrastructure.
- Industrial Use: Factories and industries can anticipate power disruptions and take preventive actions.
- Research & Analytics: A valuable tool for researchers studying energy consumption patterns and grid stability.

### Where Can It Be Used?
- Electricity Boards & Power Companies to manage energy loads effectively.
- Government & Municipal Bodies for city-wide energy planning.
- Industries & Manufacturing Units to mitigate production losses due to power failures.
- Smart Grids & IoT Systems to integrate predictive analytics for efficient energy use.

## Future Improvements
- Integration with real-time power grid data.
- Improved AI models for higher accuracy.
- Enhanced UI with additional visualization tools.

## License
- This project is licensed under the MIT License.


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
