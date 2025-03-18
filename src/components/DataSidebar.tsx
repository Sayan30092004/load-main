import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Download, Filter, RefreshCw } from "lucide-react";
import MetricsPanel from "./MetricsPanel";
import DataVisualization from "./DataVisualization";

interface DataSidebarProps {
  regionName?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  onFilterChange?: (filter: string) => void;
}

const DataSidebar: React.FC<DataSidebarProps> = ({
  regionName = "Global",
  isLoading = false,
  onRefresh = () => console.log("Refresh data"),
  onExport = () => console.log("Export data"),
  onFilterChange = (filter) => console.log(`Filter changed to: ${filter}`),
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{regionName} Data</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download size={16} />
          </Button>
          <Button variant="outline" size="sm">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Metrics Panel */}
        <div className="h-[250px]">
          <MetricsPanel regionName={regionName} />
        </div>

        {/* Data Visualization */}
        <Tabs defaultValue="charts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="charts" className="mt-2">
            <div className="h-[450px]">
              <DataVisualization locationName={regionName} />
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-2">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Peak Demand</p>
                      <p className="text-2xl font-bold">195 MW</p>
                      <p className="text-xs text-gray-500">
                        +12% from last month
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Average Supply</p>
                      <p className="text-2xl font-bold">180 MW</p>
                      <p className="text-xs text-gray-500">
                        +5% from last month
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Supply Deficit</p>
                      <p className="text-2xl font-bold">15 MW</p>
                      <p className="text-xs text-gray-500">
                        Critical threshold: 20 MW
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Forecast Accuracy</p>
                      <p className="text-2xl font-bold">92%</p>
                      <p className="text-xs text-gray-500">
                        +2% from last month
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">Recent Events</h3>
                    <div className="space-y-2">
                      {[
                        {
                          date: "2023-06-15",
                          event: "Demand spike during heatwave",
                          impact: "High",
                        },
                        {
                          date: "2023-06-10",
                          event: "Maintenance on power plant #3",
                          impact: "Medium",
                        },
                        {
                          date: "2023-06-05",
                          event: "Grid stabilization measures implemented",
                          impact: "Low",
                        },
                      ].map((event, i) => (
                        <div
                          key={i}
                          className="p-2 text-sm border border-gray-200 dark:border-gray-800 rounded-md"
                        >
                          <div className="flex justify-between">
                            <span>{event.date}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                event.impact === "High"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : event.impact === "Medium"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              }`}
                            >
                              {event.impact}
                            </span>
                          </div>
                          <p className="mt-1">{event.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataSidebar;
