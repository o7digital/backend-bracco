import { countryCoverage, departmentCatalog, teamDirectory } from "@bracco/config";

export const listUsers = () => teamDirectory;

export const getDirectorySummary = () => ({
  totalUsers: teamDirectory.length,
  activeCountries: countryCoverage.length,
  departments: departmentCatalog.length,
  multiLanguageUsers: teamDirectory.filter((entry) => entry.languages.length > 1).length,
});
