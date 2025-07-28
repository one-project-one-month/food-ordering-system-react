interface Coordinates {
  latitude: number;
  longitude: number;
}
//  //  // Use the environment variable for the access token
export const getAddress = async ({ latitude, longitude }: Coordinates) => {
  console.log(import.meta.env.BIG_DATA_ACCESS_TOKEN);
  console.log('Fetching address for:', latitude, longitude);
  const res = await fetch(
    `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${import.meta.env.VITE_BIG_DATA_ACCESS_TOKEN}`
  );
  if (!res.ok) throw new Error('Failed to fetch address');
  const data = await res.json();
  const { principalSubdivision: state, city, locality } = data;
  return { state, city, locality };
};
