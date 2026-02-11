export type CampusState = {
  hokkaido: string[];
  tohoku: string[];
  tokyo: string[];
  kita_kanto: string[];
  minami_kanto: string[];
  tokai: string[];
  hokuriku: string[];
  koshinetsu: string[];
  kinki: string[];
  chugoku: string[];
  shikoku: string[];
  kyushu: string[];
  okinawa: string[];
};

export const INITIAL_CAMPUS_STATE: CampusState = {
  hokkaido: [],
  tohoku: [],
  tokyo: [],
  kita_kanto: [],
  minami_kanto: [],
  tokai: [],
  hokuriku: [],
  koshinetsu: [],
  kinki: [],
  chugoku: [],
  shikoku: [],
  kyushu: [],
  okinawa: [],
};

export type Campus = {
  id: string;
  address: string;
  label: string;
  locationId: string;
  value: string;
};

export type Region = {
  id: string;
  locations: Campus[];
};

export const regions: Region[] = [];
