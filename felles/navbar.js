let navbar;

const apper = [
  {
    navn: "Bruktbutikk",
    lokasjon: "../bruktbutikk",
  },
  {
    navn: "Ordliste",
    lokasjon: "../ordliste",
  },
  {
    navn: "Valutakalkulator",
    lokasjon: "../valutakalkulator",
  },
  {
    navn: "Temperaturkalkulator",
    lokasjon: "../temperaturkalkulator",
  },
  {
    navn: "Pong",
    lokasjon: "../pong",
  },
  {
    navn: "Snake",
    lokasjon: "../snake",
  },
  {
    navn: "Soundify",
    lokasjon: "../soundify",
  },
];

navbar = document.getElementById("navbar");

apper.forEach((app) => {
  nyLenke(app);
});

function nyLenke({ navn, lokasjon }) {
  const lenkeElement = document.createElement("a");
  lenkeElement.href = lokasjon;
  lenkeElement.innerHTML = navn;
  lenkeElement.classList.add("lenke");

  navbar.appendChild(lenkeElement);
}
