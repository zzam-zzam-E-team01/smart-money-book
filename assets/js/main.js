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

