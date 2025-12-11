/**
 * dev-nav.js
 * 개발용 네비게이션 사이드바 기능
 */

const DevNav = {
	// 페이지 맵 정의
	pages: {
		main: [
			{ title: '메인', url: '../index.html', icon: 'bi-house' }
		],
		account: [
			{ title: '가계부 목록', url: 'account/list.html', icon: 'bi-list-ul' },
			{ title: '내역 추가', url: 'account/form.html', icon: 'bi-plus-circle' },
			{ title: '통계', url: 'account/stats.html', icon: 'bi-bar-chart' }
		],
		board: [
			{ title: '게시판 목록', url: 'board/list.html', icon: 'bi-table' },
			{ title: '게시글 작성', url: 'board/form.html', icon: 'bi-pencil' }
		]
	},

	/**
	 * 초기화
	 */
	init: function() {
		this.createSidebar();
		this.createToggleButton();
		this.loadState();
		this.updateActivePage();
	},

	/**
	 * 현재 페이지 경로 분석
	 */
	getCurrentPath: function() {
		const path = window.location.pathname;
		const pathParts = path.split('/').filter(p => p);
		
		// index.html
		if (path.endsWith('index.html') || path.endsWith('/')) {
			return { section: 'main', page: 'index.html' };
		}
		
		// account 폴더
		if (pathParts.includes('account')) {
			const page = pathParts[pathParts.length - 1];
			return { section: 'account', page: page };
		}
		
		// board 폴더
		if (pathParts.includes('board')) {
			const page = pathParts[pathParts.length - 1];
			return { section: 'board', page: page };
		}
		
		return { section: 'main', page: 'index.html' };
	},

	/**
	 * 상대 경로 계산 (현재 파일 위치 기준)
	 */
	getRelativePath: function(targetUrl) {
		const currentPath = window.location.pathname;
		const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
		const pathParts = currentPath.split('/').filter(p => p && !p.endsWith('.html'));
		
		// targetUrl이 이미 상대 경로로 시작하는 경우 그대로 반환
		if (targetUrl.startsWith('../')) {
			return targetUrl;
		}
		
		// account 폴더에 있는 경우
		if (pathParts.includes('account')) {
			return '../' + targetUrl;
		}
		
		// board 폴더에 있는 경우
		if (pathParts.includes('board')) {
			return '../' + targetUrl;
		}
		
		// 루트에 있는 경우
		return targetUrl;
	},

	/**
	 * 사이드바 생성
	 */
	createSidebar: function() {
		const sidebar = document.createElement('div');
		sidebar.className = 'dev-nav-sidebar';
		sidebar.id = 'devNavSidebar';
		
		const currentPath = this.getCurrentPath();
		
		sidebar.innerHTML = `
			<div class="dev-nav-header">
				<h4>🚀 개발 네비게이션</h4>
				<small>화면 간 빠른 이동</small>
			</div>
			<div class="dev-nav-menu">
				<div class="dev-nav-section">
					<div class="dev-nav-section-title">메인</div>
					${this.pages.main.map(item => {
						const url = this.getRelativePath(item.url);
						const isCurrent = currentPath.section === 'main';
						return `<a href="${url}" class="dev-nav-item ${isCurrent ? 'current' : ''}">
							<i class="bi ${item.icon}"></i>${item.title}
						</a>`;
					}).join('')}
				</div>
				
				<div class="dev-nav-divider"></div>
				
				<div class="dev-nav-section">
					<div class="dev-nav-section-title">가계부 (Account)</div>
					${this.pages.account.map(item => {
						const url = this.getRelativePath(item.url);
						const isCurrent = currentPath.section === 'account' && currentPath.page === item.url.split('/').pop();
						return `<a href="${url}" class="dev-nav-item ${isCurrent ? 'current' : ''}">
							<i class="bi ${item.icon}"></i>${item.title}
						</a>`;
					}).join('')}
				</div>
				
				<div class="dev-nav-divider"></div>
				
				<div class="dev-nav-section">
					<div class="dev-nav-section-title">게시판 (Board)</div>
					${this.pages.board.map(item => {
						const url = this.getRelativePath(item.url);
						const isCurrent = currentPath.section === 'board' && currentPath.page === item.url.split('/').pop();
						return `<a href="${url}" class="dev-nav-item ${isCurrent ? 'current' : ''}">
							<i class="bi ${item.icon}"></i>${item.title}
						</a>`;
					}).join('')}
				</div>
			</div>
		`;
		
		document.body.appendChild(sidebar);
	},

	/**
	 * 토글 버튼 생성
	 */
	createToggleButton: function() {
		const button = document.createElement('button');
		button.className = 'dev-mode-toggle';
		button.id = 'devModeToggle';
		button.innerHTML = '🔧 개발모드';
		button.onclick = () => this.toggle();
		
		document.body.appendChild(button);
	},

	/**
	 * 사이드바 토글
	 */
	toggle: function() {
		const sidebar = document.getElementById('devNavSidebar');
		const toggle = document.getElementById('devModeToggle');
		
		const isActive = sidebar.classList.contains('active');
		
		if (isActive) {
			sidebar.classList.remove('active');
			toggle.classList.remove('active');
			toggle.innerHTML = '🔧 개발모드';
		} else {
			sidebar.classList.add('active');
			toggle.classList.add('active');
			toggle.innerHTML = '✓ 활성';
		}
		
		// 상태 저장
		this.saveState(!isActive);
	},

	/**
	 * 상태 저장 (localStorage)
	 */
	saveState: function(isActive) {
		localStorage.setItem('devNavActive', isActive ? 'true' : 'false');
	},

	/**
	 * 상태 로드 (localStorage)
	 */
	loadState: function() {
		const saved = localStorage.getItem('devNavActive');
		if (saved === 'true') {
			const sidebar = document.getElementById('devNavSidebar');
			const toggle = document.getElementById('devModeToggle');
			
			sidebar.classList.add('active');
			toggle.classList.add('active');
			toggle.innerHTML = '✓ 활성';
		}
	},

	/**
	 * 현재 페이지 업데이트
	 */
	updateActivePage: function() {
		const currentPath = this.getCurrentPath();
		const items = document.querySelectorAll('.dev-nav-item');
		
		items.forEach(item => {
			item.classList.remove('current');
		});
	}
};

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function() {
	DevNav.init();
});

