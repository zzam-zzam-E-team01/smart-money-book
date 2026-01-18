/**
 * account-form.js
 * form.html怨?edit.html?먯꽌 怨듭쑀?섎뒗 ??愿??湲곕뒫
 */

// 移댄뀒怨좊━ ?곗씠???뺤쓽
const CATEGORIES = {
	income: [
		{ name: '湲됱뿬', icon: '?뮥' },
		{ name: '?⑸룉', icon: '?뮫' },
		{ name: '?댁옄', icon: '?룱' },
		{ name: '遺?섏엯', icon: '?뱢' },
		{ name: '湲고??섏엯', icon: '?? }
	],
	expense: [
		{ name: '?앸퉬', icon: '?뜗' },
		{ name: '援먰넻鍮?, icon: '?쉶' },
		{ name: '?쇳븨', icon: '?썟' },
		{ name: '臾명솕?앺솢', icon: '?렗' },
		{ name: '?듭떊鍮?, icon: '?벑' },
		{ name: '?섎즺鍮?, icon: '?룯' },
		{ name: '援먯쑁鍮?, icon: '?뱴' },
		{ name: '湲고?吏異?, icon: '?? }
	]
};

const AccountForm = {
	/**
	 * 移댄뀒怨좊━ 踰꾪듉 ?앹꽦
	 */
	initCategories: function(selectedCategory = '') {
		const incomeContainer = document.getElementById('incomeCategories');
		const expenseContainer = document.getElementById('expenseCategories');
		
		// ?섏엯 移댄뀒怨좊━ 踰꾪듉 ?앹꽦
		incomeContainer.innerHTML = CATEGORIES.income.map(cat => 
			`<button type="button" class="btn btn-outline-secondary category-btn ${cat.name === selectedCategory ? 'active' : ''}" data-category="${cat.name}">${cat.icon} ${cat.name}</button>`
		).join('');
		
		// 吏異?移댄뀒怨좊━ 踰꾪듉 ?앹꽦
		expenseContainer.innerHTML = CATEGORIES.expense.map(cat => 
			`<button type="button" class="btn btn-outline-secondary category-btn ${cat.name === selectedCategory ? 'active' : ''}" data-category="${cat.name}">${cat.icon} ${cat.name}</button>`
		).join('');
		
		// ?대깽??由ъ뒪???깅줉
		document.querySelectorAll('.category-btn').forEach(btn => {
			btn.addEventListener('click', function() {
				AccountForm.selectCategory(this.dataset.category);
			});
		});
	},

	/**
	 * ?섏엯/吏異?????좏깮
	 */
	selectType: function(type) {
		document.getElementById('type').value = type;
		
		// 踰꾪듉 ?ㅽ???蹂寃?		document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
		document.querySelector('.type-btn.' + type).classList.add('active');
		
		// 移댄뀒怨좊━ ?쒖떆 蹂寃?		document.getElementById('incomeCategories').style.display = type === 'income' ? 'block' : 'none';
		document.getElementById('expenseCategories').style.display = type === 'expense' ? 'block' : 'none';
		
		// 移댄뀒怨좊━ ?좏깮 珥덇린??		document.getElementById('category').value = '';
		document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
	},

	/**
	 * 移댄뀒怨좊━ ?좏깮
	 */
	selectCategory: function(category) {
		document.getElementById('category').value = category;
		
		// 踰꾪듉 ?ㅽ???蹂寃?		document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
		document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
	},

	/**
	 * ???좏슚??寃利?	 */
	validateForm: function() {
		if (!document.getElementById('category').value) {
			alert('移댄뀒怨좊━瑜??좏깮?댁＜?몄슂.');
			return false;
		}
		return true;
	},

	/**
	 * ???곗씠???섏쭛
	 */
	getFormData: function(formElement) {
		const formData = new FormData(formElement);
		return Object.fromEntries(formData.entries());
	}
};

// ?꾩뿭 ?⑥닔濡??몄텧 (HTML??onclick?먯꽌 ?ъ슜)
window.selectType = AccountForm.selectType;
window.selectCategory = AccountForm.selectCategory;

