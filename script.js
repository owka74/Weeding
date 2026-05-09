
// ===============================
// EMAILJS INIT
// ===============================

emailjs.init("53Yjlvmwmj7EnHKIG");


// ===============================
// COUNTDOWN
// ===============================

const weddingDate = new Date("August 13, 2026 00:00:00").getTime();

setInterval(() => {

  const now = new Date().getTime();

  const distance = weddingDate - now;

  document.getElementById("days").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("hours").innerText =
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById("minutes").innerText =
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("seconds").innerText =
    Math.floor((distance % (1000 * 60)) / 1000);

}, 1000);


// ===============================
// AUDIO
// ===============================

function toggleAudio() {

  const audio = document.getElementById("weddingAudio");

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

}


// ===============================
// CONFETTI FUNCTION
// ===============================

function createConfetti() {

  const confetti = document.createElement("div");
  confetti.classList.add("confetti");

  const colors = ["#d4af37", "#f3d28a", "#ffffff", "#ff4d6d", "#4dabf7"];

  confetti.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];

  confetti.style.left = Math.random() * window.innerWidth + "px";

  const size = Math.random() * 6 + 4;
  confetti.style.width = size + "px";
  confetti.style.height = size + "px";

  confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";

  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 5000);
}


// ===============================
// FORM SUBMIT
// ===============================

const form = document.getElementById("wishForm");

form.addEventListener("submit", function (e) {

  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  if (!name || !message) {
    alert("اكتبي الاسم والرسالة ❤️");
    return;
  }

  const now = new Date().toLocaleString("ar-EG");

  emailjs.send(
    "service_84j5g68",
    "template_00pw1mw",
    {
      name: name,
      message: message,
      time: now
    }
  )

  .then(() => {

    // ===============================
    // SUCCESS MESSAGE
    // ===============================

    const box = document.getElementById("successMessage");
    box.classList.add("show");

    form.reset();

    // ===============================
    // CONFETTI ANIMATION 🎉
    // ===============================

    for (let i = 0; i < 80; i++) {
      setTimeout(createConfetti, i * 30);
    }

    // Hide message after 3 seconds
    setTimeout(() => {
      box.classList.remove("show");
    }, 3000);

  })

  .catch((error) => {

    console.log(error);
    alert("حصل خطأ ❌ حاولي تاني");

  });

});