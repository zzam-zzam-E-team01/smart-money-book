/**
 * edit.js
 * edit.html ?섏씠吏 ?꾩슜 ?ㅽ겕由쏀듃
 */

// DOM 濡쒕뱶 ???ㅽ뻾
document.addEventListener('DOMContentLoaded', function() {
	// ?꾩옱 ?좏깮??移댄뀒怨좊━ 媛?媛?몄삤湲?	const selectedCategory = document.getElementById('category').value;
	
	// 移댄뀒怨좊━ 踰꾪듉 珥덇린??(湲곗〈 ?좏깮媛??ы븿)
	AccountForm.initCategories(selectedCategory);
	
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
	const data = AccountForm.getFormData(e.target);
	
	console.log('?섏젙???곗씠??', data);
	alert('?댁뿭???섏젙?섏뿀?듬땲??');
	
	// ?ㅼ젣濡쒕뒗 ?쒕쾭濡?PUT/PATCH ?붿껌??蹂대궡????	// API ?몄텧 ?덉떆:
	// fetch(`/account/edit/${data.id}`, {
	//   method: 'PUT',
	//   headers: { 'Content-Type': 'application/json' },
	//   body: JSON.stringify(data)
	// })
	// .then(res => res.json())
	// .then(() => {
	//   window.location.href = 'list.html';
	// });
}

