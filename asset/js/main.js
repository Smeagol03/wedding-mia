// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-sine",
});

// Set the date we're counting down to
var countDownDate = new Date("Dec 07, 2025 09:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in elements with class names for each time unit
  document.querySelector(".days").textContent = days;
  document.querySelector(".hours").textContent = hours;
  document.querySelector(".minutes").textContent = minutes;
  document.querySelector(".seconds").textContent = seconds;

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML =
      "<p class='text-pink-600'>EXPIRED</p>";
  }
}, 1000);
// Add to Calendar
document
  .getElementById("addToCalendarBtn")
  .addEventListener("click", function () {
    // Event details
    const title = "Pernikahan Wijaya & Rara";
    const description =
      "Kami mengundang Anda untuk berbagi kebahagiaan di hari pernikahan kami";
    const location = "Gedung Serbaguna, Jl. Contoh No. 123, Kecamatan, Kota";
    const startDate = new Date("2023-01-01T11:00:00");
    const endDate = new Date("2023-01-01T14:00:00");

    // Format for Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate.toISOString().replace(/-|:|\.\d+/g, "")}/${endDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

    // Open in new tab
    window.open(googleCalendarUrl, "_blank");
  });

// Handle invitation opening

document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.classList.add("no-scroll");
  document.body.classList.add("no-scroll");
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const button = document.getElementById("open-invitation");
  const isiUndangan = document.getElementById("isi-undangan");

  if (button && isiUndangan) {
    button.addEventListener("click", function () {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");

      isiUndangan.scrollIntoView({ behavior: "smooth" });

      const music = document.getElementById("bgMusic");
      if (music) {
        music.play().catch((e) => {
          console.log("Autoplay musik diblokir oleh browser:", e);
        });
      }
    });
  } else {
    console.warn(
      "Element #open-invitation atau #isi-undangan tidak ditemukan."
    );
  }
});

// copy to clipboard
function copyToClipboard(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Menampilkan notifikasi menggunakan SweetAlert
      Swal.fire({
        icon: "success",
        title: "Nomor rekening berhasil disalin!",
        showConfirmButton: false,
        timer: 1500, // Menampilkan selama 1.5 detik
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan!",
        text: "Gagal menyalin nomor rekening.",
      });
    });
}

// My Form
window.addEventListener("load", function () {
  const form = document.getElementById("rsvpForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading alert
    Swal.fire({
      title: "Mengirim...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    })
      .then(() => {
        // Close loading alert and show success message
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Kehadiran anda telah terkonfirmasi 😊",
        });
      })
      .catch((error) => {
        // Show error message if something goes wrong
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Terjadi kesalahan, silakan coba lagi",
        });
      });
  });
});

// Get URL parameters for guest name
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("to");
document.getElementById("guest-name").textContent = guestName
  ? guestName
  : "Bapak/Ibu/Saudara/i";
