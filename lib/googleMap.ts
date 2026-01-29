export type LatLng = {
  lat: number;
  lng: number;
};

export const geocodeAddress = (address: string): Promise<LatLng | null> => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject(new Error("Google Maps API not loaded"));
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        reject(new Error(`Geocode failed: ${status}`));
      }
    });
  });
};
