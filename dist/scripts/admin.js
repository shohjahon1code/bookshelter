var elForm = document.querySelector("#form");
var topPost = JSON.parse(localStorage.getItem("top"));
console.log(topPost);
elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = e.target.name.value;
    var author = e.target.author.value;
    var year = e.target.year.value;
    var body = e.target.body.value;
    var category = e.target.category.value;
    var img = e.target.image.value;
    var newBook = {
        id: Math.random().toString(),
        name: name,
        author: author,
        img: img,
        year: year,
        body: body,
        categories: category,
    };
    fetch("https://63ca7b43d0ab64be2b537ecf.mockapi.io/books", {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        alert("Post added succesfully");
        window.location.reload();
    });
});
