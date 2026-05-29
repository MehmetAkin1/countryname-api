import countries from "../countries.json";

function findCountry(query) {

  query = query
    .toLowerCase()
    .trim();

  if (countries[query]) {
    return countries[query];
  }

  for (const key in countries) {

    const c = countries[key];

    if (
      c.aliases &&
      c.aliases.includes(query)
    ) {
      return c;
    }
  }

  return null;
}

export default function handler(req, res) {

  const name = req.query.name;

  // RANDOM
  if (
    !name ||
    name === "$(1)" ||
    name.trim() === ""
  ) {

    const keys =
      Object.keys(countries);

    const randomKey =
      keys[Math.floor(Math.random() * keys.length)];

    const c = countries[randomKey];

    return res.status(200).send(
      `🌍 ${c.english} • ${c.local} • Pronounced: ${c.pronunciation}`
    );
  }

  // SPECIFIC
  const country =
    findCountry(name);

  if (country) {

    return res.status(200).send(
      `🌍 ${country.english} • ${country.local} • Pronounced: ${country.pronunciation}`
    );
  }

  return res
    .status(200)
    .send("❌ Country not found");
}
