/**
 * stats.js
 * stats.html 페이지 전용 스크립트 (Chart.js 초기화)
 */

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
	initExpenseChart();
	initMonthlyChart();
});

/**
 * 카테고리별 지출 도넛 차트 초기화
 */
function initExpenseChart() {
	const expenseCtx = document.getElementById('expenseChart').getContext('2d');
	new Chart(expenseCtx, {
		type: 'doughnut',
		data: {
			labels: ['식비', '교통비', '쇼핑', '문화생활', '기타'],
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
 * 월별 추이 막대 차트 초기화
 */
function initMonthlyChart() {
	const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
	new Chart(monthlyCtx, {
		type: 'bar',
		data: {
			labels: ['2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'],
			datasets: [{
				label: '수입',
				data: [3200000, 3300000, 3500000, 3400000, 3600000, 3500000],
				backgroundColor: 'rgba(17, 153, 142, 0.7)',
				borderColor: '#11998e',
				borderWidth: 1
			}, {
				label: '지출',
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
							return value.toLocaleString() + '원';
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
							return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + '원';
						}
					}
				}
			}
		}
	});
}

/**
 * 통계 데이터 로드
 */
function loadStats() {
	const month = document.getElementById('monthSelector').value;
	alert(month + ' 통계를 불러옵니다.');
	// 실제로는 서버에서 해당 월의 통계 데이터를 가져와야 함
	// API 호출 예시:
	// fetch(`/account/stats?month=${month}`)
	//   .then(res => res.json())
	//   .then(data => {
	//     updateCharts(data);
	//   });
}

