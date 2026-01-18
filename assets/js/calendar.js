/**
 * calendar.js
 * 달력 화면 기능 구현
 */

// 가계부 데이터 관리 함수 (daily.js와 동일)
function getAccountDataForCalendar() {
	const storedData = localStorage.getItem('accountData');
	if (storedData) {
		return JSON.parse(storedData);
	} else {
		// 기본 샘플 데이터
		const defaultData = [
			{ id: 1, date: '2024-12-01', type: '수입', category: '급여', amount: 3500000, description: '12월 급여', time: '09:00', bank: '우리은행' },
			{ id: 2, date: '2024-12-05', type: '지출', category: '식비', amount: 45000, description: '마트 장보기', time: '18:20', bank: '우리은행' },
			{ id: 3, date: '2024-12-08', type: '지출', category: '교통비', amount: 55000, description: '교통카드 충전', time: '09:15', bank: '우리은행' },
			{ id: 4, date: '2024-12-10', type: '지출', category: '쇼핑', amount: 150000, description: '겨울옷 구매', time: '14:30', bank: '우리은행' },
			{ id: 5, date: '2024-12-15', type: '지출', category: '식비', amount: 35000, description: '점심 식사', time: '12:00', bank: '우리은행' },
			{ id: 6, date: '2024-12-18', type: '수입', category: '부수입', amount: 200000, description: '용돈', time: '10:00', bank: '우리은행' },
			{ id: 7, date: '2024-12-20', type: '지출', category: '교통비', amount: 30000, description: '택시비', time: '20:00', bank: '우리은행' },
			{ id: 8, date: '2024-12-22', type: '지출', category: '식비', amount: 80000, description: '저녁 식사', time: '19:00', bank: '우리은행' },
			{ id: 9, date: '2024-12-25', type: '지출', category: '쇼핑', amount: 250000, description: '크리스마스 선물', time: '15:00', bank: '우리은행' },
			{ id: 10, date: '2024-12-28', type: '지출', category: '식비', amount: 120000, description: '연말 회식', time: '18:00', bank: '우리은행' }
		];
		localStorage.setItem('accountData', JSON.stringify(defaultData));
		return defaultData;
	}
}

