interface Coordinates {
  latitude: any;
  longitude: any;
}

const token: any = import.meta.env.VITE_BIG_DATA_ACCESS_TOKEN;

export const getAddress = async ({ latitude, longitude }: Coordinates) => {
  if (latitude && longitude) {
    try {
      const res = await fetch(
        `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${token}`
      );

      const data = await res.json();
      const { principalSubdivision: state, city, locality } = data;
      return { state, city, locality };
    } catch (error) {
      console.log(error);
    }
  }
};
