/**
 * Common US Timezones
 * IANA timezone database identifiers
 */
export const US_TIMEZONES = {
  EASTERN: "America/New_York",
  CENTRAL: "America/Chicago",
  MOUNTAIN: "America/Denver",
  ARIZONA: "America/Phoenix", // Arizona (no DST)
  PACIFIC: "America/Los_Angeles",
  ALASKA: "America/Anchorage",
  HAWAII: "Pacific/Honolulu",
};

/**
 * Common timezones worldwide
 */
export const WORLD_TIMEZONES = {
  UTC: "UTC",
  GMT: "Europe/London",
  CET: "Europe/Paris", // Central European Time
  EET: "Europe/Athens", // Eastern European Time
  TOKYO: "Asia/Tokyo",
  BEIJING: "Asia/Shanghai",
  DUBAI: "Asia/Dubai",
  SYDNEY: "Australia/Sydney",
  TORONTO: "America/Toronto",
  MEXICO_CITY: "America/Mexico_City",
};

/**
 * All timezones combined
 */
export const TIMEZONES = {
  ...US_TIMEZONES,
  ...WORLD_TIMEZONES,
};

/**
 * Timezone options for dropdowns/selects
 */
export const TIMEZONE_OPTIONS = [
  { label: "Eastern Time (ET)", value: US_TIMEZONES.EASTERN },
  { label: "Central Time (CT)", value: US_TIMEZONES.CENTRAL },
  { label: "Mountain Time (MT)", value: US_TIMEZONES.MOUNTAIN },
  { label: "Arizona Time (MST)", value: US_TIMEZONES.ARIZONA },
  { label: "Pacific Time (PT)", value: US_TIMEZONES.PACIFIC },
  { label: "Alaska Time (AKT)", value: US_TIMEZONES.ALASKA },
  { label: "Hawaii Time (HT)", value: US_TIMEZONES.HAWAII },
];

/**
 * Get timezone abbreviation for a given IANA timezone
 * @param {string} timezone - IANA timezone identifier
 * @returns {string} - Timezone abbreviation
 */
export function getTimezoneAbbreviation(timezone) {
  const abbreviations = {
    "America/New_York": "ET",
    "America/Chicago": "CT",
    "America/Denver": "MT",
    "America/Phoenix": "MST",
    "America/Los_Angeles": "PT",
    "America/Anchorage": "AKT",
    "Pacific/Honolulu": "HT",
  };

  return abbreviations[timezone] || timezone;
}

/**
 * Get user's browser timezone
 * @returns {string} - IANA timezone identifier
 */
export function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
