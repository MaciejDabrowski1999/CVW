const formMessage = document.querySelector('.form form')
const menuButton = document.querySelector('#menu-toggle')
const menuList = document.querySelector('.menu')
const inputName = document.querySelector('#name')
const inputPhone = document.querySelector('#telephone')
const inputEmail = document.querySelector('#email')
const message = document.querySelector('#message')
const submit = document.querySelector('.send')
const divErrorName = document.querySelector('.error-form-name')
const divErrorPhone = document.querySelector('.error-form-phone')
const divErrorEmail = document.querySelector('.error-form-mail')

const closeMenu = () => {
	menuButton.checked = false
}
function validateForm() {
	const testEmail =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	if (inputName.value.trim() !== '' && inputEmail.value.trim() !== '' && testEmail.test(inputEmail.value)) {
		divErrorName.textContent = ''
		divErrorEmail.textContent = ''
		console.log('wszystko ok')
		return false
	} else if (inputName.value === '') {
		divErrorName.textContent = 'Proszę wypełnić pola formularza.'
	} else if (inputEmail.value.trim() === '' || testEmail.test(inputEmail.value) === false) {
		divErrorName.textContent = ''
		divErrorEmail.textContent = 'Proszę wpisać poprawny email'
	}
	if (inputPhone.value.trim() !== '' && !/^\d{9}$/.test(inputPhone.value)) {
		divErrorPhone.textContent = 'Niepoprawny numer.'
		return false
	}
}

submit.addEventListener('click', validateForm)
menuList.addEventListener('click', closeMenu)
formMessage.addEventListener('click', e => {
	e.preventDefault()
})
