const hamburgerBnt = document.querySelector('.home div .button')
const lines = document.querySelectorAll('.line')
const menuList = document.querySelector('.menu .list')
const portfolioItems = document.querySelectorAll('.portfolio .list .item')
const portfolioTumbnail = document.querySelectorAll('.portfolio .list .item .thumbnail')
const portfolioNextBnt = document.querySelector('.next-button')
const portfolioPrevBnt = document.querySelector('.prev-button')
const inputName = document.querySelector('.input-name')
const inputPhone = document.querySelector('.input-phone')
const inputEmail = document.querySelector('.input-email')
const message = document.querySelector('.message')
const submit = document.querySelector('.form-contact .button')

let media = window.matchMedia('(min-width:650px)')
let mql = window.matchMedia('(min-width: 768px)')
let mqlmin = window.matchMedia('(max-width: 768px)')
let numSlide = 0
let thumbnailSlide = [
	'/assets/CV/thumbnail-currency-excange.jpg',
	'/assets/CV/thumbnail-Ai-4-sectors.jpg',
	'/assets/CV/thumbnail-company-website.jpg',
	'/assets/CV/thumbnail-to-do-app.jpg',
]

const activeFunction = () => {
	portfolioSliderStart()
	sliderPic()
	menuList.addEventListener('click', menuHide)
	hamburgerBnt.addEventListener('click', showMenu)
	portfolioNextBnt.addEventListener('click', nextPortfolio)
	portfolioPrevBnt.addEventListener('click', prevPortfolio)
	showMenuDesktop()
	submit.addEventListener('click', validateForm)
	media.addListener(mediaQuery)
}

const showMenu = () => {
	if (hamburgerBnt.checked) {
		menuList.style.left = '0'
		lines[1].style.top = '20px'
		lines[2].style.top = '20px'
		lines[1].classList.toggle('line1')
		lines[0].classList.toggle('line2')
		lines[2].classList.toggle('line3')
	} else {
		menuList.style.left = '-100%'
		lines[1].style.top = '22px'
		lines[2].style.top = '40px'
		lines[1].classList.toggle('line1')
		lines[0].classList.toggle('line2')
		lines[2].classList.toggle('line3')
	}
}
const showMenuDesktop = () => {
	mql.onchange = e => {
		if (e.matches) {
			menuList.style.left = '0'
		} else {
			menuList.style.left = '-100%'
		}
	}
}
const mediaQuery = () => {
	//animation for menu
	if (media.matches === false && lines[0].classList.contains('line1')) {
		lines[1].classList.toggle('line1')
		lines[0].classList.toggle('line2')
		lines[2].classList.toggle('line3')
		menuList.style.left = '-100%'
		hamburgerBnt.checked = false
	} else if (media.matches) {
		lines[1].classList.remove('line1')
		lines[0].classList.remove('line2')
		lines[2].classList.remove('line3')
	}
}

const menuHide = () => {
	if (media.matches === false) {
		menuList.style.left = '-100%'
		hamburgerBnt.checked = false
		lines[1].style.top = '22px'
		lines[2].style.top = '40px'
		lines[1].classList.toggle('line1')
		lines[0].classList.toggle('line2')
		lines[2].classList.toggle('line3')
	} else {
		menuList.style.left = '0'
	}
}

const sliderPic = () => {
	portfolioTumbnail.forEach((el, index) => {
		el.style.backgroundImage = `url(${thumbnailSlide[index]})`
		el.style.backgroundSize = 'contain'
		el.style.backgroundRepeat = 'no-repeat'
	})
}

const portfolioSliderStart = () => {
	portfolioItems[numSlide].style.width = '100%'
	portfolioItems[numSlide].style.height = '100%'
	portfolioItems[numSlide].style.fontSize = '16px'
}

const portfolioItemSlider = number => {
	portfolioItems.forEach((slide, index) => {
		if (index != number) {
			slide.style.width = '15%'
			slide.style.height = '15%'
			slide.style.margin = '0px'
			slide.style.fontSize = '0px'
		} else {
			slide.style.width = '100%'
			slide.style.height = '100%'
			slide.style.margin = '20px'
			slide.style.fontSize = '16px'
		}
	})
}
const portfolioSlider = number => {
	if (number <= portfolioItems.length - 1) {
		portfolioItemSlider(number)
	} else if (number >= portfolioItems.length - 1) {
		numSlide = 0
		portfolioItemSlider(numSlide)
	} else if (number <= 0) {
		numSlide = portfolioItems.length - 1
		portfolioItemSlider(numSlide)
	}
}

const nextPortfolio = () => {
	numSlide++
	portfolioSlider(numSlide)
}
const prevPortfolio = () => {
	if (numSlide === 0) {
		numSlide = portfolioItems.length
	}
	numSlide--
	portfolioSlider(numSlide)
}

function validateForm() {
	if (inputName.value.trim() === '' || inputEmail.value.trim() === '' || message.value.trim() === '') {
		inputName.classList.toggle('input-error')
		inputEmail.classList.toggle('input-error')
		message.classList.toggle('input-error')
		alert('Proszę wypełnić wszystkie pola formularza.')
		setTimeout(() => {
			inputName.classList.toggle('input-error')
			inputEmail.classList.toggle('input-error')
			message.classList.toggle('input-error')
		}, 3000)
		return false
	}
	if (inputPhone.value.trim() !== '' && !/^\d{9}$/.test(inputPhone.value)) {
		alert('Proszę wprowadzić numer telefonu składający się z 9 cyfr.')
		inputPhone.classList.toggle('input-error')
		setTimeout(() => {
			inputPhone.classList.toggle('input-error')
		}, 3000)
		return false
	}
	if (!/\S+@\S+\.\S+/.test(inputEmail.value)) {
		inputEmail.classList.toggle('input-error')
		alert('Proszę wprowadzić poprawny adres email.')
		setTimeout(() => {
			inputEmail.classList.toggle('input-error')
		}, 3000)
		return false
	}
	return true
}
$(document).ready(function () {
	$('form').submit(function (event) {
		event.preventDefault() // Zapobiega domyślnemu zachowaniu przycisku submit (przeładowanie strony)

		var formData = $(this).serialize() // Pobierz dane z formularza

		$.ajax({
			url: 'formcontact.php', // Adres URL pliku PHP obsługującego przetwarzanie formularza
			type: 'POST',
			data: formData,
			success: function (response) {
				// Tutaj możesz obsłużyć odpowiedź z serwera, np. wyświetlić komunikat potwierdzający

				// Przykład: wyświetlenie komunikatu potwierdzającego
				alert('Formularz został przesłany.')

				// Możesz również wyczyścić pola formularza po pomyślnym przesłaniu danych
				$('form')[0].reset()
			},
			error: function (xhr, status, error) {
				// Obsłuż błędy żądania, jeśli wystąpią
				console.log(xhr.responseText)
			},
		})
	})
})

document.addEventListener('DOMContentLoaded', activeFunction)
