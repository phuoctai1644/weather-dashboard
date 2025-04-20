export const DEFAULT_CITY = "Hanoi";
export const USER_SELECTED_CITY = "weatherCity";

export const TemperatureUnit = {
  IMPERIAL: 'imperial',
  KELVIN: 'kelvin',
  METRIC: 'metric',
};

export const TEMPERATURE_UNITS = [
  {
    label: "Celsius",
    symbol: "°C",
    value: TemperatureUnit.METRIC,
    unit: "C",
  },
  {
    label: "Fahrenheit",
    symbol: "°F",
    value: TemperatureUnit.IMPERIAL,
    unit: "F",
  },
  {
    label: "Kelvin",
    symbol: "K",
    value: TemperatureUnit.KELVIN,
    unit: "K",
  },
];
