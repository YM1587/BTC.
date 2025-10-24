// --- Bitcoin Profit Calculator Script ---

// Fetch Live Bitcoin Price from CoinGecko API
async function fetchBTCPrice() {
  const fetchBtn = document.getElementById('fetchBtn');
  const priceSellInput = document.getElementById('priceSell');

  try {
    fetchBtn.textContent = 'Fetching...';
    fetchBtn.disabled = true;

    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    const btcPrice = data.bitcoin.usd;

    priceSellInput.value = btcPrice.toFixed(2);
    fetchBtn.textContent = 'Live Price Updated ';
    setTimeout(() => {
      fetchBtn.textContent = 'Fetch Live BTC Price';
      fetchBtn.disabled = false;
    }, 3000);
  } catch (error) {
    priceSellInput.placeholder = "Failed to fetch price. Try again.";
    fetchBtn.textContent = 'Fetch Live BTC Price';
    fetchBtn.disabled = false;
  }
}

// Calculate Profit and Display Results
function calculateProfit() {
  const amountKes = parseFloat(document.getElementById('amountKes').value);
  const priceBuy = parseFloat(document.getElementById('priceBuy').value);
  const priceSell = parseFloat(document.getElementById('priceSell').value);
  const rate = parseFloat(document.getElementById('rate').value);

  if (isNaN(amountKes) || isNaN(priceBuy) || isNaN(priceSell) || isNaN(rate)) {
    document.getElementById('result').innerHTML = "<p class='text-red-400'> Please fill in all fields correctly.</p>";
    return;
  }

  const amountUsd = amountKes / rate;
  const btcBought = amountUsd / priceBuy;
  const valueUsd = btcBought * priceSell;
  const valueKes = valueUsd * rate;
  const profitKes = valueKes - amountKes;
  const profitPercent = (profitKes / amountKes) * 100;

  document.getElementById('result').innerHTML = `
    <p>Initial Investment: <span class="text-yellow-400">${amountKes.toLocaleString()} KES</span></p>
    <p>New Value: <span class="text-green-400">${valueKes.toLocaleString(undefined, {maximumFractionDigits: 2})} KES</span></p>
    <p>Profit: <span class="text-green-300">${profitKes.toLocaleString(undefined, {maximumFractionDigits: 2})} KES</span> 
    (${profitPercent.toFixed(2)}%)</p>
  `;
}

// Event Listeners
document.getElementById('fetchBtn').addEventListener('click', fetchBTCPrice);
document.getElementById('calculateBtn').addEventListener('click', calculateProfit);

// Auto-fetch price on page load
window.addEventListener('load', fetchBTCPrice);
