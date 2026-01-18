/**
 * dev-nav.js
 * 媛쒕컻???ㅻ퉬寃뚯씠???ъ씠?쒕컮 湲곕뒫
 */

const DevNav = {
	// ?섏씠吏 留??뺤쓽
	pages: {
		main: [
			{ title: '硫붿씤', url: 'index.html', icon: 'bi-house' }
		],
		account: [
			{ title: '媛怨꾨? 紐⑸줉', url: 'pages/account/list.html', icon: 'bi-list-ul' },
			{ title: '?댁뿭 異붽?', url: 'pages/account/form.html', icon: 'bi-plus-circle' },
			{ title: '?듦퀎', url: 'pages/account/stats.html', icon: 'bi-bar-chart' }
		],
		board: [
			{ title: '寃뚯떆??紐⑸줉', url: 'pages/board/list.html', icon: 'bi-table' },
			{ title: '寃뚯떆湲 ?묒꽦', url: 'pages/board/form.html', icon: 'bi-pencil' }
		]
	},

	/**
	 * 珥덇린??	 */
	init: function() {
		this.createSidebar();
		this.createToggleButton();
		this.loadState();
		this.updateActivePage();
	},

	/**
	 * ?꾩옱 ?섏씠吏 寃쎈줈 遺꾩꽍
	 */
	getCurrentPath: function() {
		const path = window.location.pathname;
		const pathParts = path.split('/').filter(p => p);
		
		// index.html
		if (path.endsWith('index.html') || path.endsWith('/')) {
			return { section: 'main', page: 'index.html' };
		}
		
		// account ?대뜑
		if (pathParts.includes('account')) {
			const page = pathParts[pathParts.length - 1];
			return { section: 'account', page: page };
		}
		
		// board ?대뜑
		if (pathParts.includes('board')) {
			const page = pathParts[pathParts.length - 1];
			return { section: 'board', page: page };
		}
		
		return { section: 'main', page: 'index.html' };
	},

	/**
	 * 寃쎈줈 怨꾩궛 (frontend 湲곗?)
	 */
	getRelativePath: function(targetUrl) {
		const path = window.location.pathname;
		const parts = path.split('/').filter(p => p !== '');
		const frontendIndex = parts.lastIndexOf('frontend');
		const basePath = frontendIndex !== -1
			? '/' + parts.slice(0, frontendIndex + 1).join('/') + '/'
			: path.substring(0, path.lastIndexOf('/') + 1);
		const origin = window.location.origin === 'null'
			? `${window.location.protocol}//`
			: window.location.origin;
		return new URL(targetUrl, `${origin}${basePath}`).href;
	},

	/**
	 * ?ъ씠?쒕컮 ?앹꽦
	 */
	createSidebar: function() {
		const sidebar = document.createElement('div');
		sidebar.className = 'dev-nav-sidebar';
		sidebar.id = 'devNavSidebar';
		
		const currentPath = this.getCurrentPath();
		
		sidebar.innerHTML = `
			<div class="dev-nav-header">
				<h4>?? 媛쒕컻 ?ㅻ퉬寃뚯씠??/h4>
				<small>?붾㈃ 媛?鍮좊Ⅸ ?대룞</small>
			</div>
			<div class="dev-nav-menu">
				<div class="dev-nav-section">
					<div class="dev-nav-section-title">硫붿씤</div>
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
					<div class="dev-nav-section-title">媛怨꾨? (Account)</div>
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
					<div class="dev-nav-section-title">寃뚯떆??(Board)</div>
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
	 * ?좉? 踰꾪듉 ?앹꽦
	 */
	createToggleButton: function() {
		const button = document.createElement('button');
		button.className = 'dev-mode-toggle';
		button.id = 'devModeToggle';
		button.innerHTML = '?뵩 媛쒕컻紐⑤뱶';
		button.onclick = () => this.toggle();
		
		document.body.appendChild(button);
	},

	/**
	 * ?ъ씠?쒕컮 ?좉?
	 */
	toggle: function() {
		const sidebar = document.getElementById('devNavSidebar');
		const toggle = document.getElementById('devModeToggle');
		
		const isActive = sidebar.classList.contains('active');
		
		if (isActive) {
			sidebar.classList.remove('active');
			toggle.classList.remove('active');
			toggle.innerHTML = '?뵩 媛쒕컻紐⑤뱶';
		} else {
			sidebar.classList.add('active');
			toggle.classList.add('active');
			toggle.innerHTML = '???쒖꽦';
		}
		
		// ?곹깭 ???		this.saveState(!isActive);
	},

	/**
	 * ?곹깭 ???(localStorage)
	 */
	saveState: function(isActive) {
		localStorage.setItem('devNavActive', isActive ? 'true' : 'false');
	},

	/**
	 * ?곹깭 濡쒕뱶 (localStorage)
	 */
	loadState: function() {
		const saved = localStorage.getItem('devNavActive');
		if (saved === 'true') {
			const sidebar = document.getElementById('devNavSidebar');
			const toggle = document.getElementById('devModeToggle');
			
			sidebar.classList.add('active');
			toggle.classList.add('active');
			toggle.innerHTML = '???쒖꽦';
		}
	},

	/**
	 * ?꾩옱 ?섏씠吏 ?낅뜲?댄듃
	 */
	updateActivePage: function() {
		const currentPath = this.getCurrentPath();
		const items = document.querySelectorAll('.dev-nav-item');
		
		items.forEach(item => {
			item.classList.remove('current');
		});
	}
};

// DOM 濡쒕뱶 ??珥덇린??document.addEventListener('DOMContentLoaded', function() {
	DevNav.init();
});

