import React, { useState } from "react";
import LandingHero from "./LandingHero";
import WorldMapInterface from "./WorldMapInterface";

const Home: React.FC = () => {
  const [showMap, setShowMap] = useState<boolean>(false);

  const handleTryNowClick = () => {
    setShowMap(true);
  };

  const handleBackToLanding = () => {
    setShowMap(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {!showMap && <LandingHero onTryNowClick={handleTryNowClick} />}
      {showMap && (
        <WorldMapInterface isVisible={true} onClose={handleBackToLanding} />
      )}
    </div>
  );
};

export default Home;
