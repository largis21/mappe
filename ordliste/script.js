const inputElement = document.getElementById("input-ord");
const inputSpråkElement = document.getElementById("input-språk");
const outputSpråkElemet = document.getElementById("output-språk");
const oversettKnapp = document.getElementById("oversett-knapp");
const visOrdlisteKnapp = document.getElementById("vis-ordliste-knapp");
const errorTekst = document.getElementById("error-tekst");
const resultatTekst = document.getElementById("resultat-tekst");
const ordlisteTekst = document.getElementById("ordliste");
const ordlisteTable = document.getElementById("ordliste-tabell");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

const ordliste = await hentOrdliste();
genererOrdlisteTabell();
let ordlisteÅpen = false;

oversettKnapp.onclick = () => {
  setError("");
  setResultat("");
  if (!inputElement.value) {
    setError("Vennligst skriv inn et ord fra ordlisten");
    return;
  }

  const ord = inputElement.value;
  const inputSpråk = inputSpråkElement.value;
  const outputSpråk = outputSpråkElemet.value;

  const overesettelse = oversett(ord, inputSpråk);
  if (!overesettelse) {
    setError(`Fant ikke ${ord} i ordlisten :(`);
    return;
  }

  const resultat = overesettelse[outputSpråk];

  setResultat(`${ord} på ${outputSpråk} er: ${resultat}`);
};

visOrdlisteKnapp.onclick = () => {
  if (ordlisteÅpen) {
    ordlisteTable.style.visibility = "hidden";
    visOrdlisteKnapp.innerText = "Vis ordliste";
    ordlisteÅpen = false;
  } else {
    ordlisteTable.style.visibility = "visible";
    visOrdlisteKnapp.innerText = "Skjul ordliste";
    ordlisteÅpen = true;
  }
};

function genererOrdlisteTabell() {
  ordlisteTable.style.visibility = "hidden";

  const ordlisteSpråk = ["Norsk", "Engelsk"];

  const theadRow = document.createElement("tr");
  ordlisteSpråk.forEach((språk) => {
    const th = document.createElement("th");
    th.innerHTML = språk;
    theadRow.appendChild(th);
  });
  thead.appendChild(theadRow);

  ordliste.forEach((ord) => {
    const tr = document.createElement("tr");

    Object.keys(ord).map((språk) => {
      const td = document.createElement("td");
      td.innerText = ord[språk];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

async function hentOrdliste() {
  const ordlisteURL = window.location + "/ordliste.json";
  const response = await fetch(ordlisteURL);

  if (!response.ok) throw "Kunne ikke hente ordliste";

  const data = await response.json();
  return data;
}

function setError(errorBeskjed) {
  errorTekst.innerText = errorBeskjed;
}

function setResultat(resultat) {
  resultatTekst.innerText = resultat;
}

function oversett(ord, fraSpråk) {
  for (let i of ordliste) {
    if (i[fraSpråk] === ord.toLowerCase()) {
      return i;
    }
  }
}
