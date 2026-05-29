const countries = {
  germany: {
    english: "Germany",
    local: "Deutschland",
    pronunciation: "DOYTCH-land",
    aliases: ["almanya", "deutschland"]
  },

  greece: {
    english: "Greece",
    local: "Hellas",
    pronunciation: "HEL-las",
    aliases: ["yunanistan"]
  },

  finland: {
    english: "Finland",
    local: "Suomi",
    pronunciation: "SUO-mee",
    aliases: ["finlandiya"]
  },

  japan: {
    english: "Japan",
    local: "Nihon",
    pronunciation: "NEE-hon",
    aliases: ["japonya", "nippon"]
  },

  turkey: {
    english: "Turkey",
    local: "Türkiye",
    pronunciation: "TUR-key-yeh",
    aliases: ["turkiye", "türkiye"]
  }
};

function findCountry(query) {

  query = query.toLowerCase().trim();

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
