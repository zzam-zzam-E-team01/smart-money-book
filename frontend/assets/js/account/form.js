/**
 * form.js
 * form.html ?섏씠吏 ?꾩슜 ?ㅽ겕由쏀듃
 */

// DOM 濡쒕뱶 ???ㅽ뻾
document.addEventListener('DOMContentLoaded', function() {
	// 移댄뀒怨좊━ 踰꾪듉 珥덇린??	AccountForm.initCategories();
	
	// ?ㅻ뒛 ?좎쭨瑜?湲곕낯媛믪쑝濡??ㅼ젙
	document.getElementById('accountDate').valueAsDate = new Date();
	
	// ???쒖텧 ?대깽???몃뱾??	document.getElementById('accountForm').addEventListener('submit', handleFormSubmit);
});

/**
 * ???쒖텧 泥섎━
 */
function handleFormSubmit(e) {
	e.preventDefault();
	
	// ?좏슚??寃利?	if (!AccountForm.validateForm()) {
		return;
	}
	
	// ???곗씠???섏쭛
	const formData = AccountForm.getFormData(e.target);
	
	// ?곗씠??蹂??	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	
	const newItem = {
		id: Date.now(), // 怨좎쑀 ID ?앹꽦
		date: formData.accountDate,
		type: formData.type === 'income' ? '?섏엯' : '吏異?,
		category: formData.category,
		amount: parseInt(formData.amount),
		description: formData.description || '',
		time: `${hours}:${minutes}`,
		bank: '?곕━??? // 湲곕낯媛?	};
	
	// localStorage?먯꽌 湲곗〈 ?곗씠??媛?몄삤湲?	const storedData = localStorage.getItem('accountData');
	let accountData = [];
	
	if (storedData) {
		accountData = JSON.parse(storedData);
	} else {
		// 湲곕낯 ?섑뵆 ?곗씠??		accountData = [
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
	}
	
	// ????ぉ 異붽?
	accountData.push(newItem);
	
	// localStorage?????	localStorage.setItem('accountData', JSON.stringify(accountData));
	
	console.log('?쒖텧???곗씠??', newItem);
	alert('?댁뿭???깅줉?섏뿀?듬땲??');
	
	// 硫붿씤 ?붾㈃?쇰줈 ?대룞
	window.location.href = '../../index.html';
}

