import { countryCoverage, languageCoverage } from "@bracco/config";

export const listCountries = () => countryCoverage;

export const listLanguageCoverage = () => languageCoverage;

export const getCountrySummary = () => ({
  markets: countryCoverage.length,
  languages: languageCoverage.length,
  regions: [...new Set(countryCoverage.map((country) => country.region))].length,
});
