const hamburger = document.querySelector(".hamburger");
const section = document.querySelector("section");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  section.classList.toggle("active");
});
