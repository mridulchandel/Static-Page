const pathname = window.location.pathname;
const mobileHam = document.querySelector(".hamburger-container");

const home = document.querySelector("#home");
const navBarClass = document.querySelector(".navbar");
const navBarMobClass = document.querySelectorAll(".navbar-mobile-link");

const homeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      navBarClass.classList.add("navbar-scroll");
    } else {
      navBarClass.classList.remove("navbar-scroll");
    }
  });
}, {});

homeObserver.observe(home);

const navBarIds = ["#home", "#wwd", "#ow", "#tt", "#au", "#blog", "#contact"];

navBarIds.forEach((id) => {
  const el = document.querySelector(id);
  const navEl = navBarClass.querySelector("a[href='" + id + "']");
  const navMobEl = document.querySelector("a[href='" + id + "']");

  const elObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          navEl.classList.remove("active");
          navMobEl.classList.remove("active");
        } else {
          navEl.classList.add("active");
          navMobEl.classList.add("active");
        }
      });
    },
    { threshold: window.innerWidth >= 770 ? 0.45 : 0.175 }
  );
  elObserver.observe(el);
});

const handlingChangingText = () => {
  const textArr = ["Creative", "Design", "Architecture"];
  const text = document.querySelector(".changing");
  text.removeAttribute("style");
  if (textArr.indexOf(text.textContent) === textArr.length - 1) {
    text.textContent = textArr[0];
  } else {
    text.textContent = textArr[textArr.indexOf(text.textContent) + 1];
  }
};

const handlingNavCollapse = () => {
  var w = document.querySelector(".navbar-mobile-link-container");
  if (w.classList.contains("collapse")) {
    w.classList.remove("collapse");
  } else {
    w.classList.add("collapse");
  }
};

const handlingParticle = () => {
  const contactContainerHeight = document.querySelector(".c-detail-container")
    .offsetHeight;
  const container = document.querySelector(".c-container");
  const particle = document.querySelector(".c-particle");
  container.style.height = contactContainerHeight + "px";
  particle.style.height = contactContainerHeight + "px";
};

window.addEventListener("load", () => {
  setInterval(handlingChangingText, 5000);
  handlingParticle();
});

window.addEventListener("resize", () => {
  handlingParticle();
});

mobileHam.addEventListener("click", handlingNavCollapse);
navBarMobClass.forEach((link) =>
  link.addEventListener("click", handlingNavCollapse)
);

// For creating particles
function line(particle, particle2) {
  context.beginPath();
  context.moveTo(particle.x, particle.y);
  context.lineTo(particle2.x, particle2.y);
  context.stroke();
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < maxParticles; i++) {
    let particle = particles[i];
    context.fillRect(
      particle.x - particleSize / 2,
      particle.y - particleSize / 2,
      particleSize,
      particleSize
    );
    for (let j = 0; j < maxParticles; j++) {
      if (i != j) {
        let particle2 = particles[j];
        let distanceX = Math.abs(particle.x - particle2.x);
        let distanceY = Math.abs(particle.y - particle2.y);
        if (distanceX < threshold && distanceY < threshold) {
          context.lineWidth = (threshold * 2 - (distanceX + distanceY)) / 50;
          let color = 200 - Math.floor(distanceX + distanceY);
          context.strokeStyle =
            "rgb(" + color + "," + color + "," + color + ")";
          line(particle, particle2);
        }
      }
    }
    particle.x = particle.x + particle.vx;
    particle.y = particle.y + particle.vy;
    if (particle.x > canvas.width - particleSize || particle.x < particleSize)
      particle.vx = -particle.vx;
    if (particle.y > canvas.height - particleSize || particle.y < particleSize)
      particle.vy = -particle.vy;
  }
  window.requestAnimationFrame(animate);
}

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let particles = [];
let particleSize = 4;
let maxParticles = 40;
let threshold = 100;
for (let i = 0; i < maxParticles; i++) {
  let particle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random(),
    vy: Math.random(),
  };
  particles.push(particle);
}
context.fillStyle = "white";
animate();
