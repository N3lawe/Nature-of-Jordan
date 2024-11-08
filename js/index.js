let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll down
    header.style.top = "-100px"; 
  } else {
    // Scroll up
    header.style.top = "0"; 
  }

  
 if (scrollTop > 0) {
    header.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; 
    header.style.width = "calc(100% - 60px)"; 
    header.style.left = "30px"; 
    header.style.right = "30px"; 
    header.classList.add('scrolled');
  } else {
    header.style.backgroundColor = "transparent";
    header.style.width = "100%";
    header.style.left = "0";
    header.style.right = "0"; 
    header.classList.remove('scrolled'); 
  }


  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});


// Scroll Back To Top Button
let span=document.querySelector(".up");

window.onscroll = function (){
    if (this.scrollY >= 1000) {
        span.classList.add("show");
    }else {
        span.classList.remove("show");
    }
};

span.onclick =function () {
    window.scrollTo({
        top:0 ,
        behavior:"smooth",
    });
};

/////////////////////////////////////////////////  Homm Animation
document.addEventListener('DOMContentLoaded', function () {
  const homeLink = document.querySelector('a[href="#Home"]');
  const textElement = document.querySelector('.landing .text');

  
  window.addEventListener('load', function () {
    setTimeout(function () {
      textElement.classList.add('active');
    }, 500); 
  });

  homeLink.addEventListener('click', function (event) {
    event.preventDefault();

    textElement.classList.remove('active');

  
    setTimeout(function () {
      
      textElement.classList.add('active'); 
    }, 500); 

    
    document.querySelector('#Home').scrollIntoView({ behavior: 'smooth' });
  });

 
  window.addEventListener('scroll', function () {
    const sectionTop = document.querySelector('#Home').getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight && !textElement.classList.contains('active')) {
      setTimeout(function () {
        textElement.classList.add('active'); 
      }, 500); 
    } else if (sectionTop >= windowHeight) {
      textElement.classList.remove('active'); 
    }
  });
});


///////////////////////////////////////////////////////

anime.timeline({loop: true})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.ml15',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


  //////////////////////////////////////////////////////

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav ul li a");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show-menu");
  });
}

document.addEventListener("click", function (e) {
  if (
    (!navMenu.contains(e.target) && !navToggle.contains(e.target)) || 
    Array.from(navLinks).some(link => link.contains(e.target)) 
  ) {
    navMenu.classList.remove("show-menu");
  }
});


////////////////////////////////////////////////////

const progressBar = document.querySelector('.progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset; 
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight; 
  const scrollPercent = (scrollTop / windowHeight) * 100; 

  progressBar.style.width = `${scrollPercent}%`; 
}, false);


/////////////////////////////////////////////////

function openMap() {
  const map = document.getElementById('map');
  map.style.display = 'block';
}


////////////////////////////////////////////////////

document.querySelectorAll('.srv-box').forEach(box => {
  const textElement = box.querySelector('.text1, .text2, .text3, .text4'); 
  
  if (textElement) {
      const backgroundImage = window.getComputedStyle(textElement).backgroundImage;
      const imageUrl = backgroundImage.slice(backgroundImage.indexOf('"') + 1, backgroundImage.lastIndexOf('"'));
      
      textElement.insertAdjacentHTML('beforeend', '<div class="note">Click to view the image</div>');

      textElement.addEventListener('click', () => {
          window.open(imageUrl, '_blank');
      });

      textElement.style.cursor = 'pointer';
  }
});


///////////////////////////////////////////////////////////////////////

// Wrap every letter in a span
var textWrappers = document.querySelectorAll('.ml9 .letters');

textWrappers.forEach(textWrapper => {
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({ loop: true })
    .add({
      targets: textWrapper.querySelectorAll('.letter'),
      scale: [0, 1],
      duration: 1500,
      elasticity: 600,
      delay: (el, i) => 45 * (i + 1)
    }).add({
      targets: textWrapper.parentNode, 
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
});


///////////////////////////////////////////////////////////
const images = document.querySelectorAll('.box img');
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
  <span class="close-btn">&times;</span>
  <span class="prev-btn">&#10094;</span>
  <div class="modal-content">
    <img class="main-img" src="" alt="" />
    <h4 class="image-name"></h4> <!-- Added for image name -->
  </div>
  <span class="next-btn">&#10095;</span>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('.main-img');
const imageName = modal.querySelector('.image-name'); 
const closeBtn = modal.querySelector('.close-btn');
const prevBtn = modal.querySelector('.prev-btn');
const nextBtn = modal.querySelector('.next-btn');

let currentIndex = 0;

// Open modal and show selected image
images.forEach((image, index) => {
  image.addEventListener('click', () => {
    modal.classList.add('open');
    modalImg.src = image.src;
    imageName.textContent = image.alt; 
    currentIndex = index;
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('open');
});

// Previous button
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModalImage();
});

// Next button
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateModalImage();
});

// Update modal image
function updateModalImage() {
  modalImg.src = images[currentIndex].src;
  imageName.textContent = images[currentIndex].alt;
}


////////////////////////////////////////////////////////

const imgElements = document.querySelectorAll('.portfolio .imgs-container .box img'); 
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.textContent = 'Click to open'; 
document.body.appendChild(tooltip);

imgElements.forEach(image => { 
  image.addEventListener('mouseover', (e) => {
    tooltip.style.opacity = '1'; 
    tooltip.style.left = `${e.pageX + 10}px`; 
    tooltip.style.top = `${e.pageY + 10}px`; 
  });

  image.addEventListener('mousemove', (e) => {
    tooltip.style.left = `${e.pageX + 10}px`; 
    tooltip.style.top = `${e.pageY + 10}px`; 
  });

  image.addEventListener('mouseout', () => {
    tooltip.style.opacity = '0'; 
  });
});


//////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
  VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,      
    speed: 400,   
    glare: true,   
    "max-glare": 1
  });
});

/////////////////////////////////////////////////////
document.querySelector('a[href="#About"]').addEventListener('click', function (e) {
  e.preventDefault(); 

  document.querySelector('#About').scrollIntoView({ behavior: 'smooth' });

  const container = document.querySelector('.container2');
  
  container.classList.add('active');

  setTimeout(() => {
    container.classList.remove('active');
  }, 3000); 
});

document.querySelector('a button').addEventListener('click', function (e) {
  e.preventDefault(); 

  document.querySelector('#About').scrollIntoView({ behavior: 'smooth' });

  const container = document.querySelector('.container2');
  
  container.classList.add('active');

  setTimeout(() => {
    container.classList.remove('active');
  }, 3000); 
});
////////////////////////////////////////////////
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml1 .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.ml1 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.ml1',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


  var textWrapper2 = document.querySelector('.ml2 .letters');
textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.ml2 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
  //////////////////////////////////////////////////

  function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

window.onload = getYear;