import React, { useState } from "react";
import WorldMapInterface from "./components/WorldMapInterface";
import LandingHero from "./components/LandingHero";

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("2025-04-15");
  const [prediction, setPrediction] = useState<any>(null);
  const [showMainInterface, setShowMainInterface] = useState<boolean>(false);

  const handlePredictionResult = (data: any) => {
    setPrediction(data);
  };

  return (
    <div className="home-container">
      {!showMainInterface ? (
        <LandingHero onTryNowClick={() => setShowMainInterface(true)} />
      ) : (
        <>
          <WorldMapInterface
            selectedDate={selectedDate}
            onPredictionResult={handlePredictionResult}
          />
          {prediction && (
            <div className="prediction-results p-4">
              <h2>Prediction Results</h2>
              <p><strong>District:</strong> {prediction.district}</p>
              <p><strong>Load Demand:</strong> {prediction.load?.toFixed(2)} MW</p>
              <p><strong>Price:</strong> ₹{prediction.price?.toFixed(2)} / kWh</p>
              <p><strong>Blackout Chance:</strong> {prediction.blackout_chance?.toFixed(2)} %</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
