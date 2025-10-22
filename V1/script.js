function calculateProfit() {
      const amountKes = parseFloat(document.getElementById('amountKes').value);
      const priceBuy = parseFloat(document.getElementById('priceBuy').value);
      const priceSell = parseFloat(document.getElementById('priceSell').value);
      const rate = parseFloat(document.getElementById('rate').value);

      if (isNaN(amountKes) || isNaN(priceBuy) || isNaN(priceSell) || isNaN(rate)) {
        document.getElementById('result').innerHTML = "<p class='text-red-400'>⚠️ Please fill in all fields correctly.</p>";
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