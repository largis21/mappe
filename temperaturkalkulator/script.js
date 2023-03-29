const inputElement = document.getElementById("input-tall");
const inputEnhet = document.getElementById("input-enhet");
const outputEnhet = document.getElementById("output-enhet");
const regnOmKnapp = document.getElementById("regn-om-knapp");
const errorTekst = document.getElementById("error-tekst");
const resultatTekst = document.getElementById("resultat-tekst");

regnOmKnapp.onclick = knappTrykket;

function knappTrykket() {
  setError("");
  if (!inputElement.value) {
    setError("Vennligst skriv inn et tall");
    return;
  }

  const input = parseFloat(inputElement.value);
  const enhet = inputEnhet.value;

  const resultat = regnOm(enhet, input);
  setResultat(
    `${input} ${enhet} er det samme som: \n 
    ${Object.keys(resultat)
      .map((temperatur) => `${resultat[temperatur].toFixed(2)} ${temperatur}`)
      .join("\n")}`
  );
}

function setError(errorBeskjed) {
  errorTekst.innerText = errorBeskjed;
}

function setResultat(resultat) {
  resultatTekst.innerText = resultat;
}

function regnOm(fraEnhet, verdi) {
  let celcius;
  let fahrenheit;
  let kelvin;

  switch (fraEnhet) {
    case "celcius":
      fahrenheit = verdi * (9 / 5) + 32;
      kelvin = verdi + 273.15;
      return { fahrenheit, kelvin };
    case "fahrenheit":
      celcius = (verdi - 32) * (5 / 9);
      kelvin = (verdi + 459.67) * (5 / 9);
      return { celcius, kelvin };
    case "kelvin":
      celcius = verdi - 273.15;
      fahrenheit = 1.8 * (verdi - 273.15) + 32;
      return { celcius, fahrenheit };
  }
}
