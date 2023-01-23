const id = localStorage.getItem("id");
const overlay = document.querySelector(".overlay");
const loaders = document.querySelector(".loaders");

(async function () {
  const res = await fetch(
    `https://63ca7b43d0ab64be2b537ecf.mockapi.io/books/${id}`
  );
  const data = await res.json();
  renderSingleData(data);
  overlay.style.display = "none";
  loaders.style.display = "none";
})();

function renderSingleData(data) {
  const img = document.querySelector(".single__img");
  const name = document.querySelector(".single__bookname");
  const body = document.querySelector(".single__bod");
  const author = document.querySelector(".single__author");
  const publish = document.querySelector(".single__pub");
  const category = document.querySelector(".single__category");

  img.src = data.img;
  name.textContent = data.name;
  body.textContent = data.body;
  author.textContent = `Author: ${data.author}`;
  publish.textContent = `Publish: ${data.year}`;
  category.textContent = `Categories: ${data.categories}`;
}
