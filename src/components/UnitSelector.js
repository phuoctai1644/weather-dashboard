import { Listbox } from "@headlessui/react";
import { TEMPERATURE_UNITS } from "../utils/const";

const UnitSelector = ({ unit, onUnitChange }) => {
  const selected = TEMPERATURE_UNITS.find((u) => u.value === unit);

  return (
    <div className="w-full max-w-xs mx-auto mt-6">
      <Listbox value={unit} onChange={onUnitChange}>
        <div className="relative">
          <Listbox.Button className="w-full rounded-xl bg-white bg-opacity-70 backdrop-blur-md py-2 px-4 text-left font-semibold border border-gray-300 shadow-md flex justify-between items-center hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <span>{selected?.label} ({selected?.symbol})</span>
            <span className="text-gray-500">▼</span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {TEMPERATURE_UNITS.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 text-sm ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-800"
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{option.label} ({option.symbol})</span>
                    {selected && <span className="text-blue-500">✔</span>}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default UnitSelector;
