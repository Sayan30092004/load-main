import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { AlertTriangle, Zap, Battery, Gauge } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

interface MetricsPanelProps {
  regionName?: string;
  demandLoad?: number;
  supplyLoad?: number;
  blackoutProbability?: number;
}

const MetricsPanel = ({
  regionName = "Global",
  demandLoad = 78,
  supplyLoad = 65,
  blackoutProbability = 12,
}: MetricsPanelProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>{regionName} Energy Metrics</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <AlertTriangle
                    size={18}
                    className={`${blackoutProbability > 20 ? "text-red-500" : "text-amber-400"}`}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current risk assessment for the region</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Demand Load */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              <span className="text-sm font-medium">Demand Load</span>
            </div>
            <span className="text-sm font-bold">{demandLoad}%</span>
          </div>
          <Progress value={demandLoad} className="h-2" />
          <p className="text-xs text-gray-500">
            Current energy consumption relative to capacity
          </p>
        </div>

        {/* Supply Load */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery size={16} className="text-green-500" />
              <span className="text-sm font-medium">Supply Load</span>
            </div>
            <span className="text-sm font-bold">{supplyLoad}%</span>
          </div>
          <Progress value={supplyLoad} className="h-2" />
          <p className="text-xs text-gray-500">
            Available energy supply relative to maximum capacity
          </p>
        </div>

        {/* Blackout Probability */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge
                size={16}
                className={`${blackoutProbability > 20 ? "text-red-500" : "text-amber-400"}`}
              />
              <span className="text-sm font-medium">Blackout Probability</span>
            </div>
            <span
              className={`text-sm font-bold ${blackoutProbability > 20 ? "text-red-500" : "text-amber-400"}`}
            >
              {blackoutProbability}%
            </span>
          </div>
          <Progress
  value={blackoutProbability}
  className={`h-2 ${
    blackoutProbability > 20 ? "bg-red-100 [&>div]:bg-red-500" : "bg-amber-100 [&>div]:bg-amber-400"
  }`}
/>

          <p className="text-xs text-gray-500">
            Estimated probability of energy shortage events
          </p>
        </div>

        <div className="pt-2 text-xs text-gray-400 italic">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsPanel;
