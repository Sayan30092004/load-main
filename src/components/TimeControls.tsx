import React, { useState } from "react";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface TimeControlsProps {
  onTimeChange?: (time: Date) => void;
  onSpeedChange?: (speed: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  isPlaying?: boolean;
}

const TimeControls = ({
  onTimeChange = () => {},
  onSpeedChange = () => {},
  onPlay = () => {},
  onPause = () => {},
  isPlaying = false,
}: TimeControlsProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [speed, setSpeed] = useState<number>(1);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onTimeChange(newDate);
  };

  const handleSpeedChange = (newSpeed: number[]) => {
    setSpeed(newSpeed[0]);
    onSpeedChange(newSpeed[0]);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleSkipForward = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    handleDateChange(newDate);
  };

  const handleSkipBackward = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    handleDateChange(newDate);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && handleDateChange(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSkipBackward}
          className="rounded-full"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handlePlayPause}
          className="rounded-full"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleSkipForward}
          className="rounded-full"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 w-full md:w-1/3">
        <span className="text-sm text-gray-500 whitespace-nowrap">
          Speed: {speed}x
        </span>
        <Slider
          defaultValue={[1]}
          max={5}
          min={0.5}
          step={0.5}
          value={[speed]}
          onValueChange={handleSpeedChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TimeControls;
