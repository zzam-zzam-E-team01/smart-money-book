/**
 * list.js
 * list.html ?섏씠吏 ?꾩슜 ?ㅽ겕由쏀듃
 */

/**
 * ?댁뿭 ??젣 ?뺤씤
 */
function confirmDelete(id) {
	if (confirm('?뺣쭚 ??젣?섏떆寃좎뒿?덇퉴?')) {
		alert('ID ' + id + ' ??ぉ????젣?섏뿀?듬땲??');
		// ?ㅼ젣濡쒕뒗 ?쒕쾭??DELETE ?붿껌??蹂대궡????		// API ?몄텧 ?덉떆:
		// fetch(`/account/delete/${id}`, { method: 'DELETE' })
		//   .then(() => location.reload());
	}
}

/**
 * ?붾퀎 ?곗씠??濡쒕뱶
 */
function loadMonth() {
	const month = document.getElementById('monthSelector').value;
	document.getElementById('currentMonth').textContent = month;
	alert(month + ' ?곗씠?곕? 遺덈윭?듬땲??');
	// ?ㅼ젣濡쒕뒗 ?쒕쾭?먯꽌 ?대떦 ?붿쓽 ?곗씠?곕? 媛?몄?????	// API ?몄텧 ?덉떆:
	// fetch(`/account?month=${month}`)
	//   .then(res => res.json())
	//   .then(data => renderAccountList(data));
}

