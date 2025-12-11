/**
 * list.js
 * list.html 페이지 전용 스크립트
 */

/**
 * 내역 삭제 확인
 */
function confirmDelete(id) {
	if (confirm('정말 삭제하시겠습니까?')) {
		alert('ID ' + id + ' 항목이 삭제되었습니다.');
		// 실제로는 서버에 DELETE 요청을 보내야 함
		// API 호출 예시:
		// fetch(`/account/delete/${id}`, { method: 'DELETE' })
		//   .then(() => location.reload());
	}
}

/**
 * 월별 데이터 로드
 */
function loadMonth() {
	const month = document.getElementById('monthSelector').value;
	document.getElementById('currentMonth').textContent = month;
	alert(month + ' 데이터를 불러옵니다.');
	// 실제로는 서버에서 해당 월의 데이터를 가져와야 함
	// API 호출 예시:
	// fetch(`/account?month=${month}`)
	//   .then(res => res.json())
	//   .then(data => renderAccountList(data));
}

