const menuButton = document.querySelector('#menu-toggle')
const menuList = document.querySelector('.menu')
const name = document.querySelector('#name')
const phone = document.querySelector('#phone')
const email = document.querySelector('#email')
const message = document.querySelector('#message')
const submit = document.querySelector('.submit')
const msgStatus = document.querySelector('.msg-status')

const offerInput = document.querySelectorAll('.offer-content-box input')
const offerButton = document.querySelectorAll('.offer-content-box button')
const offerLabel = document.querySelectorAll('.offer-content-box label')
const chosenOffer = document.querySelector('.form-offer-checked')

const addToMsg = el => {
	let offerText = el.parentNode.childNodes[1].childNodes[1].innerText
	let shortOffer = offerText.slice(17)
	console.log(shortOffer)
	let chosenText = chosenOffer.innerHTML
	if (el.checked === true && !chosenText.includes(shortOffer)) {
		chosenOffer.innerHTML = `${chosenText} <br></br> ${offerText}`
	}

}
const removeFromMsg = (el) => {
	let offerText = el.parentNode.childNodes[1].childNodes[1].innerText
	let shortOffer = offerText.slice(17)
	console.log(shortOffer)
	let chosenText = chosenOffer.innerHTML
	if (el.checked === false && chosenText.includes(shortOffer)) {
		chosenText.replace(`Strona Wizytówka ${shortOffer}`, '')
	}
}

const clickOffer = () => {
	//on click you change state offerinput form checked to unchecked
	//and from unchecked to checked
	//funcion change button color and text if inputoffer was checked

	offerInput.forEach(el => {
		if (el.checked === true) {
			el.nextElementSibling.textContent = 'Wybrano'
			el.nextElementSibling.style.backgroundColor = '#2ca9e5'
			addToMsg(el)
		} else {
			el.nextElementSibling.textContent = 'Wybieram'
			el.nextElementSibling.style.backgroundColor = '#1360a4'
			removeFromMsg(el)
		}
	})
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
	} else if (input.value.length < min && input === message) {
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
	console.log(errorCount)
	if (errorCount === 0) {
		mailFunction()
	}
}
submit.addEventListener('click', e => {
	e.preventDefault()

	checkForm([name, phone, email, message])
	checkEmail(email)
	checkLength(name, 3)
	checkLength(message, 5)
	checkPhone(phone)
	checkErrors()
})

menuList.addEventListener('click', closeMenu)
offerButton.forEach(el => {
	el.addEventListener('click', el => {
		if (el.target.previousElementSibling.checked === true) {
			el.target.previousElementSibling.checked = false
		} else {
			el.target.previousElementSibling.checked = true
		}
		clickOffer()
	})
})
offerLabel.forEach(el => {
	el.addEventListener('click', () => {
		setTimeout(() => {
			clickOffer()
		}, 50)
	})
})
