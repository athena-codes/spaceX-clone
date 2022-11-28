const btn = document.getElementById('menu-btn')
const shop = document.getElementById('shop-btn')
const overlay = document.getElementById('overlay')
const menu = document.getElementById('sidebar-nav')
const counters = document.querySelectorAll('.counter')
const header = document.getElementById('main-header')
const falconImg = document.getElementById('bg-img-overview')
let scrollStarted = false

btn.addEventListener('click', navToggle)
document.addEventListener('scroll', scrollPage)

const prevScrollpos = window.pageYOffset
window.onscroll = function () {
  const currentScrollPos = window.pageYOffset
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('main-header').style.top = '0'
  } else {
    document.getElementById('main-header').style.top = '-80px'
  }
  prevScrollpos = currentScrollPos
}

window.onscroll = function () {
  const currentScrollPos = window.pageYOffset
  if (prevScrollpos < currentScrollPos) {
    document.getElementById('main-header').style.top = '-80px'
  } else {
    document.getElementById('main-header').style.top = '0px'
  }
  prevScrollpos = currentScrollPos
}


function navToggle () {
  btn.classList.toggle('open')
  shop.classList.toggle('open-shop')
  overlay.classList.toggle('overlay-show')
  document.body.classList.toggle('stop-scroll')
  menu.classList.toggle('show-menu')
}

function scrollPage () {
  const scrollPositon = window.scrollY

  if (scrollPositon > 100 && !scrollStarted) {
    countUp()
    scrollStarted = true
  } else if (scrollPositon < 100 && scrollStarted) {
    resetCount()
    scrollStarted = false
  }
}

function countUp () {
  counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
      // get count target
      const dataTarget = Number(counter.getAttribute('data-target'))
      // get current counter value
      const curr = Number(counter.innerText)
      // create increment
      const increment = dataTarget / 100
      // if counter is les than target, increment
      if (curr < dataTarget) {
        // round up and set counter value
        counter.innerText = `${Math.ceil(curr + increment)}`

        setTimeout(updateCounter, 20)
      } else {
        counter.innerText = dataTarget
      }
    }
    updateCounter()
  })
}

function resetCount () {
  counters.forEach(counter => (counter.innerHTML = '0'))
}

let slideIndex = 1
showSlides(slideIndex)

// next/previous controls
function plusSlides (n) {
  showSlides((slideIndex += n))
}

// thumbnail image controls
function currentSlide (n) {
  showSlides((slideIndex = n))
}

function showSlides (n) {
  let i
  let slides = document.getElementsByClassName('mySlides')
  let dots = document.getElementsByClassName('dot')
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '')
  }
  slides[slideIndex - 1].style.display = 'block'
  dots[slideIndex - 1].className += ' active'
}
