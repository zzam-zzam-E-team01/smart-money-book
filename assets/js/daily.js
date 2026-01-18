/**
 * daily.js
 * 일일 화면 기능 구현
 */

// 가계부 데이터 관리 함수
function getAccountData() {
	const storedData = localStorage.getItem('accountData');
	if (storedData) {
		return JSON.parse(storedData);
	} else {
		// 기본 샘플 데이터
		const defaultData = [
			{ id: 1, date: '2024-12-18', type: '지출', category: '식비', amount: 24700, description: '점심', time: '12:05', bank: '우리은행' },
			{ id: 2, date: '2024-12-17', type: '지출', category: '식비', amount: 8500, description: '점심', time: '12:05', bank: '우리은행' },
			{ id: 3, date: '2024-12-16', type: '지출', category: '식비', amount: 2000, description: '커피', time: '11:11', bank: '우리은행' },
			{ id: 4, date: '2024-12-15', type: '지출', category: '식비', amount: 7500, description: '식비', time: '11:42', bank: '우리은행' },
			{ id: 5, date: '2024-12-12', type: '지출', category: '식비', amount: 14600, description: '술', time: '12:40', bank: '우리은행' },
			{ id: 6, date: '2024-12-12', type: '지출', category: '문화생활', amount: 10000, description: '피시방', time: '12:40', bank: '우리은행' },
			{ id: 7, date: '2024-12-11', type: '지출', category: '식비', amount: 17000, description: '실크로드', time: '06:57', bank: '우리은행' },
			{ id: 8, date: '2024-12-11', type: '지출', category: '식비', amount: 9000, description: '점심', time: '12:00', bank: '우리은행' },
			{ id: 9, date: '2024-12-10', type: '지출', category: '쇼핑', amount: 150000, description: '겨울옷 구매', time: '14:30', bank: '우리은행' },
			{ id: 10, date: '2024-12-08', type: '지출', category: '교통비', amount: 55000, description: '교통카드 충전', time: '09:15', bank: '우리은행' },
			{ id: 11, date: '2024-12-05', type: '지출', category: '식비', amount: 45000, description: '마트 장보기', time: '18:20', bank: '우리은행' },
			{ id: 12, date: '2024-12-01', type: '수입', category: '급여', amount: 3500000, description: '12월 급여', time: '09:00', bank: '우리은행' }
		];
		localStorage.setItem('accountData', JSON.stringify(defaultData));
		return defaultData;
	}
}

