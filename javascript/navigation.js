// Handle navbar function
function setupNavbarToggle() {
	const burger = document.getElementById('open-navbar');
	const navbar = document.getElementById('navbar-section');
	const navbars = Array.from(document.querySelectorAll('.overlay-navbar'));
	const getInTouch = document.querySelector('.getintouch-button');
	const callNow = document.querySelector('.btn-call-now');
	const header = document.getElementById('main-header');

	function clearAllStates() {
		navbars.forEach(nav => {
			nav.classList.remove('active', 'inner-active');
		});
	}

	function toggleButtons(disable) {
		const action = disable ? 'add' : 'remove';
		[getInTouch, callNow].forEach(btn => {
			if (btn) {
				btn.classList[action]('disabled-opacity');
				btn.style.pointerEvents = disable ? 'none' : 'auto';
			}
		});
	}

	burger.addEventListener('click', () => {
		const isOpen = burger.classList.contains('close-nav-btn');

		if (isOpen) {
			burger.classList.remove('close-nav-btn');
			navbar.classList.remove('fade-in');
			navbar.classList.add('fade-out');
			header?.classList.remove('no-shadow');

			navbar.addEventListener('animationend', function handleAnimation() {
				navbar.classList.add('hidden');
				toggleButtons(false); 
				navbar.removeEventListener('animationend', handleAnimation);
			});
		} else {
			navbar.classList.remove('hidden');
			navbar.classList.remove('fade-out');
			navbar.classList.add('fade-in');

			clearAllStates();
			navbars[0]?.classList.add('active');

			burger.classList.add('close-nav-btn');
			toggleButtons(true);
			header?.classList.add('no-shadow');
		}
	});
}

// Nav bar scolling control function
document.addEventListener('DOMContentLoaded', () => {
	setupNavbarToggle();
	const navbars = Array.from(document.querySelectorAll('.overlay-navbar'));
	const navStack = [];
	navbars[0]?.classList.add('active');
	navbars.forEach((navbar, index) => {
		const navItems = navbar.querySelectorAll('.nav-menu-item');
		navItems.forEach(item => {
			const isDropdown = item.classList.contains('dropdown-item');
			const isBack = item.classList.contains('previous-nav');
			if (isDropdown) {
				item.addEventListener('click', () => {
					const targetIndex = parseInt(item.dataset.targetIndex);
					const nextNavbar = navbars[targetIndex];
					if (!isNaN(targetIndex) && nextNavbar) {
						navStack.push(index);
						navbar.classList.remove('active');
						navbar.classList.add('inner-active');
						nextNavbar.classList.remove('inner-active');
						nextNavbar.classList.add('active');
					}
				});
			}
			if (isBack) {
				item.addEventListener('click', () => {
					const previousIndex = navStack.pop();
					navbars.forEach(nav => {
						nav.classList.remove('inner-active', 'active');
					});
					if (typeof previousIndex === 'number') {
						navbars[previousIndex].classList.add('active');
						if (previousIndex > 0) {
							navbars[previousIndex - 1].classList.add('inner-active');
						}
					} else {
						navbars[0]?.classList.add('active');
					}
				});
			}
			// if (!isDropdown && !isBack) {
			// 	item.addEventListener('click', () => {
			// 		navbars.forEach(nav => {
			// 			nav.classList.remove('active', 'inner-active');
			// 		});
			// 		navbar.classList.add('active');
			// 	});
			// }
		});
	});
});