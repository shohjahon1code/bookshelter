const elForm = document.querySelector("#form");
const topPost = JSON.parse(localStorage.getItem("top"));
console.log(topPost);

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const author = e.target.author.value;
  const year = e.target.year.value;
  const body = e.target.body.value;
  const category = e.target.category.value;
  const img = e.target.image.value;

  const newBook = {
    id: Math.random().toString(),
    name,
    author,
    img,
    year,
    body,
    categories: category,
  };
  

  fetch(`https://63ca7b43d0ab64be2b537ecf.mockapi.io/books`, {
    method: "POST",
    body: JSON.stringify(newBook),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Post added succesfully");
      window.location.reload();
    });
});
