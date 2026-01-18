/**
 * calendar.js
 * ?щ젰 ?붾㈃ 湲곕뒫 援ы쁽
 */

// 媛怨꾨? ?곗씠??愿由??⑥닔 (daily.js? ?숈씪)
function getAccountDataForCalendar() {
	const storedData = localStorage.getItem('accountData');
	if (storedData) {
		return JSON.parse(storedData);
	} else {
		// 湲곕낯 ?섑뵆 ?곗씠??		const defaultData = [
			{ id: 1, date: '2024-12-01', type: '?섏엯', category: '湲됱뿬', amount: 3500000, description: '12??湲됱뿬', time: '09:00', bank: '?곕━??? },
			{ id: 2, date: '2024-12-05', type: '吏異?, category: '?앸퉬', amount: 45000, description: '留덊듃 ?λ낫湲?, time: '18:20', bank: '?곕━??? },
			{ id: 3, date: '2024-12-08', type: '吏異?, category: '援먰넻鍮?, amount: 55000, description: '援먰넻移대뱶 異⑹쟾', time: '09:15', bank: '?곕━??? },
			{ id: 4, date: '2024-12-10', type: '吏異?, category: '?쇳븨', amount: 150000, description: '寃⑥슱??援щℓ', time: '14:30', bank: '?곕━??? },
			{ id: 5, date: '2024-12-15', type: '吏異?, category: '?앸퉬', amount: 35000, description: '?먯떖 ?앹궗', time: '12:00', bank: '?곕━??? },
			{ id: 6, date: '2024-12-18', type: '?섏엯', category: '遺?섏엯', amount: 200000, description: '?⑸룉', time: '10:00', bank: '?곕━??? },
			{ id: 7, date: '2024-12-20', type: '吏異?, category: '援먰넻鍮?, amount: 30000, description: '?앹떆鍮?, time: '20:00', bank: '?곕━??? },
			{ id: 8, date: '2024-12-22', type: '吏異?, category: '?앸퉬', amount: 80000, description: '????앹궗', time: '19:00', bank: '?곕━??? },
			{ id: 9, date: '2024-12-25', type: '吏異?, category: '?쇳븨', amount: 250000, description: '?щ━?ㅻ쭏???좊Ъ', time: '15:00', bank: '?곕━??? },
			{ id: 10, date: '2024-12-28', type: '吏異?, category: '?앸퉬', amount: 120000, description: '?곕쭚 ?뚯떇', time: '18:00', bank: '?곕━??? }
		];
		localStorage.setItem('accountData', JSON.stringify(defaultData));
		return defaultData;
	}
}

// ?щ젰 媛앹껜
const Calendar = {
	currentDate: new Date(),
	selectedDate: null,
	accountData: [],

	/**
	 * ?щ젰 珥덇린??	 */
	init: function() {
		this.currentDate = new Date();
		this.accountData = getAccountDataForCalendar(); // localStorage?먯꽌 ?곗씠??遺덈윭?ㅺ린
		this.renderCalendar();
		this.setupEventListeners();
	},

	/**
	 * ?대깽??由ъ뒪???ㅼ젙
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
	 * ???대룞
	 */
	navigateMonth: function(direction) {
		this.currentDate.setMonth(this.currentDate.getMonth() + direction);
		this.renderCalendar();
	},

	/**
	 * ?ㅻ뒛濡??대룞
	 */
	goToToday: function() {
		this.currentDate = new Date();
		this.renderCalendar();
	},

	/**
	 * ?щ젰 ?뚮뜑留?	 */
	renderCalendar: function() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth();

		// ?щ젰 ?쒕ぉ ?낅뜲?댄듃
		const titleElement = document.getElementById('calendarTitle');
		if (titleElement) {
			titleElement.textContent = `${year}??${month + 1}??;
		}

		// ?붾퀎 ?붿빟 ?낅뜲?댄듃
		this.updateMonthSummary(year, month);

		// ?щ젰 ?좎쭨 洹몃━???뚮뜑留?		const daysContainer = document.getElementById('calendarDays');
		if (!daysContainer) return;

		daysContainer.innerHTML = '';

		// 泥?踰덉㎏ ?좎쭨? 留덉?留??좎쭨 怨꾩궛
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const firstDayOfWeek = firstDay.getDay(); // 0(?쇱슂?? ~ 6(?좎슂??
		const daysInMonth = lastDay.getDate();

		// ?댁쟾 ?ъ쓽 留덉?留??좎쭨??		const prevMonth = new Date(year, month, 0);
		const daysInPrevMonth = prevMonth.getDate();

		// ?댁쟾 ???좎쭨??異붽?
		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			const day = daysInPrevMonth - i;
			const dateStr = this.formatDate(new Date(year, month - 1, day));
			const dayElement = this.createDayElement(day, dateStr, true);
			daysContainer.appendChild(dayElement);
		}

		// ?꾩옱 ???좎쭨??異붽?
		const today = new Date();
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			const dateStr = this.formatDate(date);
			const isToday = date.toDateString() === today.toDateString();
			const dayElement = this.createDayElement(day, dateStr, false, isToday);
			daysContainer.appendChild(dayElement);
		}

		// ?ㅼ쓬 ???좎쭨??異붽? (?щ젰??梨꾩슦湲??꾪빐)
		const totalCells = daysContainer.children.length;
		const remainingCells = 42 - totalCells; // 6二?* 7??= 42
		for (let day = 1; day <= remainingCells; day++) {
			const dateStr = this.formatDate(new Date(year, month + 1, day));
			const dayElement = this.createDayElement(day, dateStr, true);
			daysContainer.appendChild(dayElement);
		}
	},

	/**
	 * ?좎쭨 ?붿냼 ?앹꽦
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

		// ?좎쭨 踰덊샇
		const dayNumberDiv = document.createElement('div');
		dayNumberDiv.className = 'calendar-day-number';
		dayNumberDiv.textContent = dayNumber;
		dayDiv.appendChild(dayNumberDiv);

		// ?대떦 ?좎쭨??媛怨꾨? ?댁뿭 媛?몄삤湲?		const dayData = this.getDayData(dateStr);
		if (dayData && dayData.length > 0) {
			const eventsDiv = document.createElement('div');
			eventsDiv.className = 'calendar-day-events';

			// ?섏엯/吏異?湲덉븸 怨꾩궛
			const totalIncome = dayData
				.filter(item => item.type === '?섏엯')
				.reduce((sum, item) => sum + item.amount, 0);
			const totalExpense = dayData
				.filter(item => item.type === '吏異?)
				.reduce((sum, item) => sum + item.amount, 0);

			// 湲덉븸 ?쒖떆
			if (totalIncome > 0 && totalExpense > 0) {
				// ?섏엯怨?吏異?紐⑤몢 ?덈뒗 寃쎌슦
				const incomeAmount = document.createElement('div');
				incomeAmount.className = 'calendar-day-amount mixed-income';
				incomeAmount.textContent = this.formatAmountShort(totalIncome);
				eventsDiv.appendChild(incomeAmount);
				
				const expenseAmount = document.createElement('div');
				expenseAmount.className = 'calendar-day-amount mixed-expense';
				expenseAmount.textContent = this.formatAmountShort(totalExpense);
				eventsDiv.appendChild(expenseAmount);
			} else if (totalIncome > 0) {
				// ?섏엯留??덈뒗 寃쎌슦
				const incomeAmount = document.createElement('div');
				incomeAmount.className = 'calendar-day-amount income';
				incomeAmount.textContent = this.formatAmountShort(totalIncome);
				eventsDiv.appendChild(incomeAmount);
			} else if (totalExpense > 0) {
				// 吏異쒕쭔 ?덈뒗 寃쎌슦
				const expenseAmount = document.createElement('div');
				expenseAmount.className = 'calendar-day-amount expense';
				expenseAmount.textContent = this.formatAmountShort(totalExpense);
				eventsDiv.appendChild(expenseAmount);
			}

			dayDiv.appendChild(eventsDiv);
		}

		// ?대┃ ?대깽??		if (!isOtherMonth) {
			dayDiv.addEventListener('click', () => {
				this.selectDate(dateStr);
				this.showDayDetailsBelow(dateStr);
			});
		}

		return dayDiv;
	},

	/**
	 * ?뱀젙 ?좎쭨???곗씠??媛?몄삤湲?	 */
	getDayData: function(dateStr) {
		return this.accountData.filter(item => item.date === dateStr);
	},

	/**
	 * ?좎쭨 ?좏깮
	 */
	selectDate: function(dateStr) {
		this.selectedDate = dateStr;
		
		// 紐⑤뱺 ?좏깮 ?댁젣
		document.querySelectorAll('.calendar-day').forEach(day => {
			day.classList.remove('selected');
		});

		// ?좏깮???좎쭨 ?쒖떆
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
	 * ?붾퀎 ?붿빟 ?낅뜲?댄듃
	 */
	updateMonthSummary: function(year, month) {
		const monthData = this.accountData.filter(item => {
			const itemDate = new Date(item.date);
			return itemDate.getFullYear() === year && itemDate.getMonth() === month;
		});

		const totalIncome = monthData
			.filter(item => item.type === '?섏엯')
			.reduce((sum, item) => sum + item.amount, 0);
		const totalExpense = monthData
			.filter(item => item.type === '吏異?)
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
	 * ?좎쭨蹂??곸꽭 ?댁뿭???꾨옒???쒖떆
	 */
	showDayDetailsBelow: function(dateStr) {
		const dayData = this.getDayData(dateStr);
		const date = new Date(dateStr);
		const dateFormatted = `${date.getFullYear()}??${date.getMonth() + 1}??${date.getDate()}??;

		// ?쒕ぉ ?낅뜲?댄듃
		const titleElement = document.getElementById('selectedDateTitle');
		if (titleElement) {
			titleElement.textContent = dateFormatted;
		}

		// ?댁뿭 由ъ뒪???뚮뜑留?		const detailsList = document.getElementById('selectedDateList');
		const detailsContainer = document.getElementById('selectedDateDetails');
		
		if (!detailsList || !detailsContainer) return;

		detailsList.innerHTML = '';

		if (dayData.length === 0) {
			detailsList.innerHTML = '<div class="text-center text-muted py-4">?깅줉???댁뿭???놁뒿?덈떎.</div>';
		} else {
			dayData.forEach(item => {
				const itemDiv = document.createElement('div');
				itemDiv.className = 'selected-date-item';

				const infoDiv = document.createElement('div');
				infoDiv.className = 'selected-date-item-info';

				// ?꾩씠肄?				const iconDiv = document.createElement('div');
				iconDiv.className = `selected-date-item-icon ${item.type === '?섏엯' ? 'income' : 'expense'}`;
				iconDiv.innerHTML = item.type === '?섏엯' ? '?뮥' : '?뮯';
				infoDiv.appendChild(iconDiv);

				// ?곸꽭 ?뺣낫
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

				// 湲덉븸
				const amountDiv = document.createElement('div');
				amountDiv.className = `selected-date-item-amount ${item.type === '?섏엯' ? 'income' : 'expense'}`;
				amountDiv.textContent = `${item.type === '?섏엯' ? '+' : '-'}${this.formatAmount(item.amount)}??;

				itemDiv.appendChild(infoDiv);
				itemDiv.appendChild(amountDiv);
				detailsList.appendChild(itemDiv);
			});
		}

		// ?곸꽭 ?댁뿭 ?쒖떆
		detailsContainer.style.display = 'block';
		detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	},

	/**
	 * ?좎쭨蹂??곸꽭 ?댁뿭 ?쒖떆 (紐⑤떖??- 湲곗〈 ?좎?)
	 */
	showDayDetails: function(dateStr) {
		const dayData = this.getDayData(dateStr);
		const date = new Date(dateStr);
		const dateFormatted = `${date.getFullYear()}??${date.getMonth() + 1}??${date.getDate()}??;

		// 紐⑤떖 ?쒕ぉ ?ㅼ젙
		const modalTitle = document.getElementById('dayDetailsModalLabel');
		if (modalTitle) {
			modalTitle.textContent = dateFormatted;
		}

		// ?댁뿭 由ъ뒪???뚮뜑留?		const detailsList = document.getElementById('dayDetailsList');
		if (!detailsList) return;

		detailsList.innerHTML = '';

		if (dayData.length === 0) {
			detailsList.innerHTML = '<div class="text-center text-muted py-4">?깅줉???댁뿭???놁뒿?덈떎.</div>';
		} else {
			dayData.forEach(item => {
				const itemDiv = document.createElement('div');
				itemDiv.className = 'day-detail-item';

				const infoDiv = document.createElement('div');
				infoDiv.className = 'day-detail-info';

				const categoryDiv = document.createElement('div');
				categoryDiv.className = 'day-detail-category';
				const badgeColor = item.type === '?섏엯' ? '#34c759' : '#ff3b30';
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
				amountDiv.className = `day-detail-amount ${item.type === '?섏엯' ? 'income' : 'expense'}`;
				amountDiv.textContent = `${item.type === '?섏엯' ? '+' : '-'}${this.formatAmount(item.amount)}??;
				itemDiv.appendChild(amountDiv);

				itemDiv.insertBefore(infoDiv, amountDiv);
				detailsList.appendChild(itemDiv);
			});

			// ?붿빟 ?뺣낫 異붽?
			const totalIncome = dayData
				.filter(item => item.type === '?섏엯')
				.reduce((sum, item) => sum + item.amount, 0);
			const totalExpense = dayData
				.filter(item => item.type === '吏異?)
				.reduce((sum, item) => sum + item.amount, 0);
			const balance = totalIncome - totalExpense;

			const summaryDiv = document.createElement('div');
			summaryDiv.className = 'day-details-summary';
			summaryDiv.innerHTML = `
				<div class="day-summary-item">
					<div class="day-summary-label">?섏엯</div>
					<div class="day-summary-value income">+${this.formatAmount(totalIncome)}??/div>
				</div>
				<div class="day-summary-item">
					<div class="day-summary-label">吏異?/div>
					<div class="day-summary-value expense">-${this.formatAmount(totalExpense)}??/div>
				</div>
				<div class="day-summary-item">
					<div class="day-summary-label">?붿븸</div>
					<div class="day-summary-value ${balance >= 0 ? 'income' : 'expense'}">${balance >= 0 ? '+' : ''}${this.formatAmount(balance)}??/div>
				</div>
			`;
			detailsList.appendChild(summaryDiv);
		}

		// 紐⑤떖 ?쒖떆
		const modal = new bootstrap.Modal(document.getElementById('dayDetailsModal'));
		modal.show();
	},

	/**
	 * ?좎쭨瑜?YYYY-MM-DD ?뺤떇?쇰줈 ?щ㎎
	 */
	formatDate: function(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	},

	/**
	 * 湲덉븸??泥쒕떒??肄ㅻ쭏 ?뺤떇?쇰줈 ?щ㎎
	 */
	formatAmount: function(amount) {
		return amount.toLocaleString();
	},

	/**
	 * 湲덉븸??吏㏐쾶 ?щ㎎ (?щ젰??
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

// ?섏씠吏 濡쒕뱶 ???щ젰 珥덇린??document.addEventListener('DOMContentLoaded', function() {
	Calendar.init();
});

// ?꾩뿭?쇰줈 ?ъ슜 媛?ν븯?꾨줉 ?ㅼ젙
window.Calendar = Calendar;

