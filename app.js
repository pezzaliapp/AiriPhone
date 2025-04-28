document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split('\n');
    const table = document.getElementById('dataTable');
    table.innerHTML = '';

    const chartLabels = [];
    const tempData = [];
    const humData = [];

    lines.forEach((line, index) => {
      if (line.trim() === '') return;
      const cols = line.split(',');

      const row = table.insertRow();
      cols.forEach(col => {
        const cell = row.insertCell();
        cell.textContent = col.trim();
      });

      if (index > 0 && cols.length >= 5) {
        chartLabels.push(cols[0]); // Secondi
        tempData.push(parseFloat(cols[1])); // Temperatura
        humData.push(parseFloat(cols[2])); // Umidità
      }
    });

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: tempData,
            borderColor: 'red',
            fill: false
          },
          {
            label: 'Umidità (%)',
            data: humData,
            borderColor: 'blue',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Secondi'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Valore'
            }
          }
        }
      }
    });
  };
  reader.readAsText(file);
});
