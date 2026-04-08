let hoverCount = 0;
let imgIndex = 0;

const btn = document.querySelector(".imgHeader");
const menu = document.querySelector(".dropdown-content");
const title = document.querySelector(".title-toppp");
const fonts = ["Asset", "Bohme", "Pocas"];

const navLinks = document.querySelectorAll(".desktop-nav a");
const header = document.querySelector("header");

const portfolio = document.getElementById("portfolio");
const cards = document.querySelectorAll('.photo-1');

const specificLinks = document.querySelectorAll('.hovering-a');
const floatingText = document.createElement('p');

const logoChanging = document.querySelector(".imgChanging");

const narative = document.querySelector('.narative');

floatingText.textContent = 'Click to go to the Website.';
floatingText.style.position = 'fixed';
floatingText.style.pointerEvents = 'none';
floatingText.style.background = 'var(--dark-bg-tertiary)';
floatingText.style.padding = '5px 10px';
floatingText.style.borderRadius = '5px';
floatingText.style.fontSize = '12px';
floatingText.style.opacity = '0';
floatingText.style.transition = 'opacity 0.2s';
floatingText.style.color = 'white';
document.body.appendChild(floatingText);

const images = [
	"assets/logo1.png",
	"assets/logo3.png",
	"assets/logo4.png"
];

specificLinks.forEach(specificLink => {
    specificLink.addEventListener('mouseenter', (e) => {
        floatingText.style.opacity = '1';
        floatingText.style.left = e.clientX + 15 + 'px';
        floatingText.style.top = e.clientY + 15 + 'px';
    });

    specificLink.addEventListener('mousemove', (e) => {
        floatingText.style.left = e.clientX + 15 + 'px';
        floatingText.style.top = e.clientY + 15 + 'px';
    });

    specificLink.addEventListener('mouseleave', () => {
        floatingText.style.opacity = '0';
    });
});

const blends = [
	'#14141F',
	'rgba(176, 16, 48, 0.25)',
	'rgba(176, 16, 48, 0.5)',
	'rgba(176, 16, 48, 0.75)',
	'#B01030'
];

btn.addEventListener("click", () => {
	if(menu.style.display === "none") {
		menu.style.display = "block";
	} else {
		menu.style.display = "none";
	}
});

function randomFont() {
	const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
	title.style.fontFamily = randomFont;
}

//DropDown Fixed - AI helps me with this
const containerBtn = document.querySelector('.container-button');
containerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const elementPosition = portfolio.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - (window.innerHeight / 2) + (portfolio.offsetHeight / 2);
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

const navLinkItems = document.querySelectorAll('.desktop-nav a, .dropdown-content a');
navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 80; // adjust for header height
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
// - to this.. rest i used them as a tool

navLinks.forEach(link => {
	link.addEventListener('mouseenter', () => {
		narative.style.opacity = '1';
	});
	link.addEventListener('mouseleave', () => {
		narative.style.opacity = '0';
	});
});

/*btn.addEventListener('click', () => {
	const elementPosition = portfolio.getBoundingClientRect().top + window.pageYOffset;
	const offsetPosition = elementPosition - (window.innerHeight / 2) + (portfolio.offsetHeight / 2);

	window.scrollTo({
		top: offsetPosition,
		behavior: 'smooth'
	});
});*/

/*document.addEventListener('contextmenu', (e) => {
	e.preventDefault();
});

document.addEventListener('keydown', (e) => {
	if (
		e.key === 'F12' ||
		(e.ctrlKey && e.shiftKey && e.key === 'I') ||
		(e.ctrlKey && e.key === 'u')
	) {
		e.preventDefault();
	}
});*/

function applyCardColors() {
    cards.forEach(card => {
        const img = card.querySelector('img');
        if (!img.complete) {
            img.addEventListener('load', () => extractColor(card, img));
        } else {
            extractColor(card, img);
        }
    });
}

function extractColor(card, img) {
    try {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const rgb = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        card.style.background = `linear-gradient(to top, ${rgb}, var(--dark-bg-tertiary))`;
    } catch (e) {
        console.log('Color extraction failed:', e);
        card.style.background = `linear-gradient(to top, var(--crimson-dark), var(--dark-bg-tertiary))`;
    }
}

// Run after page loads
window.addEventListener('load', applyCardColors);

/*navLinks.forEach(link => {
	link.addEventListener("mouseenter", () => {
		//header.style.background = 'linear-gradient(45deg, var(--dark-bg-secondary), var(--crimson-dark))';

		hoverCount = (hoverCount + 1) % blends.length;
		header.style.background = blends[hoverCount];	
	});

	link.addEventListener("mouseleave", () => {
		header.style.background = 'linear-gradient(45deg, var(--dark-bg-secondary), var(--dark-bg-tertiary))';
	});
});*/

//setInterval(randomFont, Math.random() * 80 + 50);


setInterval(() => {
    imgIndex = (imgIndex + 1) % images.length;
    logoChanging.src = images[imgIndex];
}, 1000);