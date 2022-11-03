import { useState } from "react";
import Calculations from "./Calculations";

export type CalculationProps = {
  hour?: string | null;
  minute?: string | null;
  isAm?: boolean;
  isAdding?: boolean;
  sleepNow?: boolean;
};

const Form = (): JSX.Element => {
  const hours: Array<string> = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const minutes: Array<string> = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  const [fallAsleep, setFallAsleep] = useState(false);
  const [hour, setHour] = useState<string>(hours[0]);
  const [minute, setMinute] = useState<string>(minutes[0]);
  const [isAm, setIsAm] = useState<boolean>(true);
  const [showCalculations, setShowCalculations] = useState<boolean>(false);
  const [sleepNow, setSleepNow] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(false);

  const toggleFallAsleep = (): void => {
    setFallAsleep((prevState) => !prevState);
  };

  const showCalculation = (): void => {
    setFade(true);
    setShowCalculations(true);
    setSleepNow(false);
  };

  const showSleepNow = (): void => {
    setFade(true);
    setShowCalculations(true);
    setSleepNow(true);
  };

  const toggleAmPm = (): void => {
    setIsAm((prevState) => !prevState);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setHour(e.target.value);
  };

  const handleMinuteChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setMinute(e.target.value);
  };

  return (
    <div className="p-6 text-center">
      <div className="p-4 md:p-0">
        <div className="p-4">
          <span className="select-none text-xl">
            I want to{" "}
            <span
              aria-label="fall asleep/wake up toggle"
              onClick={toggleFallAsleep}
              className="font cursor-pointer rounded bg-gray-800 p-2 underline underline-offset-4 hover:bg-gray-700"
            >
              {fallAsleep ? "fall asleep" : "wake up"}
            </span>{" "}
            at...
          </span>
        </div>
        <div className="mb-4 rounded border border-gray-900 bg-gray-800 p-4 shadow-xl">
          <div className="flex flex-col justify-center gap-4 p-4 md:flex-row">
            <select
              name="hour"
              defaultValue="Select Hour"
              onChange={handleHourChange}
              className="rounded border border-gray-500 bg-gray-800 p-2 px-3"
              required
            >
              <option value="Select Hour" disabled>
                Select Hour
              </option>
              {hours.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              name="minute"
              defaultValue="Select Minute"
              onChange={handleMinuteChange}
              className="rounded border border-gray-500 bg-gray-800 p-2 px-3"
              required
            >
              <option value="Select Minute" disabled>
                Select Minute
              </option>
              {minutes.map((minute, index) => (
                <option key={index} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <select
              onChange={toggleAmPm}
              name="am-pm"
              className="rounded border border-gray-500 bg-gray-800 p-2 px-3"
            >
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </div>
          <div className="flex items-center justify-center gap-4 p-4">
            <button
              onClick={showCalculation}
              className="rounded border border-gray-500 p-2 px-3 hover:bg-gray-700"
            >
              Calculate
            </button>
            <button
              onClick={showSleepNow}
              className="rounded border border-gray-500 p-2 px-3 hover:bg-gray-700"
            >
              Sleep Now
            </button>
          </div>
        </div>
        <div
          className={`transition-all duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {showCalculations && !sleepNow && (
            <Calculations
              hour={hour}
              minute={minute}
              isAm={isAm}
              isAdding={fallAsleep}
            />
          )}
          {showCalculations && sleepNow && (
            <Calculations isAm={isAm} isAdding={true} sleepNow={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
