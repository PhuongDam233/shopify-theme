const accordions = document.querySelectorAll(".accordion__list-item");

accordions.forEach((item, index) => {
  let answer = item.querySelector(".answer");
  item.addEventListener("click", () => {
    item.classList.toggle("--active");
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
    removeActive(index);
  });
});

function removeActive(index1) {
  accordions.forEach((item2, index2) => {
    let answer = item2.querySelector(".answer");
    if (index1 != index2) {
      item2.classList.remove("--active");
      answer.style.maxHeight = null;
    }
  });
}