// 일일 화면 객체
const Daily = {
	currentDate: new Date(),
	accountData: [],

	/**
	 * 초기화
	 */
	init: function() {
		this.currentDate = new Date();
		this.accountData = getAccountData(); // localStorage에서 데이터 불러오기
		this.setupEventListeners();
		this.renderMonthSelector();
		this.renderSummary();
		this.renderTransactions();
	},

	/**
	 * 이벤트 리스너 설정
	 */
	setupEventListeners: function() {
		const prevBtn = document.getElementById('dailyMonthPrev');
		const nextBtn = document.getElementById('dailyMonthNext');
		const fabBtn = document.getElementById('dailyFab');

		if (prevBtn) {
			prevBtn.addEventListener('click', () => this.navigateMonth(-1));
		}
		if (nextBtn) {
			nextBtn.addEventListener('click', () => this.navigateMonth(1));
		}
		if (fabBtn) {
			fabBtn.addEventListener('click', () => {
				window.location.href = 'account/form.html';
			});
		}
	},

	/**
	 * 월 이동
	 */
	navigateMonth: function(direction) {
		this.currentDate.setMonth(this.currentDate.getMonth() + direction);
		this.renderMonthSelector();
		this.renderSummary();
		this.renderTransactions();
	},

	/**
	 * 월 선택기 렌더링
	 */
	renderMonthSelector: function() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth() + 1;
		const monthText = `${year}년 ${month}월`;

		const monthTextElement = document.getElementById('dailyMonthText');
		if (monthTextElement) {
			monthTextElement.textContent = monthText;
		}
	},

	/**
	 * 요약 정보 렌더링
	 */
	renderSummary: function() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth() + 1;
		const monthStr = `${year}-${String(month).padStart(2, '0')}`;

		// 해당 월의 데이터 필터링
		const monthData = this.accountData.filter(item => {
			const itemDate = new Date(item.date);
			return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
		});

		// 수입/지출 계산
		const totalIncome = monthData
			.filter(item => item.type === '수입')
			.reduce((sum, item) => sum + item.amount, 0);
		const totalExpense = monthData
			.filter(item => item.type === '지출')
			.reduce((sum, item) => sum + item.amount, 0);
		const total = totalIncome - totalExpense;

		// 요약 정보 업데이트
		const incomeElement = document.getElementById('dailySummaryIncome');
		const expenseElement = document.getElementById('dailySummaryExpense');
		const totalElement = document.getElementById('dailySummaryTotal');

		if (incomeElement) {
			incomeElement.textContent = this.formatAmount(totalIncome);
		}
		if (expenseElement) {
			expenseElement.textContent = this.formatAmount(totalExpense);
		}
		if (totalElement) {
			totalElement.textContent = `${total >= 0 ? '+' : ''}${this.formatAmount(total)}`;
			totalElement.className = 'daily-summary-value total';
			if (total < 0) {
				totalElement.style.color = '#ff3b30';
			} else if (total > 0) {
				totalElement.style.color = '#007aff';
			}
		}
	},

	/**
	 * 거래 내역 렌더링
	 */
	renderTransactions: function() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth() + 1;
		const monthStr = `${year}-${String(month).padStart(2, '0')}`;

		// 해당 월의 데이터 필터링
		const monthData = this.accountData.filter(item => {
			const itemDate = new Date(item.date);
			return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
		});

		// 날짜별로 그룹화
		const groupedByDate = {};
		monthData.forEach(item => {
			const date = item.date;
			if (!groupedByDate[date]) {
				groupedByDate[date] = [];
			}
			groupedByDate[date].push(item);
		});

		// 날짜별로 정렬 (최신순)
		const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
			return new Date(b) - new Date(a);
		});

		// 거래 리스트 컨테이너
		const transactionsContainer = document.getElementById('dailyTransactions');
		if (!transactionsContainer) return;

		transactionsContainer.innerHTML = '';

		if (sortedDates.length === 0) {
			transactionsContainer.innerHTML = `
				<div class="daily-empty">
					<div class="daily-empty-icon">📝</div>
					<div class="daily-empty-text">등록된 내역이 없습니다.</div>
				</div>
			`;
			return;
		}

		// 날짜별로 렌더링
		sortedDates.forEach(date => {
			const dateGroup = this.createDateGroup(date, groupedByDate[date]);
			transactionsContainer.appendChild(dateGroup);
		});
	},

	/**
	 * 날짜 그룹 생성
	 */
	createDateGroup: function(dateStr, items) {
		const date = new Date(dateStr);
		const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
		const day = date.getDate();

		// 날짜별 수입/지출 계산
		const dayIncome = items
			.filter(item => item.type === '수입')
			.reduce((sum, item) => sum + item.amount, 0);
		const dayExpense = items
			.filter(item => item.type === '지출')
			.reduce((sum, item) => sum + item.amount, 0);

		// 날짜 그룹 컨테이너
		const dateGroupDiv = document.createElement('div');
		dateGroupDiv.className = 'daily-date-group';

		// 날짜 헤더
		const dateHeaderDiv = document.createElement('div');
		dateHeaderDiv.className = 'daily-date-header';
		dateHeaderDiv.innerHTML = `
			<div class="daily-date-info">
				<span class="daily-date-number">${day}</span>
				<span class="daily-date-day">${dayOfWeek}요일</span>
			</div>
			<div class="daily-date-summary">
				${dayIncome > 0 ? `<span class="income">${this.formatAmount(dayIncome)}원</span>` : ''}
				${dayExpense > 0 ? `<span class="expense">${this.formatAmount(dayExpense)}원</span>` : ''}
				${dayIncome === 0 && dayExpense === 0 ? '<span>0원</span>' : ''}
			</div>
		`;
		dateGroupDiv.appendChild(dateHeaderDiv);

		// 거래 항목들 (시간순 정렬)
		const sortedItems = [...items].sort((a, b) => {
			const timeA = a.time || '00:00';
			const timeB = b.time || '00:00';
			return timeB.localeCompare(timeA); // 최신순
		});

		sortedItems.forEach(item => {
			const transactionItem = this.createTransactionItem(item);
			dateGroupDiv.appendChild(transactionItem);
		});

		return dateGroupDiv;
	},

	/**
	 * 거래 항목 생성
	 */
	createTransactionItem: function(item) {
		const itemDiv = document.createElement('div');
		const itemType = item.type === '수입' ? 'income' : 'expense';
		itemDiv.className = `daily-transaction-item ${itemType}-item`;
		itemDiv.addEventListener('click', () => {
			window.location.href = `account/edit.html?id=${item.id}`;
		});

		const infoDiv = document.createElement('div');
		infoDiv.className = 'daily-transaction-info';

		// 카테고리
		const categoryDiv = document.createElement('div');
		categoryDiv.className = 'daily-transaction-category';
		const badgeClass = item.type === '수입' ? 'income' : 'expense';
		categoryDiv.innerHTML = `
			<span class="daily-transaction-category-badge ${badgeClass}">${item.type}</span>
			<span>${item.category}</span>
		`;
		infoDiv.appendChild(categoryDiv);

		// 설명
		if (item.description) {
			const descDiv = document.createElement('div');
			descDiv.className = 'daily-transaction-desc';
			descDiv.textContent = item.description;
			infoDiv.appendChild(descDiv);
		}

		// 시간 및 은행
		const timeDiv = document.createElement('div');
		timeDiv.className = 'daily-transaction-time';
		const timeText = item.time ? `${this.formatTime(item.time)} ${item.bank || ''}`.trim() : '';
		timeDiv.textContent = timeText;
		infoDiv.appendChild(timeDiv);

		// 금액
		const amountDiv = document.createElement('div');
		amountDiv.className = `daily-transaction-amount ${item.type === '수입' ? 'income' : 'expense'}`;
		amountDiv.textContent = `${item.type === '수입' ? '+' : '-'}${this.formatAmount(item.amount)}원`;

		itemDiv.appendChild(infoDiv);
		itemDiv.appendChild(amountDiv);

		return itemDiv;
	},

	/**
	 * 시간 포맷 (HH:mm -> 오전/오후 HH:mm)
	 */
	formatTime: function(timeStr) {
		const [hours, minutes] = timeStr.split(':');
		const hour = parseInt(hours);
		const ampm = hour >= 12 ? '오후' : '오전';
		const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
		return `${ampm} ${String(displayHour).padStart(2, '0')}:${minutes}`;
	},

	/**
	 * 금액을 천단위 콤마 형식으로 포맷
	 */
	formatAmount: function(amount) {
		return amount.toLocaleString();
	}
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
	Daily.init();
});

// 전역으로 사용 가능하도록 설정
window.Daily = Daily;

