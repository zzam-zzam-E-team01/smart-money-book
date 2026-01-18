/**
 * auth.js
 * 로그인 및 회원가입 관련 기능
 */

// 사용자 데이터 저장소 (localStorage 사용)
const UserStorage = {
	STORAGE_KEY: 'smart_money_book_users',
	CURRENT_USER_KEY: 'smart_money_book_current_user',

	/**
	 * 모든 사용자 데이터 가져오기
	 */
	getAllUsers: function() {
		const users = localStorage.getItem(this.STORAGE_KEY);
		return users ? JSON.parse(users) : [];
	},

	/**
	 * 사용자 데이터 저장
	 */
	saveUsers: function(users) {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
	},

	/**
	 * 새 사용자 추가
	 */
	addUser: function(userData) {
		const users = this.getAllUsers();
		
		// 아이디 중복 체크
		if (users.find(u => u.id === userData.id)) {
			throw new Error('이미 사용 중인 아이디입니다.');
		}

		// 사용자 추가
		const newUser = {
			id: userData.id,
			name: userData.name,
			password: userData.password, // 실제 프로젝트에서는 해시화 필요
			gender: userData.gender,
			phone: userData.phone,
			createdAt: new Date().toISOString()
		};

		users.push(newUser);
		this.saveUsers(users);
		return newUser;
	},

	/**
	 * 사용자 로그인
	 */
	login: function(id, password) {
		const users = this.getAllUsers();
		const user = users.find(u => u.id === id && u.password === password);

		if (!user) {
			throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
		}

		// 로그인 정보 저장 (비밀번호 제외)
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
	 * 현재 로그인한 사용자 가져오기
	 */
	getCurrentUser: function() {
		const user = localStorage.getItem(this.CURRENT_USER_KEY);
		return user ? JSON.parse(user) : null;
	},

	/**
	 * 로그아웃
	 */
	logout: function() {
		localStorage.removeItem(this.CURRENT_USER_KEY);
	},

	/**
	 * 로그인 상태 확인
	 */
	isLoggedIn: function() {
		return this.getCurrentUser() !== null;
	}
};

// 로그인 페이지 기능
if (document.getElementById('loginForm')) {
	const loginForm = document.getElementById('loginForm');
	const loginError = document.getElementById('loginError');
	const loginErrorText = document.getElementById('loginErrorText');
	const passwordToggle = document.getElementById('passwordToggle');
	const loginPassword = document.getElementById('loginPassword');

	// 비밀번호 보기/숨기기
	if (passwordToggle) {
		passwordToggle.addEventListener('click', function() {
			const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
			loginPassword.setAttribute('type', type);
			
			const icon = this.querySelector('i');
			icon.classList.toggle('bi-eye');
			icon.classList.toggle('bi-eye-slash');
		});
	}

	// 로그인 폼 제출
	loginForm.addEventListener('submit', function(e) {
		e.preventDefault();

		// 에러 메시지 숨기기
		loginError.style.display = 'none';

		const formData = new FormData(loginForm);
		const id = formData.get('id').trim();
		const password = formData.get('password');

		// 유효성 검사
		if (!id || !password) {
			showLoginError('아이디와 비밀번호를 입력해주세요.');
			return;
		}

		try {
			// 로그인 시도
			const user = UserStorage.login(id, password);
			
			// 로그인 성공
			console.log('로그인 성공:', user);
			
			// 메인 페이지로 이동
			window.location.href = 'index.html';
		} catch (error) {
			showLoginError(error.message);
		}
	});

	function showLoginError(message) {
		loginErrorText.textContent = message;
		loginError.style.display = 'block';
	}
}

// 회원가입 페이지 기능
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

	// 비밀번호 보기/숨기기
	if (signupPasswordToggle) {
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

	// 비밀번호 확인 실시간 검증
	if (signupPasswordConfirm) {
		signupPasswordConfirm.addEventListener('input', function() {
			if (this.value && signupPassword.value !== this.value) {
				this.setCustomValidity('비밀번호가 일치하지 않습니다.');
			} else {
				this.setCustomValidity('');
			}
		});
	}

	// 휴대폰 번호 자동 포맷팅
	const signupPhone = document.getElementById('signupPhone');
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

	// 회원가입 폼 제출
	signupForm.addEventListener('submit', function(e) {
		e.preventDefault();

		// 에러/성공 메시지 숨기기
		signupError.style.display = 'none';
		signupSuccess.style.display = 'none';

		const formData = new FormData(signupForm);
		const name = formData.get('name').trim();
		const id = formData.get('id').trim();
		const password = formData.get('password');
		const passwordConfirm = formData.get('passwordConfirm');
		const gender = formData.get('gender');
		const phone = formData.get('phone').trim();

		// 유효성 검사
		if (!name || !id || !password || !passwordConfirm || !gender || !phone) {
			showSignupError('모든 필드를 입력해주세요.');
			return;
		}

		if (id.length < 4) {
			showSignupError('아이디는 4자 이상 입력해주세요.');
			return;
		}

		if (password.length < 6) {
			showSignupError('비밀번호는 6자 이상 입력해주세요.');
			return;
		}

		if (password !== passwordConfirm) {
			showSignupError('비밀번호가 일치하지 않습니다.');
			return;
		}

		if (!/^010-\d{4}-\d{4}$/.test(phone)) {
			showSignupError('휴대폰 번호 형식이 올바르지 않습니다. (010-1234-5678)');
			return;
		}

		try {
			// 회원가입 처리
			const userData = {
				name,
				id,
				password,
				gender,
				phone
			};

			UserStorage.addUser(userData);
			
			// 성공 메시지 표시
			signupSuccessText.textContent = '회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.';
			signupSuccess.style.display = 'block';

			// 2초 후 로그인 페이지로 이동
			setTimeout(() => {
				window.location.href = 'login.html';
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

// 로그인 체크 함수 (다른 페이지에서 사용)
function checkAuth() {
	if (!UserStorage.isLoggedIn()) {
		window.location.href = 'login.html';
		return false;
	}
	return true;
}

// 로그아웃 함수
function logout() {
	if (confirm('로그아웃 하시겠습니까?')) {
		UserStorage.logout();
		window.location.href = 'login.html';
	}
}

// 전역으로 사용 가능하도록 설정
window.UserStorage = UserStorage;
window.checkAuth = checkAuth;
window.logout = logout;

