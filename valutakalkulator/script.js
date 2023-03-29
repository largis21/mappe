const nokInput = document.getElementById("inputKR");

const euroRateInput = document.getElementById("euro_kurs");
const usdRateInput = document.getElementById("usd_kurs");
const poundRateInput = document.getElementById("pund_kurs");

const euroOutput = document.getElementById("euro_output");
const usdOutput = document.getElementById("usd_output");
const poundOutput = document.getElementById("pund_output");

async function getExchangeRate() {
  const response = await fetch("https://open.er-api.com/v6/latest/nok");
  if (!response.ok) throw "Could not fetch data";

  const data = await response.json();
  const rates = data.rates;

  euroRateInput.value = rates.EUR;
  usdRateInput.value = rates.USD;
  poundRateInput.value = rates.GBP;
}

getExchangeRate()

function convertCurrency() {
  console.log(euroOutput);
  euroOutput.innerHTML = `<b>EUR:</b> ${nokInput.value * euroRateInput.value}`;
  usdOutput.innerHTML = `<b>USD:</b> ${nokInput.value * usdRateInput.value}`;
  poundOutput.innerHTML = `<b>GBP</b>: ${
    nokInput.value * poundRateInput.value
  }`;
}
