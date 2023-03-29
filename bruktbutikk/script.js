const artikler = [
  {
    id: 1,
    navn: "Laptop",
    pris: 1900,
    antall: 0,
  },
  {
    id: 2,
    navn: "Stasjonær PC",
    pris: 1500,
    antall: 0,
  },
  {
    id: 3,
    navn: "HD-skjerm, 1920x1080",
    pris: 600,
    antall: 0,
  },
  {
    id: 4,
    navn: "Tastatur og mus",
    pris: 150,
    antall: 0,
  },
];

const kunder = [];

const body = document.getElementById("body");
const artiklerElement = document.getElementById("artikler");

const total = document.createElement("h4");
total.innerText = "Total: 0,-";

const kunderElement = document.createElement("div");
kunderElement.classList.add("kunder");

var kunderÅpen = false;
const visKunderKnapp = document.createElement("button");
visKunderKnapp.textContent = "Vis kunder";
visKunderKnapp.onclick = () => visKunderTrykket();

window.onload = () => {
  initialiserSide();
};

function initialiserSide() {
  artikler.forEach((artikkel) => {
    nyArtikkelElement(artikkel);
  });

  body.appendChild(total);

  const nyKundeKnapp = document.createElement("button");
  nyKundeKnapp.textContent = "Ny kunde";
  nyKundeKnapp.onclick = () => nyKundeTrykket();

  body.appendChild(nyKundeKnapp);
  body.appendChild(visKunderKnapp);
  body.appendChild(kunderElement);
}

function nyArtikkelElement({ navn, pris, antall, id }) {
  const artikkelContainer = document.createElement("div");
  artikkelContainer.classList.add("artikkel");

  const navnElement = document.createElement("h4");
  navnElement.innerText = navn;

  const bunnElement = document.createElement("div");
  bunnElement.classList.add("bunn");

  const prisElement = document.createElement("h4");
  prisElement.innerText = `kr ${pris},-`;

  const antallInput = document.createElement("input");
  antallInput.type = "number";
  antallInput.min = "0";
  antallInput.value = antall.toString();
  antallInput.onchange = (e) => antallEndret(e, id);

  bunnElement.appendChild(prisElement);
  bunnElement.appendChild(antallInput);

  artikkelContainer.appendChild(navnElement);
  artikkelContainer.appendChild(bunnElement);

  artiklerElement.appendChild(artikkelContainer);
}

function antallEndret(e, id) {
  let artikkel;
  for (var i in artikler) {
    if (artikler[i].id === id) artikkel = artikler[i];
  }

  artikkel.antall = parseInt(e.target.value);
  total.innerText = `Total: ${regnUtTotal()},-`;
}

function regnUtTotal() {
  let total = 0;
  artikler.forEach((artikkel) => {
    total += artikkel.pris * artikkel.antall;
  });
  return total;
}

function nyKundeTrykket() {
  leggTilKunde();
  genererKunder();
  nullstillInputs();
  //printKunder();
}

function nullstillInputs() {
  artiklerElement.innerHTML = "";
  artikler.forEach((artikkel) => {
    artikkel.antall = 0;
    nyArtikkelElement(artikkel);
  });
  
  total.innerText = "Total: 0,-"
}

function printKunder() {
  console.log("........KUNDER........");
  kunder.forEach((kunde) => {
    console.log(`Kunde ${kunde.id}:`);
    kunde.produkter.forEach((produkt) => {
      console.log(artikler[produkt.id]);
      //onsole.log(`${artikler[produkt.id].navn}, ${artikler[produkt.id].pris}`);
    });
  });
}

function leggTilKunde() {
  let produkter = [];

  artikler.forEach((artikkel) => {
    if (artikkel.antall) {
      produkter.push({
        id: artikkel.id,
        antall: artikkel.antall,
      });
    }
  });

  const nyKunde = {
    id: kunder.length + 1,
    produkter,
  };

  kunder.push(nyKunde);
}

function visKunderTrykket() {
  if (kunderÅpen) {
    kunderElement.style.visibility = "hidden";
    visKunderKnapp.textContent = "Vis kunder";
    kunderÅpen = false;
  } else {
    kunderElement.style.visibility = "visible";
    visKunderKnapp.textContent = "Skjul kunder";
    kunderÅpen = true;
    genererKunder();
  }
}

function genererKunder() {
  kunderElement.innerHTML = "";

  const kunderTittel = document.createElement("h2");
  kunderTittel.innerText = "Kunder:";

  kunderElement.appendChild(kunderTittel);

  let sumAlleKunder = 0;

  kunder.forEach((kunde) => {
    const kundeDiv = document.createElement("div");
    kundeDiv.classList.add("kunde");

    const kundeIdTekst = document.createElement("h4");
    kundeIdTekst.innerText = `KundeID: ${kunde.id}`;

    kundeDiv.appendChild(kundeIdTekst);

    let kundeTotal = 0;

    kunde.produkter.forEach((kjøptProdukt) => {
      let artikkel;
      artikler.forEach((artikkelProdukt) => {
        if (artikkelProdukt.id === kjøptProdukt.id) artikkel = artikkelProdukt;
      });

      kundeTotal += artikkel.pris * kjøptProdukt.antall;

      const produktDiv = document.createElement("div");
      produktDiv.classList.add("produkt");

      const produktNavnTekst = document.createElement("h5");
      produktNavnTekst.innerText = artikkel.navn;

      const produktPrisTekst = document.createElement("h5");
      produktPrisTekst.innerText = `kr ${artikkel.pris},-`;

      const produktAntallTekst = document.createElement("h5");
      produktAntallTekst.innerText = `${kjøptProdukt.antall}stk`;

      produktDiv.appendChild(produktNavnTekst);
      produktDiv.appendChild(produktPrisTekst);
      produktDiv.appendChild(produktAntallTekst);

      kundeDiv.appendChild(produktDiv);
    });

    sumAlleKunder += kundeTotal;

    const kundeTotalTekst = document.createElement("h4");
    kundeTotalTekst.innerText = `Total: ${kundeTotal},-`;

    console.log(kundeTotal);
    kundeDiv.appendChild(kundeTotalTekst);

    kunderElement.appendChild(kundeDiv);
  });

  const alleKunderSum = document.createElement("h3");
  alleKunderSum.innerText = `SUM: ${sumAlleKunder}`;

  kunderElement.appendChild(alleKunderSum);
}