// 달력 객체
const Calendar = {
	currentDate: new Date(),
	selectedDate: null,
	accountData: [],

	/**
	 * 달력 초기화
	 */
	init: function() {
		this.currentDate = new Date();
		this.accountData = getAccountDataForCalendar(); // localStorage에서 데이터 불러오기
		this.renderCalendar();
		this.setupEventListeners();
	},

	/**
	 * 이벤트 리스너 설정
	 */
	setupEventListeners: function() {
		const prevBtn = document.getElementById('calendarPrev');
		const nextBtn = document.getElementById('calendarNext');
		const todayBtn = document.getElementById('calendarToday');
		const closeBtn = document.getElementById('closeDetailsBtn');

		if (prevBtn) {
			prevBtn.addEventListener('click', () => this.navigateMonth(-1));
		}
		if (nextBtn) {
			nextBtn.addEventListener('click', () => this.navigateMonth(1));
		}
		if (todayBtn) {
			todayBtn.addEventListener('click', () => this.goToToday());
		}
		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				const detailsContainer = document.getElementById('selectedDateDetails');
				if (detailsContainer) {
					detailsContainer.style.display = 'none';
				}
			});
		}
	},

	/**
	 * 월 이동
	 */
	navigateMonth: function(direction) {
		this.currentDate.setMonth(this.currentDate.getMonth() + direction);
		this.renderCalendar();
	},

	/**
	 * 오늘로 이동
	 */
	goToToday: function() {
		this.currentDate = new Date();
		this.renderCalendar();
	},

	/**
	 * 달력 렌더링
	 */
	renderCalendar: function() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth();

		// 달력 제목 업데이트
		const titleElement = document.getElementById('calendarTitle');
		if (titleElement) {
			titleElement.textContent = `${year}년 ${month + 1}월`;
		}

		// 월별 요약 업데이트
		this.updateMonthSummary(year, month);

		// 달력 날짜 그리드 렌더링
		const daysContainer = document.getElementById('calendarDays');
		if (!daysContainer) return;

		daysContainer.innerHTML = '';

		// 첫 번째 날짜와 마지막 날짜 계산
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const firstDayOfWeek = firstDay.getDay(); // 0(일요일) ~ 6(토요일)
		const daysInMonth = lastDay.getDate();

		// 이전 달의 마지막 날짜들
		const prevMonth = new Date(year, month, 0);
		const daysInPrevMonth = prevMonth.getDate();

		// 이전 달 날짜들 추가
		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			const day = daysInPrevMonth - i;
			const dateStr = this.formatDate(new Date(year, month - 1, day));
			const dayElement = this.createDayElement(day, dateStr, true);
			daysContainer.appendChild(dayElement);
		}

		// 현재 달 날짜들 추가
		const today = new Date();
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			const dateStr = this.formatDate(date);
			const isToday = date.toDateString() === today.toDateString();
			const dayElement = this.createDayElement(day, dateStr, false, isToday);
			daysContainer.appendChild(dayElement);
		}

		// 다음 달 날짜들 추가 (달력을 채우기 위해)
		const totalCells = daysContainer.children.length;
		const remainingCells = 42 - totalCells; // 6주 * 7일 = 42
		for (let day = 1; day <= remainingCells; day++) {
			const dateStr = this.formatDate(new Date(year, month + 1, day));
			const dayElement = this.createDayElement(day, dateStr, true);
			daysContainer.appendChild(dayElement);
		}
	},

	/**
	 * 날짜 요소 생성
	 */
	createDayElement: function(dayNumber, dateStr, isOtherMonth, isToday = false) {
		const dayDiv = document.createElement('div');
		dayDiv.className = 'calendar-day';
		if (isOtherMonth) {
			dayDiv.classList.add('other-month');
		}
		if (isToday) {
			dayDiv.classList.add('today');
		}

		// 날짜 번호
		const dayNumberDiv = document.createElement('div');
		dayNumberDiv.className = 'calendar-day-number';
		dayNumberDiv.textContent = dayNumber;
		dayDiv.appendChild(dayNumberDiv);

		// 해당 날짜의 가계부 내역 가져오기
		const dayData = this.getDayData(dateStr);
		if (dayData && dayData.length > 0) {
			const eventsDiv = document.createElement('div');
			eventsDiv.className = 'calendar-day-events';

			// 수입/지출 금액 계산
			const totalIncome = dayData
				.filter(item => item.type === '수입')
				.reduce((sum, item) => sum + item.amount, 0);
			const totalExpense = dayData
				.filter(item => item.type === '지출')
				.reduce((sum, item) => sum + item.amount, 0);

			// 금액 표시
			if (totalIncome > 0 && totalExpense > 0) {
				// 수입과 지출 모두 있는 경우
				const incomeAmount = document.createElement('div');
				incomeAmount.className = 'calendar-day-amount mixed-income';
				incomeAmount.textContent = this.formatAmountShort(totalIncome);
				eventsDiv.appendChild(incomeAmount);
				
				const expenseAmount = document.createElement('div');
				expenseAmount.className = 'calendar-day-amount mixed-expense';
				expenseAmount.textContent = this.formatAmountShort(totalExpense);
				eventsDiv.appendChild(expenseAmount);
			} else if (totalIncome > 0) {
				// 수입만 있는 경우
				const incomeAmount = document.createElement('div');
				incomeAmount.className = 'calendar-day-amount income';
				incomeAmount.textContent = this.formatAmountShort(totalIncome);
				eventsDiv.appendChild(incomeAmount);
			} else if (totalExpense > 0) {
				// 지출만 있는 경우
				const expenseAmount = document.createElement('div');
				expenseAmount.className = 'calendar-day-amount expense';
				expenseAmount.textContent = this.formatAmountShort(totalExpense);
				eventsDiv.appendChild(expenseAmount);
			}

			dayDiv.appendChild(eventsDiv);
		}

		// 클릭 이벤트
		if (!isOtherMonth) {
			dayDiv.addEventListener('click', () => {
				this.selectDate(dateStr);
				this.showDayDetailsBelow(dateStr);
			});
		}

		return dayDiv;
	},

	/**
	 * 특정 날짜의 데이터 가져오기
	 */
	getDayData: function(dateStr) {
		return this.accountData.filter(item => item.date === dateStr);
	},

	/**
	 * 날짜 선택
	 */
	selectDate: function(dateStr) {
		this.selectedDate = dateStr;
		
		// 모든 선택 해제
		document.querySelectorAll('.calendar-day').forEach(day => {
			day.classList.remove('selected');
		});

		// 선택된 날짜 표시
		document.querySelectorAll('.calendar-day').forEach(day => {
			const dayNumber = day.querySelector('.calendar-day-number');
			if (dayNumber) {
				const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), parseInt(dayNumber.textContent));
				if (this.formatDate(date) === dateStr) {
					day.classList.add('selected');
				}
			}
		});
	},

	/**
	 * 월별 요약 업데이트
	 */
	updateMonthSummary: function(year, month) {
		const monthData = this.accountData.filter(item => {
			const itemDate = new Date(item.date);
			return itemDate.getFullYear() === year && itemDate.getMonth() === month;
		});

		const totalIncome = monthData
			.filter(item => item.type === '수입')
			.reduce((sum, item) => sum + item.amount, 0);
		const totalExpense = monthData
			.filter(item => item.type === '지출')
			.reduce((sum, item) => sum + item.amount, 0);

		const incomeElement = document.getElementById('calendarMonthIncome');
		const expenseElement = document.getElementById('calendarMonthExpense');

		if (incomeElement) {
			incomeElement.textContent = this.formatAmount(totalIncome);
		}
		if (expenseElement) {
			expenseElement.textContent = this.formatAmount(totalExpense);
		}
	},

	/**
	 * 날짜별 상세 내역을 아래에 표시
	 */
	showDayDetailsBelow: function(dateStr) {
		const dayData = this.getDayData(dateStr);
		const date = new Date(dateStr);
		const dateFormatted = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

		// 제목 업데이트
		const titleElement = document.getElementById('selectedDateTitle');
		if (titleElement) {
			titleElement.textContent = dateFormatted;
		}

		// 내역 리스트 렌더링
		const detailsList = document.getElementById('selectedDateList');
		const detailsContainer = document.getElementById('selectedDateDetails');
		
		if (!detailsList || !detailsContainer) return;

		detailsList.innerHTML = '';

		if (dayData.length === 0) {
			detailsList.innerHTML = '<div class="text-center text-muted py-4">등록된 내역이 없습니다.</div>';
		} else {
			dayData.forEach(item => {
				const itemDiv = document.createElement('div');
				itemDiv.className = 'selected-date-item';

				const infoDiv = document.createElement('div');
				infoDiv.className = 'selected-date-item-info';

				// 아이콘
				const iconDiv = document.createElement('div');
				iconDiv.className = `selected-date-item-icon ${item.type === '수입' ? 'income' : 'expense'}`;
				iconDiv.innerHTML = item.type === '수입' ? '💰' : '💸';
				infoDiv.appendChild(iconDiv);

				// 상세 정보
				const detailsDiv = document.createElement('div');
				detailsDiv.className = 'selected-date-item-details';

				const categoryDiv = document.createElement('div');
				categoryDiv.className = 'selected-date-item-category';
				categoryDiv.textContent = item.category;
				detailsDiv.appendChild(categoryDiv);

				if (item.description) {
					const descDiv = document.createElement('div');
					descDiv.style.fontSize = '0.85rem';
					descDiv.style.color = '#86868b';
					descDiv.textContent = item.description;
					detailsDiv.appendChild(descDiv);
				}

				infoDiv.appendChild(detailsDiv);

				// 금액
				const amountDiv = document.createElement('div');
				amountDiv.className = `selected-date-item-amount ${item.type === '수입' ? 'income' : 'expense'}`;
				amountDiv.textContent = `${item.type === '수입' ? '+' : '-'}${this.formatAmount(item.amount)}원`;

				itemDiv.appendChild(infoDiv);
				itemDiv.appendChild(amountDiv);
				detailsList.appendChild(itemDiv);
			});
		}

		// 상세 내역 표시
		detailsContainer.style.display = 'block';
		detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	},

	/**
	 * 날짜별 상세 내역 표시 (모달용 - 기존 유지)
	 */
	showDayDetails: function(dateStr) {
		const dayData = this.getDayData(dateStr);
		const date = new Date(dateStr);
		const dateFormatted = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

		// 모달 제목 설정
		const modalTitle = document.getElementById('dayDetailsModalLabel');
		if (modalTitle) {
			modalTitle.textContent = dateFormatted;
		}

		// 내역 리스트 렌더링
		const detailsList = document.getElementById('dayDetailsList');
		if (!detailsList) return;

		detailsList.innerHTML = '';

		if (dayData.length === 0) {
			detailsList.innerHTML = '<div class="text-center text-muted py-4">등록된 내역이 없습니다.</div>';
		} else {
			dayData.forEach(item => {
				const itemDiv = document.createElement('div');
				itemDiv.className = 'day-detail-item';

				const infoDiv = document.createElement('div');
				infoDiv.className = 'day-detail-info';

				const categoryDiv = document.createElement('div');
				categoryDiv.className = 'day-detail-category';
				const badgeColor = item.type === '수입' ? '#34c759' : '#ff3b30';
				categoryDiv.innerHTML = `<span class="badge me-2" style="background-color: ${badgeColor}; color: white;">${item.type}</span>${item.category}`;
				infoDiv.appendChild(categoryDiv);

				if (item.description) {
					const descDiv = document.createElement('div');
					descDiv.className = 'day-detail-desc';
					descDiv.textContent = item.description;
					infoDiv.appendChild(descDiv);
				}

				const dateDiv = document.createElement('div');
				dateDiv.className = 'day-detail-date';
				dateDiv.textContent = item.date;
				infoDiv.appendChild(dateDiv);

				const amountDiv = document.createElement('div');
				amountDiv.className = `day-detail-amount ${item.type === '수입' ? 'income' : 'expense'}`;
				amountDiv.textContent = `${item.type === '수입' ? '+' : '-'}${this.formatAmount(item.amount)}원`;
				itemDiv.appendChild(amountDiv);

				itemDiv.insertBefore(infoDiv, amountDiv);
				detailsList.appendChild(itemDiv);
			});

			// 요약 정보 추가
			const totalIncome = dayData
				.filter(item => item.type === '수입')
				.reduce((sum, item) => sum + item.amount, 0);
			const totalExpense = dayData
				.filter(item => item.type === '지출')
				.reduce((sum, item) => sum + item.amount, 0);
			const balance = totalIncome - totalExpense;

			const summaryDiv = document.createElement('div');
			summaryDiv.className = 'day-details-summary';
			summaryDiv.innerHTML = `
				<div class="day-summary-item">
					<div class="day-summary-label">수입</div>
					<div class="day-summary-value income">+${this.formatAmount(totalIncome)}원</div>
				</div>
				<div class="day-summary-item">
					<div class="day-summary-label">지출</div>
					<div class="day-summary-value expense">-${this.formatAmount(totalExpense)}원</div>
				</div>
				<div class="day-summary-item">
					<div class="day-summary-label">잔액</div>
					<div class="day-summary-value ${balance >= 0 ? 'income' : 'expense'}">${balance >= 0 ? '+' : ''}${this.formatAmount(balance)}원</div>
				</div>
			`;
			detailsList.appendChild(summaryDiv);
		}

		// 모달 표시
		const modal = new bootstrap.Modal(document.getElementById('dayDetailsModal'));
		modal.show();
	},

	/**
	 * 날짜를 YYYY-MM-DD 형식으로 포맷
	 */
	formatDate: function(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	},

	/**
	 * 금액을 천단위 콤마 형식으로 포맷
	 */
	formatAmount: function(amount) {
		return amount.toLocaleString();
	},

	/**
	 * 금액을 짧게 포맷 (달력용)
	 */
	formatAmountShort: function(amount) {
		if (amount >= 1000000) {
			return (amount / 1000000).toFixed(1) + 'M';
		} else if (amount >= 1000) {
			return (amount / 1000).toFixed(0) + 'K';
		}
		return amount.toString();
	}
};

// 페이지 로드 시 달력 초기화
document.addEventListener('DOMContentLoaded', function() {
	Calendar.init();
});

// 전역으로 사용 가능하도록 설정
window.Calendar = Calendar;

