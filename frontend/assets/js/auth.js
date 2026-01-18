/**
 * auth.js
 * 濡쒓렇??諛??뚯썝媛??愿??湲곕뒫
 */

// ?ъ슜???곗씠????μ냼 (localStorage ?ъ슜)
const UserStorage = {
	STORAGE_KEY: 'smart_money_book_users',
	CURRENT_USER_KEY: 'smart_money_book_current_user',

	/**
	 * 紐⑤뱺 ?ъ슜???곗씠??媛?몄삤湲?	 */
	getAllUsers: function() {
		const users = localStorage.getItem(this.STORAGE_KEY);
		return users ? JSON.parse(users) : [];
	},

	/**
	 * ?ъ슜???곗씠?????	 */
	saveUsers: function(users) {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
	},

	/**
	 * ???ъ슜??異붽?
	 */
	addUser: function(userData) {
		const users = this.getAllUsers();
		
		// ?꾩씠??以묐났 泥댄겕
		if (users.find(u => u.id === userData.id)) {
			throw new Error('?대? ?ъ슜 以묒씤 ?꾩씠?붿엯?덈떎.');
		}

		// ?ъ슜??異붽?
		const newUser = {
			id: userData.id,
			name: userData.name,
			password: userData.password, // ?ㅼ젣 ?꾨줈?앺듃?먯꽌???댁떆???꾩슂
			gender: userData.gender,
			phone: userData.phone,
			createdAt: new Date().toISOString()
		};

		users.push(newUser);
		this.saveUsers(users);
		return newUser;
	},

	/**
	 * ?ъ슜??濡쒓렇??	 */
	login: function(id, password) {
		const users = this.getAllUsers();
		const user = users.find(u => u.id === id && u.password === password);

		if (!user) {
			throw new Error('?꾩씠???먮뒗 鍮꾨?踰덊샇媛 ?щ컮瑜댁? ?딆뒿?덈떎.');
		}

		// 濡쒓렇???뺣낫 ???(鍮꾨?踰덊샇 ?쒖쇅)
		const loginUser = {
			id: user.id,
			name: user.name,
			gender: user.gender,
			phone: user.phone
		};

		localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(loginUser));
		return loginUser;
	},

	/**
	 * ?꾩옱 濡쒓렇?명븳 ?ъ슜??媛?몄삤湲?	 */
	getCurrentUser: function() {
		const user = localStorage.getItem(this.CURRENT_USER_KEY);
		return user ? JSON.parse(user) : null;
	},

	/**
	 * 濡쒓렇?꾩썐
	 */
	logout: function() {
		localStorage.removeItem(this.CURRENT_USER_KEY);
	},

	/**
	 * 濡쒓렇???곹깭 ?뺤씤
	 */
	isLoggedIn: function() {
		return this.getCurrentUser() !== null;
	}
};

const FrontendPaths = {
	getBasePath: function() {
		const path = window.location.pathname;
		const parts = path.split('/').filter(p => p !== '');
		const frontendIndex = parts.lastIndexOf('frontend');
		if (frontendIndex !== -1) {
			return '/' + parts.slice(0, frontendIndex + 1).join('/') + '/';
		}
		return path.substring(0, path.lastIndexOf('/') + 1);
	},
	buildUrl: function(relativePath) {
		const basePath = this.getBasePath();
		const origin = window.location.origin === 'null'
			? `${window.location.protocol}//`
			: window.location.origin;
		return `${origin}${basePath}${relativePath}`;
	}
};

// 濡쒓렇???섏씠吏 湲곕뒫
if (document.getElementById('loginForm')) {
	const loginForm = document.getElementById('loginForm');
	const loginError = document.getElementById('loginError');
	const loginErrorText = document.getElementById('loginErrorText');
	const passwordToggle = document.getElementById('passwordToggle');
	const loginPassword = document.getElementById('loginPassword');

	// 鍮꾨?踰덊샇 蹂닿린/?④린湲?	if (passwordToggle) {
		passwordToggle.addEventListener('click', function() {
			const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
			loginPassword.setAttribute('type', type);
			
			const icon = this.querySelector('i');
			icon.classList.toggle('bi-eye');
			icon.classList.toggle('bi-eye-slash');
		});
	}

	// 濡쒓렇?????쒖텧
	loginForm.addEventListener('submit', function(e) {
		e.preventDefault();

		// ?먮윭 硫붿떆吏 ?④린湲?		loginError.style.display = 'none';

		const formData = new FormData(loginForm);
		const id = formData.get('id').trim();
		const password = formData.get('password');

		// ?좏슚??寃??		if (!id || !password) {
			showLoginError('?꾩씠?붿? 鍮꾨?踰덊샇瑜??낅젰?댁＜?몄슂.');
			return;
		}

		try {
			// 濡쒓렇???쒕룄
			const user = UserStorage.login(id, password);
			
			// 濡쒓렇???깃났
			console.log('濡쒓렇???깃났:', user);
			
			// 硫붿씤 ?섏씠吏濡??대룞
			window.location.href = FrontendPaths.buildUrl('index.html');
		} catch (error) {
			showLoginError(error.message);
		}
	});

	function showLoginError(message) {
		loginErrorText.textContent = message;
		loginError.style.display = 'block';
	}
}

