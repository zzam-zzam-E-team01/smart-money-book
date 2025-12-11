/**
 * form.js
 * form.html 페이지 전용 스크립트
 */

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
	// 카테고리 버튼 초기화
	AccountForm.initCategories();
	
	// 오늘 날짜를 기본값으로 설정
	document.getElementById('accountDate').valueAsDate = new Date();
	
	// 폼 제출 이벤트 핸들러
	document.getElementById('accountForm').addEventListener('submit', handleFormSubmit);
});

/**
 * 폼 제출 처리
 */
function handleFormSubmit(e) {
	e.preventDefault();
	
	// 유효성 검증
	if (!AccountForm.validateForm()) {
		return;
	}
	
	// 폼 데이터 수집
	const data = AccountForm.getFormData(e.target);
	
	console.log('제출된 데이터:', data);
	alert('내역이 등록되었습니다!');
	
	// 실제로는 서버로 POST 요청을 보내야 함
	// API 호출 예시:
	// fetch('/account/write', {
	//   method: 'POST',
	//   headers: { 'Content-Type': 'application/json' },
	//   body: JSON.stringify(data)
	// })
	// .then(res => res.json())
	// .then(() => {
	//   window.location.href = 'list.html';
	// });
}

