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
  }>;
  forecastData?: Array<{
    date: string;
    demand: number;
  }>;
}

const mockHistoricalData = [
  { date: "January", demand: 120 },
  { date: "February", demand: 130 },
  { date: "March", demand: 145 },
  { date: "April", demand: 160 },
  { date: "May", demand: 170 },
  { date: "June", demand: 190 },
  { date: "July", demand: 210 },
  { date: "August", demand: 205 },
  { date: "September", demand: 185 },
  { date: "October", demand: 165 },
  { date: "November", demand: 150 },
  { date: "December", demand: 140 },
];

const mockForecastData = [
  { date: "January", demand: 125 },
  { date: "February", demand: 135 },
  { date: "March", demand: 150 },
  { date: "April", demand: 165 },
  { date: "May", demand: 175 },
  { date: "June", demand: 195 },
  { date: "July", demand: 215 },
  { date: "August", demand: 210 },
  { date: "September", demand: 190 },
  { date: "October", demand: 170 },
  { date: "November", demand: 155 },
  { date: "December", demand: 145 },
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
            {locationName} Monthly Load Demand -{" "}
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
                    name="Load Demand"
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
                  <Bar dataKey="demand" fill="#f97316" name="Load Demand" />
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
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.6}
                    name="Load Demand"
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