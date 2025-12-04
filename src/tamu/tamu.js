const form = document.getElementById("guestForm");
const input = document.getElementById("guestName");
const resultBox = document.getElementById("resultBox");
const generatedLink = document.getElementById("generatedLink");
const copyBtn = document.getElementById("copyBtn");
const greetingText = document.getElementById("greetingText");
const historyList = document.getElementById("historyList");

const baseUrl = "https://wedding-juliadi-admiati.netlify.app/";

function renderGreeting(name) {
  if (!name) {
    greetingText.textContent = "Halo, tamu undangan";
  } else {
    greetingText.textContent = "Halo, " + name;
  }
}

function saveToLocalStorage(link) {
  let history = JSON.parse(localStorage.getItem("guestLinks")) || [];

  if (!history.includes(link)) {
    history.unshift(link);
  }

  localStorage.setItem("guestLinks", JSON.stringify(history));
  showHistory();
}

function showHistory() {
  historyList.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("guestLinks")) || [];

  history.forEach((link) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center gap-2";

    li.innerHTML = `
        <a href="${link}" target="_blank" class="text-pink-600 hover:underline">${link}</a>
        <button onclick="navigator.clipboard.writeText('${link}')" class="text-xs bg-slate-200 px-2 py-1 rounded">Copy</button>
      `;

    historyList.appendChild(li);
  });
}

function getParamTo() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to") || "";
}

// Baca param saat load
const urlName = getParamTo();
if (urlName) {
  input.value = urlName;
  renderGreeting(urlName);
}

showHistory();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = input.value.trim().replace(/\s+/g, " ");
  if (!name) return;

  const finalLink = `${baseUrl}?to=${encodeURIComponent(name)}`;

  // Update URL
  history.pushState(null, "", finalLink);

  // Greeting
  renderGreeting(name);

  // Tampilkan result
  generatedLink.value = finalLink;
  resultBox.classList.remove("hidden");

  // Simpan ke local storage
  saveToLocalStorage(finalLink);
});

copyBtn.addEventListener("click", function () {
  generatedLink.select();
  document.execCommand("copy");

  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
});
