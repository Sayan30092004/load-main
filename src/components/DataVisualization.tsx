import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface DataVisualizationProps {
  locationName?: string;
  historicalData?: Array<{
    date: string;
    demand: number;
    supply: number;
    blackoutProbability: number;
  }>;
  forecastData?: Array<{
    date: string;
    demand: number;
    supply: number;
    blackoutProbability: number;
  }>;
}

const mockHistoricalData = [
  { date: "2023-01", demand: 120, supply: 140, blackoutProbability: 0.02 },
  { date: "2023-02", demand: 130, supply: 145, blackoutProbability: 0.03 },
  { date: "2023-03", demand: 145, supply: 150, blackoutProbability: 0.04 },
  { date: "2023-04", demand: 160, supply: 165, blackoutProbability: 0.05 },
  { date: "2023-05", demand: 170, supply: 160, blackoutProbability: 0.08 },
  { date: "2023-06", demand: 190, supply: 180, blackoutProbability: 0.12 },
];

const mockForecastData = [
  { date: "2023-07", demand: 195, supply: 185, blackoutProbability: 0.1 },
  { date: "2023-08", demand: 200, supply: 190, blackoutProbability: 0.09 },
  { date: "2023-09", demand: 185, supply: 195, blackoutProbability: 0.05 },
  { date: "2023-10", demand: 175, supply: 190, blackoutProbability: 0.04 },
  { date: "2023-11", demand: 165, supply: 185, blackoutProbability: 0.03 },
  { date: "2023-12", demand: 155, supply: 180, blackoutProbability: 0.02 },
];

const DataVisualization: React.FC<DataVisualizationProps> = ({
  locationName = "Global",
  historicalData = mockHistoricalData,
  forecastData = mockForecastData,
}) => {
  const [chartType, setChartType] = useState("line");
  const [dataType, setDataType] = useState("historical");

  const currentData = dataType === "historical" ? historicalData : forecastData;

  return (
    <div className="w-full h-full bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
      <Card className="border-0 shadow-none h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            {locationName} Energy Data -{" "}
            {dataType === "historical" ? "Historical" : "Forecast"}
          </CardTitle>
          <div className="flex justify-between items-center mt-2">
            <Tabs
              defaultValue="historical"
              className="w-[200px]"
              onValueChange={setDataType}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="historical">Historical</TabsTrigger>
                <TabsTrigger value="forecast">Forecast</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs
              defaultValue="line"
              className="w-[250px]"
              onValueChange={setChartType}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="bar">Bar</TabsTrigger>
                <TabsTrigger value="area">Area</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[400px] w-full">
            {chartType === "line" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={currentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="demand"
                    stroke="#f97316"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="supply"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="blackoutProbability"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            {chartType === "bar" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={currentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="demand" fill="#f97316" />
                  <Bar dataKey="supply" fill="#3b82f6" />
                  <Bar dataKey="blackoutProbability" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            )}
            {chartType === "area" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={currentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="demand"
                    stackId="1"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="supply"
                    stackId="2"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="blackoutProbability"
                    stackId="3"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
