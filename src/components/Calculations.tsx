import { addMinutes, subMinutes, format, parse } from "date-fns";
import { CalculationProps } from "./Form";

const Calculations = ({
  isAdding,
  hour,
  minute,
  isAm,
  sleepNow = false,
}: CalculationProps): JSX.Element | null => {
  if (!sleepNow && !hour && !minute) {
    return <></>;
  }
  const AM_OR_PM = isAm ? "AM" : "PM";
  const cycleTime: number = 90;
  const parseTime = !sleepNow
    ? parse(
        `${Number(hour)}:${Number(minute)} ${AM_OR_PM}`,
        "h:m a",
        new Date(2022, 10, 1, Number(hour), Number(minute))
      )
    : new Date();

  let cycles: Array<Date> = [];

  // isAdding true: wake up at x time
  // isAdding false: go to sleep at x time
  if (isAdding) {
    cycles = [
      addMinutes(parseTime, 3 * cycleTime),
      addMinutes(parseTime, 4 * cycleTime),
      addMinutes(parseTime, 5 * cycleTime),
      addMinutes(parseTime, 6 * cycleTime),
    ];
  } else if (!isAdding) {
    cycles = [
      subMinutes(parseTime, 6 * cycleTime),
      subMinutes(parseTime, 5 * cycleTime),
      subMinutes(parseTime, 4 * cycleTime),
      subMinutes(parseTime, 3 * cycleTime),
    ];
  }

  return (
    <div className="flex flex-col rounded border border-gray-500 bg-gray-800 p-6 shadow-xl">
      <h3 className="pb-4">
        You should try to {!isAdding ? "fall asleep" : "wake up"} at one of the
        following times:{" "}
      </h3>
      {cycles.map((cycle, index) => (
        <div
          key={index}
          className="justify flex items-center justify-center py-1 text-xl md:justify-start md:text-2xl"
        >
          <h3 className="mr-6 inline">{index + 1}.)</h3>
          <div className="text-lg md:text-xl">
            <span className="font-bold italic">{format(cycle, "hh:mm a")}</span>{" "}
            for{" "}
            {isAdding
              ? ((index + 3) * cycleTime) / 60
              : ((6 - index) * cycleTime) / 60}{" "}
            Hours of Sleep ({isAdding ? index + 3 : 6 - index} Cycles)
          </div>
        </div>
      ))}
      <p className="pt-4">
        Note: On average, it takes 14 minutes for humans to fall asleep.
      </p>
    </div>
  );
};

export default Calculations;
