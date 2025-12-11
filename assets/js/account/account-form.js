/**
 * account-form.js
 * form.html과 edit.html에서 공유하는 폼 관련 기능
 */

// 카테고리 데이터 정의
const CATEGORIES = {
	income: [
		{ name: '급여', icon: '💰' },
		{ name: '용돈', icon: '💵' },
		{ name: '이자', icon: '🏦' },
		{ name: '부수입', icon: '📈' },
		{ name: '기타수입', icon: '➕' }
	],
	expense: [
		{ name: '식비', icon: '🍚' },
		{ name: '교통비', icon: '🚌' },
		{ name: '쇼핑', icon: '🛒' },
		{ name: '문화생활', icon: '🎬' },
		{ name: '통신비', icon: '📱' },
		{ name: '의료비', icon: '🏥' },
		{ name: '교육비', icon: '📚' },
		{ name: '기타지출', icon: '➖' }
	]
};

const AccountForm = {
	/**
	 * 카테고리 버튼 생성
	 */
	initCategories: function(selectedCategory = '') {
		const incomeContainer = document.getElementById('incomeCategories');
		const expenseContainer = document.getElementById('expenseCategories');
		
		// 수입 카테고리 버튼 생성
		incomeContainer.innerHTML = CATEGORIES.income.map(cat => 
			`<button type="button" class="btn btn-outline-secondary category-btn ${cat.name === selectedCategory ? 'active' : ''}" data-category="${cat.name}">${cat.icon} ${cat.name}</button>`
		).join('');
		
		// 지출 카테고리 버튼 생성
		expenseContainer.innerHTML = CATEGORIES.expense.map(cat => 
			`<button type="button" class="btn btn-outline-secondary category-btn ${cat.name === selectedCategory ? 'active' : ''}" data-category="${cat.name}">${cat.icon} ${cat.name}</button>`
		).join('');
		
		// 이벤트 리스너 등록
		document.querySelectorAll('.category-btn').forEach(btn => {
			btn.addEventListener('click', function() {
				AccountForm.selectCategory(this.dataset.category);
			});
		});
	},

	/**
	 * 수입/지출 타입 선택
	 */
	selectType: function(type) {
		document.getElementById('type').value = type;
		
		// 버튼 스타일 변경
		document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
		document.querySelector('.type-btn.' + type).classList.add('active');
		
		// 카테고리 표시 변경
		document.getElementById('incomeCategories').style.display = type === 'income' ? 'block' : 'none';
		document.getElementById('expenseCategories').style.display = type === 'expense' ? 'block' : 'none';
		
		// 카테고리 선택 초기화
		document.getElementById('category').value = '';
		document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
	},

	/**
	 * 카테고리 선택
	 */
	selectCategory: function(category) {
		document.getElementById('category').value = category;
		
		// 버튼 스타일 변경
		document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
		document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
	},

	/**
	 * 폼 유효성 검증
	 */
	validateForm: function() {
		if (!document.getElementById('category').value) {
			alert('카테고리를 선택해주세요.');
			return false;
		}
		return true;
	},

	/**
	 * 폼 데이터 수집
	 */
	getFormData: function(formElement) {
		const formData = new FormData(formElement);
		return Object.fromEntries(formData.entries());
	}
};

// 전역 함수로 노출 (HTML의 onclick에서 사용)
window.selectType = AccountForm.selectType;
window.selectCategory = AccountForm.selectCategory;

