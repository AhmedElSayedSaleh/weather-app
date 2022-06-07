const tomtomApiKey = "fzl4lYRf8GT9jgfXRAwA3gsuX2uckhEK";

const getCityLocation = async (city) => {
  // tomtom api key

  const url = `https://api.tomtom.com/search/2/geocode/${city}.json?limit=1&key=${tomtomApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { lat, lon } = data.results[0].position;
    const address = data.results[0].address.freeformAddress;
    console.log(data);
    return { lat, lon, address };
  } catch (err) {
    console.log(err);
  }
};
