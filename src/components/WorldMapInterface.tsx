import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DataSidebar from "./DataSidebar";
//import TimeControls from "./TimeControls";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Settings,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issues in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


interface WorldMapInterfaceProps {
  isVisible?: boolean;
  onClose?: () => void;
  selectedDate: string;
  onPredictionResult: (data: any) => void;
}

const WorldMapInterface: React.FC<WorldMapInterfaceProps> = ({
  isVisible = true,
  onClose = () => console.log("Close map interface"),
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("Global");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>("globe");
  const globeRef = useRef<HTMLDivElement>(null);

  // New state for selected date (default value; later integrate with TimeControls)
  const [selectedDate, setSelectedDate] = useState<string>("2025-04-15");

  // West Bengal districts for markers (example)
  const districts = [
    { id: 1, name: "Kolkata", coordinates: { lat: 22.5726, lng: 88.3639 } },
    { id: 2, name: "Howrah", coordinates: { lat: 22.5958, lng: 88.2636 } },
    { id: 3, name: "North 24 Parganas", coordinates: { lat: 22.7587, lng: 88.4189 } },
    { id: 4, name: "Birbhum", coordinates: { lat: 23.8000, lng: 87.6000 } },
    { id: 5, name: "Bardhaman", coordinates: { lat: 23.2545, lng: 87.8619 } },
    // Add more districts as needed...
  ];

  // State to hold GeoJSON data for West Bengal boundaries
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    // Fetch GeoJSON file from public folder
    fetch("/WestBengal.geojson")
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  // Modified: Now makes a backend call when a marker is clicked
  const handleRegionSelect = async (district: string) => {
    setIsLoading(true);
    setSelectedRegion(district);

    try {
      const response = await fetch(
        `https://your-render-service-url.onrender.com/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ district, date: selectedDate }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Prediction result:", data);
      // You can pass the prediction result to your DataSidebar here if needed.
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleTimeChange = (time: Date) => {
    console.log("Time changed:", time);
    // Optionally update selectedDate if TimeControls changes it
  };

  const handleSpeedChange = (speed: number) => {
    console.log("Animation speed changed:", speed);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for child elements
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed inset-0 bg-white dark:bg-gray-950 ${isFullscreen ? "z-50" : "z-40"}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="h-full flex flex-col">
        {/* Header with controls */}
        <motion.div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center" variants={itemVariants}>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Back to Landing
            </Button>
            <h1 className="text-xl font-bold">Energy Load Forecasting Map</h1>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setActiveView(activeView === "globe" ? "map" : "globe")}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle view mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom in</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map visualization */}
          <motion.div className="flex-1 relative" variants={itemVariants}>
            <Tabs value={activeView} onValueChange={setActiveView} className="h-full">
              <TabsList className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <TabsTrigger value="globe">3D Globe</TabsTrigger>
                <TabsTrigger value="map">Flat Map</TabsTrigger>
              </TabsList>

              <TabsContent value="globe" className="h-full">
                <div
                  ref={globeRef}
                  className="w-full h-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Replace with actual 3D globe visualization */}
                  <div className="relative w-[500px] h-[500px] rounded-full bg-blue-200 dark:bg-blue-800 overflow-hidden">
                    <div className="absolute top-[20%] left-[15%] w-[20%] h-[30%] bg-green-300 dark:bg-green-700 opacity-80"></div>
                    <div className="absolute top-[25%] left-[40%] w-[25%] h-[20%] bg-green-300 dark:bg-green-700 opacity-80"></div>
                    <div className="absolute top-[55%] left-[30%] w-[15%] h-[20%] bg-green-300 dark:bg-green-700 opacity-80"></div>
                    <div className="absolute top-[60%] left-[70%] w-[15%] h-[15%] bg-green-300 dark:bg-green-700 opacity-80"></div>

                    {/* Example: Displaying district markers on the 3D globe */}
                    {districts.map((district) => (
                      <Button
                        key={district.id}
                        variant="outline"
                        size="sm"
                        className={`absolute rounded-full p-1 ${selectedRegion === district.name ? "bg-red-500 text-white" : "bg-white/80"}`}
                        style={{
                          top: `${50 - district.coordinates.lat * 0.5}%`,
                          left: `${50 + district.coordinates.lng * 0.5}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => handleRegionSelect(district.name)}
                      >
                        <Info className="h-3 w-3" />
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="map" className="h-full">
                <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  {/* Flat map visualization with GeoJSON layer */}
                  <MapContainer center={[22.5726, 88.3639]} zoom={7} style={{ width: "100%", height: "100%" }}>
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Render GeoJSON boundaries if loaded */}
                    {geoJsonData && (
                      <GeoJSON
                        data={geoJsonData}
                        style={() => ({
                          color: "#3388ff",
                          weight: 2,
                          fillOpacity: 0.1,
                        })}
                      />
                    )}
                    {/* District markers */}
                    {districts.map((district) => (
                      <Marker
                        key={district.id}
                        position={[district.coordinates.lat, district.coordinates.lng]}
                        eventHandlers={{
                          click: () => handleRegionSelect(district.name),
                        }}
                      >
                        <Popup>{district.name}</Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Data sidebar */}
          <motion.div className="w-[350px] border-l border-gray-200 dark:border-gray-800" variants={itemVariants}>
            <DataSidebar
              regionName={selectedRegion}
              isLoading={isLoading}
              onRefresh={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
              }}
              onExport={() => console.log("Exporting data for", selectedRegion)}
              onFilterChange={(filter) => console.log("Filter changed:", filter)}
            />
          </motion.div>
        </div>

        
      </div>
    </motion.div>
  );
};

export default WorldMapInterface;
