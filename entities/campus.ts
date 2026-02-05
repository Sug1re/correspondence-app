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

export const INITIAL_CAMPUS_STATE: CampusState = {
  hokkaido: [],
  tohoku: [],
  kanto: [],
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
  value: string;
  label: string;
  lat: number;
  lng: number;
  address: string;
};

//あとで住所追加する
export const CAMPUSES: Campus[] = [
  { value: "Sapporo Odori", label: "札幌大通り（北海道）", lat: 43.0621, lng: 141.3537, address: "北海道札幌市中央区南1条西1-9" },
  { value: "Hakodate", label: "北海道函館（北海道）", lat: 41.7744, lng: 140.7265, address: "北海道函館市本町6-12" },
  { value: "Sendai Hirose-dori", label: "仙台広瀬通（宮城県）", lat: 38.2618, lng: 140.8719, address: "宮城県仙台市青葉区国分町1-6-9" },
  { value: "Sendai Shin-Terakoji", label: "仙台新寺通（宮城県）", lat: 38.2573, lng: 140.8841, address: "宮城県仙台市若林区新寺2-1-6 " },
  { value: "Fukushima", label: "福島（福島県）", lat: 37.7502, lng: 140.4676, address: "福島県福島市舟場町1-20" },
  { value: "Fukushima Koriyama", label: "福島郡山（福島県）", lat: 37.3995, lng: 140.3846, address: "福島県郡山市駅前2-3-7" },
  { value: "Iwaki", label: "いわき（福島県）", lat: 37.0505, lng: 140.8803, address: "福島県いわき市" },
  { value: "Aomori", label: "青森（青森県）", lat: 40.8240, lng: 140.7375, address: "青森県青森市" },
  { value: "Iwate Morioka", label: "岩手盛岡（岩手県）", lat: 39.7029, lng: 141.1378, address: "岩手県盛岡市" },
  { value: "Yamagata", label: "山形（山形県）", lat: 38.2554, lng: 140.3399, address: "山形県山形市" },
  { value: "Akita", label: "秋田（秋田県）", lat: 39.7196, lng: 140.1023, address: "秋田県秋田市" },
  { value: "Nagoya Sakae", label: "名古屋栄（愛知県）", lat: 35.1709, lng: 136.9090, address: "愛知県名古屋市中区栄" },
  { value: "Meieki", label: "名駅（愛知県）", lat: 35.1714, lng: 136.8816, address: "愛知県名古屋市中村区名駅" },
  { value: "Higashi Okazaki", label: "東岡崎（愛知県）", lat: 34.9463, lng: 137.1706, address: "愛知県岡崎市明大寺本町" },
  { value: "Toyota", label: "豊田（愛知県）", lat: 35.0837, lng: 137.1528, address: "愛知県豊田市" },
  { value: "Shizuoka", label: "静岡（静岡県）", lat: 34.9701, lng: 138.3831, address: "静岡県静岡市" },
  { value: "Shizuoka Numazu", label: "静岡沼津（静岡県）", lat: 35.1054, lng: 138.8647, address: "静岡県沼津市" },
  { value: "Hamamatsu", label: "浜松（静岡県）", lat: 34.7107, lng: 137.7335, address: "静岡県浜松市" },
  { value: "Gifu", label: "岐阜（岐阜県）", lat: 35.3911, lng: 136.7223, address: "岐阜県岐阜市" },
  { value: "Mie", label: "三重（三重県）", lat: 34.7303, lng: 136.5086, address: "三重県津市" },
  { value: "Kanazawa", label: "金沢（石川県）", lat: 36.5612, lng: 136.6562, address: "石川県金沢市" },
  { value: "Toyama", label: "富山（富山県）", lat: 36.6953, lng: 137.2117, address: "富山県富山市" },
  { value: "Fukui", label: "福井（福井県）", lat: 36.0640, lng: 136.2217, address: "福井県福井市" },
  { value: "Niigata", label: "新潟（新潟県）", lat: 37.9162, lng: 139.0364, address: "新潟県新潟市中央区東大通2-1-20" },
  { value: "Niigata Nagaoka", label: "新潟長岡（新潟県）", lat: 37.4475, lng: 138.8475, address: "新潟県長岡市" },
  { value: "Nagano", label: "長野（長野県）", lat: 36.6517, lng: 138.1824, address: "長野県長野市" },
  { value: "Nagano Matsumoto", label: "長野松本（長野県）", lat: 36.2307, lng: 137.9691, address: "長野県松本市" },
  { value: "Yamanashi", label: "山梨（山梨県）", lat: 35.6642, lng: 138.5684, address: "山梨県甲府市" },
];
