export type CampusState = {
  hokkaido: string[];
  tohoku: string[];
  kanto: string[];
  tokai: string[];
  hokuriku: string[];
  koshinetsu: string[];
  kinki: string[];
  chugoku: string[];
  shikoku: string[];
  kyushu: string[];
  okinawa: string[];
};

export const CAMPUSES = {
  niigata: {
    label: "新潟",
    address: "新潟県新潟市中央区東大通2-1-20",
  },
  nagaoka: {
    label: "新潟長岡",
    address: "新潟県長岡市表町1-11-1",
  },
} as const;
