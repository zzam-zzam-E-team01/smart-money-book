/**
 * daily.js
 * ?쇱씪 ?붾㈃ 湲곕뒫 援ы쁽
 */

// 媛怨꾨? ?곗씠??愿由??⑥닔
function getAccountData() {
	const storedData = localStorage.getItem('accountData');
	if (storedData) {
		return JSON.parse(storedData);
	} else {
		// 湲곕낯 ?섑뵆 ?곗씠??		const defaultData = [
			{ id: 1, date: '2024-12-18', type: '吏異?, category: '?앸퉬', amount: 24700, description: '?먯떖', time: '12:05', bank: '?곕━??? },
			{ id: 2, date: '2024-12-17', type: '吏異?, category: '?앸퉬', amount: 8500, description: '?먯떖', time: '12:05', bank: '?곕━??? },
			{ id: 3, date: '2024-12-16', type: '吏異?, category: '?앸퉬', amount: 2000, description: '而ㅽ뵾', time: '11:11', bank: '?곕━??? },
			{ id: 4, date: '2024-12-15', type: '吏異?, category: '?앸퉬', amount: 7500, description: '?앸퉬', time: '11:42', bank: '?곕━??? },
			{ id: 5, date: '2024-12-12', type: '吏異?, category: '?앸퉬', amount: 14600, description: '??, time: '12:40', bank: '?곕━??? },
			{ id: 6, date: '2024-12-12', type: '吏異?, category: '臾명솕?앺솢', amount: 10000, description: '?쇱떆諛?, time: '12:40', bank: '?곕━??? },
			{ id: 7, date: '2024-12-11', type: '吏異?, category: '?앸퉬', amount: 17000, description: '?ㅽ겕濡쒕뱶', time: '06:57', bank: '?곕━??? },
			{ id: 8, date: '2024-12-11', type: '吏異?, category: '?앸퉬', amount: 9000, description: '?먯떖', time: '12:00', bank: '?곕━??? },
			{ id: 9, date: '2024-12-10', type: '吏異?, category: '?쇳븨', amount: 150000, description: '寃⑥슱??援щℓ', time: '14:30', bank: '?곕━??? },
			{ id: 10, date: '2024-12-08', type: '吏異?, category: '援먰넻鍮?, amount: 55000, description: '援먰넻移대뱶 異⑹쟾', time: '09:15', bank: '?곕━??? },
			{ id: 11, date: '2024-12-05', type: '吏異?, category: '?앸퉬', amount: 45000, description: '留덊듃 ?λ낫湲?, time: '18:20', bank: '?곕━??? },
			{ id: 12, date: '2024-12-01', type: '?섏엯', category: '湲됱뿬', amount: 3500000, description: '12??湲됱뿬', time: '09:00', bank: '?곕━??? }
		];
		localStorage.setItem('accountData', JSON.stringify(defaultData));
		return defaultData;
	}
}

// ?쇱씪 ?붾㈃ 媛앹껜
const Daily = {
	currentDate: new Date(),
	accountData: [],

	/**
	 * 珥덇린??	 */
	init: function() {
		this.currentDate = new Date();
		this.accountData = getAccountData(); // localStorage?먯꽌 ?곗씠??遺덈윭?ㅺ린
		this.setupEventListeners();
		this.renderMonthSelector();
		this.renderSummary();
		this.renderTransactions();
	},

	/**
	 * ?대깽??由ъ뒪???ㅼ젙
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
				window.location.href = 'pages/account/form.html';
			});
		}
	},

	/**
	 * ???대룞
	 */
	navigateMonth: function(direction) {
		this.currentDate.setMonth(this.currentDate.getMonth() + direction);
		this.renderMonthSelector();
		this.renderSummary();
		this.renderTransactions();
	},

	/**
	 * ???좏깮湲??뚮뜑留?	 */
	renderMonthSelector: function() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth() + 1;
		const monthText = `${year}??${month}??;

		const monthTextElement = document.getElementById('dailyMonthText');
		if (monthTextElement) {
			monthTextElement.textContent = monthText;
		}
	},

	/**
	 * ?붿빟 ?뺣낫 ?뚮뜑留?	 */
	renderSummary: function() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth() + 1;
		const monthStr = `${year}-${String(month).padStart(2, '0')}`;

		// ?대떦 ?붿쓽 ?곗씠???꾪꽣留?		const monthData = this.accountData.filter(item => {
			const itemDate = new Date(item.date);
			return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
		});

		// ?섏엯/吏異?怨꾩궛
		const totalIncome = monthData
			.filter(item => item.type === '?섏엯')
			.reduce((sum, item) => sum + item.amount, 0);
		const totalExpense = monthData
			.filter(item => item.type === '吏異?)
			.reduce((sum, item) => sum + item.amount, 0);
		const total = totalIncome - totalExpense;

		// ?붿빟 ?뺣낫 ?낅뜲?댄듃
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
	 * 嫄곕옒 ?댁뿭 ?뚮뜑留?	 */
	renderTransactions: function() {
		const year = this.currentDate.getFullYear();
		const month = this.currentDate.getMonth() + 1;
		const monthStr = `${year}-${String(month).padStart(2, '0')}`;

		// ?대떦 ?붿쓽 ?곗씠???꾪꽣留?		const monthData = this.accountData.filter(item => {
			const itemDate = new Date(item.date);
			return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
		});

		// ?좎쭨蹂꾨줈 洹몃９??		const groupedByDate = {};
		monthData.forEach(item => {
			const date = item.date;
			if (!groupedByDate[date]) {
				groupedByDate[date] = [];
			}
			groupedByDate[date].push(item);
		});

		// ?좎쭨蹂꾨줈 ?뺣젹 (理쒖떊??
		const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
			return new Date(b) - new Date(a);
		});

		// 嫄곕옒 由ъ뒪??而⑦뀒?대꼫
		const transactionsContainer = document.getElementById('dailyTransactions');
		if (!transactionsContainer) return;

		transactionsContainer.innerHTML = '';

		if (sortedDates.length === 0) {
			transactionsContainer.innerHTML = `
				<div class="daily-empty">
					<div class="daily-empty-icon">?뱷</div>
					<div class="daily-empty-text">?깅줉???댁뿭???놁뒿?덈떎.</div>
				</div>
			`;
			return;
		}

		// ?좎쭨蹂꾨줈 ?뚮뜑留?		sortedDates.forEach(date => {
			const dateGroup = this.createDateGroup(date, groupedByDate[date]);
			transactionsContainer.appendChild(dateGroup);
		});
	},

	/**
	 * ?좎쭨 洹몃９ ?앹꽦
	 */
	createDateGroup: function(dateStr, items) {
		const date = new Date(dateStr);
		const dayOfWeek = ['??, '??, '??, '??, '紐?, '湲?, '??][date.getDay()];
		const day = date.getDate();

		// ?좎쭨蹂??섏엯/吏異?怨꾩궛
		const dayIncome = items
			.filter(item => item.type === '?섏엯')
			.reduce((sum, item) => sum + item.amount, 0);
		const dayExpense = items
			.filter(item => item.type === '吏異?)
			.reduce((sum, item) => sum + item.amount, 0);

		// ?좎쭨 洹몃９ 而⑦뀒?대꼫
		const dateGroupDiv = document.createElement('div');
		dateGroupDiv.className = 'daily-date-group';

		// ?좎쭨 ?ㅻ뜑
		const dateHeaderDiv = document.createElement('div');
		dateHeaderDiv.className = 'daily-date-header';
		dateHeaderDiv.innerHTML = `
			<div class="daily-date-info">
				<span class="daily-date-number">${day}</span>
				<span class="daily-date-day">${dayOfWeek}?붿씪</span>
			</div>
			<div class="daily-date-summary">
				${dayIncome > 0 ? `<span class="income">${this.formatAmount(dayIncome)}??/span>` : ''}
				${dayExpense > 0 ? `<span class="expense">${this.formatAmount(dayExpense)}??/span>` : ''}
				${dayIncome === 0 && dayExpense === 0 ? '<span>0??/span>' : ''}
			</div>
		`;
		dateGroupDiv.appendChild(dateHeaderDiv);

		// 嫄곕옒 ??ぉ??(?쒓컙???뺣젹)
		const sortedItems = [...items].sort((a, b) => {
			const timeA = a.time || '00:00';
			const timeB = b.time || '00:00';
			return timeB.localeCompare(timeA); // 理쒖떊??		});

		sortedItems.forEach(item => {
			const transactionItem = this.createTransactionItem(item);
			dateGroupDiv.appendChild(transactionItem);
		});

		return dateGroupDiv;
	},

	/**
	 * 嫄곕옒 ??ぉ ?앹꽦
	 */
	createTransactionItem: function(item) {
		const itemDiv = document.createElement('div');
		const itemType = item.type === '?섏엯' ? 'income' : 'expense';
		itemDiv.className = `daily-transaction-item ${itemType}-item`;
		itemDiv.addEventListener('click', () => {
			window.location.href = `pages/account/edit.html?id=${item.id}`;
		});

		const infoDiv = document.createElement('div');
		infoDiv.className = 'daily-transaction-info';

		// 移댄뀒怨좊━
		const categoryDiv = document.createElement('div');
		categoryDiv.className = 'daily-transaction-category';
		const badgeClass = item.type === '?섏엯' ? 'income' : 'expense';
		categoryDiv.innerHTML = `
			<span class="daily-transaction-category-badge ${badgeClass}">${item.type}</span>
			<span>${item.category}</span>
		`;
		infoDiv.appendChild(categoryDiv);

		// ?ㅻ챸
		if (item.description) {
			const descDiv = document.createElement('div');
			descDiv.className = 'daily-transaction-desc';
			descDiv.textContent = item.description;
			infoDiv.appendChild(descDiv);
		}

		// ?쒓컙 諛????		const timeDiv = document.createElement('div');
		timeDiv.className = 'daily-transaction-time';
		const timeText = item.time ? `${this.formatTime(item.time)} ${item.bank || ''}`.trim() : '';
		timeDiv.textContent = timeText;
		infoDiv.appendChild(timeDiv);

		// 湲덉븸
		const amountDiv = document.createElement('div');
		amountDiv.className = `daily-transaction-amount ${item.type === '?섏엯' ? 'income' : 'expense'}`;
		amountDiv.textContent = `${item.type === '?섏엯' ? '+' : '-'}${this.formatAmount(item.amount)}??;

		itemDiv.appendChild(infoDiv);
		itemDiv.appendChild(amountDiv);

		return itemDiv;
	},

	/**
	 * ?쒓컙 ?щ㎎ (HH:mm -> ?ㅼ쟾/?ㅽ썑 HH:mm)
	 */
	formatTime: function(timeStr) {
		const [hours, minutes] = timeStr.split(':');
		const hour = parseInt(hours);
		const ampm = hour >= 12 ? '?ㅽ썑' : '?ㅼ쟾';
		const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
		return `${ampm} ${String(displayHour).padStart(2, '0')}:${minutes}`;
	},

	/**
	 * 湲덉븸??泥쒕떒??肄ㅻ쭏 ?뺤떇?쇰줈 ?щ㎎
	 */
	formatAmount: function(amount) {
		return amount.toLocaleString();
	}
};

// ?섏씠吏 濡쒕뱶 ??珥덇린??document.addEventListener('DOMContentLoaded', function() {
	Daily.init();
});

// ?꾩뿭?쇰줈 ?ъ슜 媛?ν븯?꾨줉 ?ㅼ젙
window.Daily = Daily;

