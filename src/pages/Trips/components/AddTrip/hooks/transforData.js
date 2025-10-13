export const transformTripData = (data) => {
  if (!data || Object.keys(data).length === 0) return {};

  return {
    ...data,
    rate_confirmation: data.rate_confirmation ? [data.rate_confirmation] : [],
    bold_pod: data.bol_pod ? [data.bol_pod] : [],
    other_files: data.other_files ? [data.other_files] : [],

    shippers_id: data.shipper?.guid || data.shippers_id,
    companies_id_2: data.created_by?.guid || data.companies_id_2,

    driver_type: Array.isArray(data.driver_type)
      ? data.driver_type
      : data.driver_type
      ? [data.driver_type]
      : [],
    trip_type: Array.isArray(data.trip_type)
      ? data.trip_type
      : data.trip_type
      ? [data.trip_type]
      : [],
    status: Array.isArray(data.status)
      ? data.status
      : data.status
      ? [data.status]
      : [],

    lodify_fees_id: data.lodify_fee?.guid || data.lodify_fees_id,
    service_fee: data.lodify_fee?.amount || data.service_fee,

    trip_pickups: Array.isArray(data.pickups) ? data.pickups : [],

    accessorials: Array.isArray(data.accessorials) ? data.accessorials : [],
  };
};

export const transformFileData = (data) => {
  if (!data || Object.keys(data).length === 0) return {};

  return {
    ...data,
    rate_confirmation: data.rate_confirmation ? [data.rate_confirmation] : [],
    bold_pod: data.bol_pod ? [data.bol_pod] : [],
    other_files: data.other_files ? [data.other_files] : [],

    shippers_id: data.shipper?.guid || data.shippers_id,
    companies_id_2: data.created_by?.guid || data.companies_id_2,

    driver_type: Array.isArray(data.driver_type)
      ? data.driver_type
      : data.driver_type
      ? [data.driver_type]
      : [],
    trip_type: Array.isArray(data.stop_type)
      ? data.stop_type
      : data.stop_type
      ? [data.stop_type]
      : [],
    status: Array.isArray(data.status)
      ? data.status
      : data.status
      ? [data.status]
      : [],

    lodify_fees_id: data.lodify_fee?.guid || data.lodify_fees_id,
    service_fee: data.lodify_fee?.amount || data.service_fee,

    trip_pickups: Array.isArray(data.stops) ? data.stops : [],

    accessorials: Array.isArray(data.accessorials) ? data.accessorials : [],
  };
};
