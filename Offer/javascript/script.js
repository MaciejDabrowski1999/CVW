const menuButton = document.querySelector('#menu-toggle')
const menuList = document.querySelector('.menu')

const closeMenu = () => {
	menuButton.checked = false
}

menuList.addEventListener('click', closeMenu)