// ?뚯썝媛???섏씠吏 湲곕뒫
if (document.getElementById('signupForm')) {
	const signupForm = document.getElementById('signupForm');
	const signupError = document.getElementById('signupError');
	const signupErrorText = document.getElementById('signupErrorText');
	const signupSuccess = document.getElementById('signupSuccess');
	const signupSuccessText = document.getElementById('signupSuccessText');
	const signupPassword = document.getElementById('signupPassword');
	const signupPasswordConfirm = document.getElementById('signupPasswordConfirm');
	const signupPasswordToggle = document.getElementById('signupPasswordToggle');
	const signupPasswordConfirmToggle = document.getElementById('signupPasswordConfirmToggle');

	// 鍮꾨?踰덊샇 蹂닿린/?④린湲?	if (signupPasswordToggle) {
		signupPasswordToggle.addEventListener('click', function() {
			const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
			signupPassword.setAttribute('type', type);
			
			const icon = this.querySelector('i');
			icon.classList.toggle('bi-eye');
			icon.classList.toggle('bi-eye-slash');
		});
	}

	if (signupPasswordConfirmToggle) {
		signupPasswordConfirmToggle.addEventListener('click', function() {
			const type = signupPasswordConfirm.getAttribute('type') === 'password' ? 'text' : 'password';
			signupPasswordConfirm.setAttribute('type', type);
			
			const icon = this.querySelector('i');
			icon.classList.toggle('bi-eye');
			icon.classList.toggle('bi-eye-slash');
		});
	}

	// 鍮꾨?踰덊샇 ?뺤씤 ?ㅼ떆媛?寃利?	if (signupPasswordConfirm) {
		signupPasswordConfirm.addEventListener('input', function() {
			if (this.value && signupPassword.value !== this.value) {
				this.setCustomValidity('鍮꾨?踰덊샇媛 ?쇱튂?섏? ?딆뒿?덈떎.');
			} else {
				this.setCustomValidity('');
			}
		});
	}

	// ?대???踰덊샇 ?먮룞 ?щ㎎??	const signupPhone = document.getElementById('signupPhone');
	if (signupPhone) {
		signupPhone.addEventListener('input', function(e) {
			let value = e.target.value.replace(/[^0-9]/g, '');
			
			if (value.length > 3 && value.length <= 7) {
				value = value.slice(0, 3) + '-' + value.slice(3);
			} else if (value.length > 7) {
				value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
			}
			
			e.target.value = value;
		});
	}

	// ?뚯썝媛?????쒖텧
	signupForm.addEventListener('submit', function(e) {
		e.preventDefault();

		// ?먮윭/?깃났 硫붿떆吏 ?④린湲?		signupError.style.display = 'none';
		signupSuccess.style.display = 'none';

		const formData = new FormData(signupForm);
		const name = formData.get('name').trim();
		const id = formData.get('id').trim();
		const password = formData.get('password');
		const passwordConfirm = formData.get('passwordConfirm');
		const gender = formData.get('gender');
		const phone = formData.get('phone').trim();

		// ?좏슚??寃??		if (!name || !id || !password || !passwordConfirm || !gender || !phone) {
			showSignupError('紐⑤뱺 ?꾨뱶瑜??낅젰?댁＜?몄슂.');
			return;
		}

		if (id.length < 4) {
			showSignupError('?꾩씠?붾뒗 4???댁긽 ?낅젰?댁＜?몄슂.');
			return;
		}

		if (password.length < 6) {
			showSignupError('鍮꾨?踰덊샇??6???댁긽 ?낅젰?댁＜?몄슂.');
			return;
		}

		if (password !== passwordConfirm) {
			showSignupError('鍮꾨?踰덊샇媛 ?쇱튂?섏? ?딆뒿?덈떎.');
			return;
		}

		if (!/^010-\d{4}-\d{4}$/.test(phone)) {
			showSignupError('?대???踰덊샇 ?뺤떇???щ컮瑜댁? ?딆뒿?덈떎. (010-1234-5678)');
			return;
		}

		try {
			// ?뚯썝媛??泥섎━
			const userData = {
				name,
				id,
				password,
				gender,
				phone
			};

			UserStorage.addUser(userData);
			
			// ?깃났 硫붿떆吏 ?쒖떆
			signupSuccessText.textContent = '?뚯썝媛?낆씠 ?꾨즺?섏뿀?듬땲?? 濡쒓렇???섏씠吏濡??대룞?⑸땲??';
			signupSuccess.style.display = 'block';

			// 2珥???濡쒓렇???섏씠吏濡??대룞
			setTimeout(() => {
				window.location.href = FrontendPaths.buildUrl('pages/login.html');
			}, 2000);

		} catch (error) {
			showSignupError(error.message);
		}
	});

	function showSignupError(message) {
		signupErrorText.textContent = message;
		signupError.style.display = 'block';
	}
}

// 濡쒓렇??泥댄겕 ?⑥닔 (?ㅻⅨ ?섏씠吏?먯꽌 ?ъ슜)
function checkAuth() {
	if (!UserStorage.isLoggedIn()) {
		window.location.href = FrontendPaths.buildUrl('pages/login.html');
		return false;
	}
	return true;
}

// 濡쒓렇?꾩썐 ?⑥닔
function logout() {
	if (confirm('濡쒓렇?꾩썐 ?섏떆寃좎뒿?덇퉴?')) {
		UserStorage.logout();
		window.location.href = FrontendPaths.buildUrl('pages/login.html');
	}
}

// ?꾩뿭?쇰줈 ?ъ슜 媛?ν븯?꾨줉 ?ㅼ젙
window.UserStorage = UserStorage;
window.checkAuth = checkAuth;
window.logout = logout;

