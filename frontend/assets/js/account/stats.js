/**
 * stats.js
 * stats.html ?섏씠吏 ?꾩슜 ?ㅽ겕由쏀듃 (Chart.js 珥덇린??
 */

// DOM 濡쒕뱶 ???ㅽ뻾
document.addEventListener('DOMContentLoaded', function() {
	initExpenseChart();
	initMonthlyChart();
});

/**
 * 移댄뀒怨좊━蹂?吏異??꾨꽋 李⑦듃 珥덇린?? */
function initExpenseChart() {
	const expenseCtx = document.getElementById('expenseChart').getContext('2d');
	new Chart(expenseCtx, {
		type: 'doughnut',
		data: {
			labels: ['?앸퉬', '援먰넻鍮?, '?쇳븨', '臾명솕?앺솢', '湲고?'],
			datasets: [{
				data: [850000, 400000, 600000, 300000, 200000],
				backgroundColor: [
					'#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
				],
				borderWidth: 2,
				borderColor: '#fff'
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: 'bottom'
				}
			}
		}
	});
}

/**
 * ?붾퀎 異붿씠 留됰? 李⑦듃 珥덇린?? */
function initMonthlyChart() {
	const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
	new Chart(monthlyCtx, {
		type: 'bar',
		data: {
			labels: ['2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'],
			datasets: [{
				label: '?섏엯',
				data: [3200000, 3300000, 3500000, 3400000, 3600000, 3500000],
				backgroundColor: 'rgba(17, 153, 142, 0.7)',
				borderColor: '#11998e',
				borderWidth: 1
			}, {
				label: '吏異?,
				data: [2100000, 2300000, 2200000, 2400000, 2250000, 2350000],
				backgroundColor: 'rgba(235, 51, 73, 0.7)',
				borderColor: '#eb3349',
				borderWidth: 1
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						callback: function(value) {
							return value.toLocaleString() + '??;
						}
					}
				}
			},
			plugins: {
				legend: {
					position: 'top'
				},
				tooltip: {
					callbacks: {
						label: function(context) {
							return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + '??;
						}
					}
				}
			}
		}
	});
}

/**
 * ?듦퀎 ?곗씠??濡쒕뱶
 */
function loadStats() {
	const month = document.getElementById('monthSelector').value;
	alert(month + ' ?듦퀎瑜?遺덈윭?듬땲??');
	// ?ㅼ젣濡쒕뒗 ?쒕쾭?먯꽌 ?대떦 ?붿쓽 ?듦퀎 ?곗씠?곕? 媛?몄?????	// API ?몄텧 ?덉떆:
	// fetch(`/account/stats?month=${month}`)
	//   .then(res => res.json())
	//   .then(data => {
	//     updateCharts(data);
	//   });
}

