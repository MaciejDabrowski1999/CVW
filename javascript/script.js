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
	const testPhone = /[0-9]{9}/
	if (
		inputName.value.trim() !== '' &&
		inputEmail.value.trim() !== '' &&
		testEmail.test(inputEmail.value) &&
		inputPhone.value.trim() !== '' &&
		inputPhone.value.trim() !== '' &&
		testPhone.test(inputPhone.value) === true
	) {
		divErrorName.textContent = ''
		divErrorEmail.textContent = ''
		divErrorPhone.textContent = ''
		console.log('wszystko ok')
		return false
	} else if (inputName.value === '' && inputEmail.value.trim() === '' && inputPhone.value.trim() === '') {
		divErrorName.textContent = 'Proszę wypełnić pola formularza.'
		divErrorEmail.textContent = 'Proszę wypełnić pola formularza.'
		divErrorPhone.textContent = 'Proszę wypełnić pola formularza.'
	}
	if (inputName.value.trim() === '') {
		divErrorName.textContent = 'Wpisz swoje Imię'
	}
	if (inputEmail.value.trim() === '' || testEmail.test(inputEmail.value) === false) {
		divErrorEmail.textContent = 'Proszę wpisać poprawny email'
	} else {
		divErrorEmail.textContent = ''
	}
	if (inputPhone.value.trim() === '') {
		divErrorPhone.textContent = 'Proszę wpisać 9 cyfrowy numer'
	} else if (inputPhone.value.trim() !== '' && testPhone.test(inputPhone.value) === false) {
		divErrorPhone.textContent = 'Niepoprawny numer.'
	} else {
		divErrorPhone.textContent = ''
	}
}

submit.addEventListener('click', validateForm)
menuList.addEventListener('click', closeMenu)
formMessage.addEventListener('click', e => {
	e.preventDefault()
})
