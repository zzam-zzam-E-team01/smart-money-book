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
	const formData = AccountForm.getFormData(e.target);
	
	// 데이터 변환
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	
	const newItem = {
		id: Date.now(), // 고유 ID 생성
		date: formData.accountDate,
		type: formData.type === 'income' ? '수입' : '지출',
		category: formData.category,
		amount: parseInt(formData.amount),
		description: formData.description || '',
		time: `${hours}:${minutes}`,
		bank: '우리은행' // 기본값
	};
	
	// localStorage에서 기존 데이터 가져오기
	const storedData = localStorage.getItem('accountData');
	let accountData = [];
	
	if (storedData) {
		accountData = JSON.parse(storedData);
	} else {
		// 기본 샘플 데이터
		accountData = [
			{ id: 1, date: '2024-12-18', type: '지출', category: '식비', amount: 24700, description: '점심', time: '12:05', bank: '우리은행' },
			{ id: 2, date: '2024-12-17', type: '지출', category: '식비', amount: 8500, description: '점심', time: '12:05', bank: '우리은행' },
			{ id: 3, date: '2024-12-16', type: '지출', category: '식비', amount: 2000, description: '커피', time: '11:11', bank: '우리은행' },
			{ id: 4, date: '2024-12-15', type: '지출', category: '식비', amount: 7500, description: '식비', time: '11:42', bank: '우리은행' },
			{ id: 5, date: '2024-12-12', type: '지출', category: '식비', amount: 14600, description: '술', time: '12:40', bank: '우리은행' },
			{ id: 6, date: '2024-12-12', type: '지출', category: '문화생활', amount: 10000, description: '피시방', time: '12:40', bank: '우리은행' },
			{ id: 7, date: '2024-12-11', type: '지출', category: '식비', amount: 17000, description: '실크로드', time: '06:57', bank: '우리은행' },
			{ id: 8, date: '2024-12-11', type: '지출', category: '식비', amount: 9000, description: '점심', time: '12:00', bank: '우리은행' },
			{ id: 9, date: '2024-12-10', type: '지출', category: '쇼핑', amount: 150000, description: '겨울옷 구매', time: '14:30', bank: '우리은행' },
			{ id: 10, date: '2024-12-08', type: '지출', category: '교통비', amount: 55000, description: '교통카드 충전', time: '09:15', bank: '우리은행' },
			{ id: 11, date: '2024-12-05', type: '지출', category: '식비', amount: 45000, description: '마트 장보기', time: '18:20', bank: '우리은행' },
			{ id: 12, date: '2024-12-01', type: '수입', category: '급여', amount: 3500000, description: '12월 급여', time: '09:00', bank: '우리은행' }
		];
	}
	
	// 새 항목 추가
	accountData.push(newItem);
	
	// localStorage에 저장
	localStorage.setItem('accountData', JSON.stringify(accountData));
	
	console.log('제출된 데이터:', newItem);
	alert('내역이 등록되었습니다!');
	
	// 메인 화면으로 이동
	window.location.href = '../index.html';
}

