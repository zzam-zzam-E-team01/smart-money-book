/**
 * main.js
 * 紐⑤뱺 ?섏씠吏?먯꽌 怨듯넻?쇰줈 ?ъ슜?섎뒗 ?ㅽ겕由쏀듃
 */

// ?좏떥由ы떚 ?⑥닔??const Utils = {
	/**
	 * ?レ옄瑜?泥쒕떒??肄ㅻ쭏 ?뺤떇?쇰줈 ?щ㎎
	 */
	formatNumber: function(num) {
		return num.toLocaleString();
	},

	/**
	 * ?좎쭨瑜?YYYY-MM-DD ?뺤떇?쇰줈 ?щ㎎
	 */
	formatDate: function(date) {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	},

	/**
	 * ?꾩옱 ?좎쭨瑜?YYYY-MM ?뺤떇?쇰줈 諛섑솚
	 */
	getCurrentMonth: function() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		return `${year}-${month}`;
	}
};

// ?꾩뿭?쇰줈 ?ъ슜 媛?ν븯?꾨줉 ?ㅼ젙
window.Utils = Utils;

// 濡쒓렇??泥댄겕 (濡쒓렇???뚯썝媛???섏씠吏 ?쒖쇅)
(function() {
	const currentPath = window.location.pathname;
	const fileName = currentPath.split('/').pop();
	
	// 濡쒓렇???뚯썝媛???섏씠吏??泥댄겕?섏? ?딆쓬
	if (fileName === 'login.html' || fileName === 'signup.html') {
		return;
	}
	
	// DOMContentLoaded ?대깽?몄뿉??濡쒓렇??泥댄겕
	document.addEventListener('DOMContentLoaded', function() {
		// auth.js媛 濡쒕뱶?섏뿀?붿? ?뺤씤 (?쎄컙??吏?곗쓣 ?먯뼱 ?ㅽ겕由쏀듃 濡쒕뱶 ?湲?
		setTimeout(function() {
			if (typeof checkAuth === 'function') {
				checkAuth();
			} else {
				console.warn('auth.js媛 濡쒕뱶?섏? ?딆븯?듬땲?? 濡쒓렇??泥댄겕瑜?嫄대꼫?곷땲??');
			}
		}, 100);
	});
})();

