const menuButton = document.querySelector('#menu-toggle')
const menuList = document.querySelector('.menu')
const name = document.querySelector('#name')
const phone = document.querySelector('#phone')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const submit = document.querySelector('.submit')
const msgStatus = document.querySelector('.msg-status')

console.log(document.location.search)

const mailFunction = () => {
	if (document.location.search === '?mail_status=sent') {
		msgStatus.classList.add('success')
		msgStatus.textContent = 'Wiadomość wysłana!'

		setTimeout(() => {
			msgStatus.classList.remove('success')
			msgStatus.textContent = ''
		}, 3000)
	} else if (document.location.search === '?mail_status=error') {
		msgStatus.classList.add('error-php')
		msgStatus.textContent = 'Wystąpił błąd'

		setTimeout(() => {
			msgStatus.classList.remove('error-php')
			msgStatus.textContent = ''
		}, 3000)
	}
}

const closeMenu = () => {
	menuButton.checked = false
}

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}
const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}
const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}
const checkLength = (input, min) => {
	if (input.value.length < min && input === name) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} jest za krótkie`)
	} else if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} jest za krótka`)
	}
}
const checkEmail = email => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'E-mail jest niepoprawny przykład: example@example.com')
	}
}

const checkPhone = phone => {
	const re = /\b(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}\b/
	if (re.test(phone.value)) {
		clearError(phone)
	} else {
		showError(phone, 'Numer jest niepoprawny')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		mailFunction()
	}
}
submit.addEventListener('click', e => {
	e.preventDefault()

	checkForm([name, phone, email])
	checkEmail(email)
	checkLength(name, 3)
	checkLength(message, 5)
	checkPhone(phone)
	checkErrors()
})

menuList.addEventListener('click', closeMenu)
