/**
 * main.js
 * 모든 페이지에서 공통으로 사용하는 스크립트
 */

// 유틸리티 함수들
const Utils = {
	/**
	 * 숫자를 천단위 콤마 형식으로 포맷
	 */
	formatNumber: function(num) {
		return num.toLocaleString();
	},

	/**
	 * 날짜를 YYYY-MM-DD 형식으로 포맷
	 */
	formatDate: function(date) {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	},

	/**
	 * 현재 날짜를 YYYY-MM 형식으로 반환
	 */
	getCurrentMonth: function() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		return `${year}-${month}`;
	}
};

// 전역으로 사용 가능하도록 설정
window.Utils = Utils;

// 로그인 체크 (로그인/회원가입 페이지 제외)
(function() {
	const currentPath = window.location.pathname;
	const fileName = currentPath.split('/').pop();
	
	// 로그인/회원가입 페이지는 체크하지 않음
	if (fileName === 'login.html' || fileName === 'signup.html') {
		return;
	}
	
	// DOMContentLoaded 이벤트에서 로그인 체크
	document.addEventListener('DOMContentLoaded', function() {
		// auth.js가 로드되었는지 확인 (약간의 지연을 두어 스크립트 로드 대기)
		setTimeout(function() {
			if (typeof checkAuth === 'function') {
				checkAuth();
			} else {
				console.warn('auth.js가 로드되지 않았습니다. 로그인 체크를 건너뜁니다.');
			}
		}, 100);
	});
})();

