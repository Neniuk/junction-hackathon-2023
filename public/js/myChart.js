import Chart from 'chart.js/auto';

new Chart(
	document.getElementById('myChart'),
		{
		  type: 'line',
		  data: {
			labels: data.map(entry => entry.timeData), 
			datasets: [
			  {
				label: 'Material Price Data',
				data: data.map(entry => entry.priceData),
				fill: false,
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(75, 192, 192, 1)',
				pointRadius: 5,
				pointHoverRadius: 8,
			  }
			]
		  },
		  options: {
			scales: {
			  x: {
				type: 'linear',
				position: 'bottom',
				title: {
				  display: true,
				  text: 'Time'
				}
			  },
			  y: {
				type: 'linear',
				title: {
				  display: true,
				  text: 'Price'
				}
			  }
			}
		  }
		}
	  );
	  