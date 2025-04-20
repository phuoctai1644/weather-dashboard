import { TemperatureUnit } from "./const";

export const convertTemperature = (temp, unit) => {
  const conversions = {
    [TemperatureUnit.IMPERIAL]: (temp * 9) / 5 + 32,
    [TemperatureUnit.KELVIN]: temp + 273.15,
    [TemperatureUnit.METRIC]: temp,
  };

  return conversions[unit] ?? temp;
};
