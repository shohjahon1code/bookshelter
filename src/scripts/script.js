const elBookmarkMenu = document.querySelector(".nav__bars");
const elBookmarks = document.querySelector(".bookmark");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const elCards = document.querySelector(".cards");
const template = document.querySelector("#template-book");
const elSearchInput = document.querySelector(".header__search");
const elLogoutBtn = document.querySelector(".login");
const elAdminBtn = document.querySelector(".admin");
const elSelect = document.querySelector(".nav__select");
const navResults = document.querySelector(".nav__results span");
const overlay = document.querySelector(".overlay");
const loaders = document.querySelector(".loaders");

const topPosts = [];
const books = [];

// bookmarks open menu
elBookmarkMenu.addEventListener("click", () => {
  elBookmarks.classList.toggle("active");
});

// fetch slider top posts

(async function () {
  try {
    const res = await fetch(
      `https://63ca7b43d0ab64be2b537ecf.mockapi.io/top-Posts`
    );
    const data = await res.json();
    topPosts = data;
    localStorage.setItem("top", JSON.stringify(topPosts));
    renderPosts(topPosts, swiperWrapper, (type = "topPosts"));
  } catch (error) {
    console.log(error);
  }
})();

// fetch books
(async function () {
  try {
    const res = await fetch(`https://63ca7b43d0ab64be2b537ecf.mockapi.io/books
  `);
    const data = await res.json();
    books = data;

    renderPosts(books, elCards, "books");
    searchBooksHandler(books);
    searchBooksBySelectHandler(books);
    navResults.textContent = books.length;
    overlay.style.display = "none";
    loaders.style.display = "none";
  } catch (error) {
    console.log(error);
  }
})();

//render posts
function renderPosts(arr, parent, type) {
  if (type === "topPosts") {
    const fragment = document.createDocumentFragment();
    arr.reverse().forEach((item) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.className = "swiper-slide";
      const swiperImg = document.createElement("img");
      swiperImg.className = "swiper-img";
      swiperImg.src = item.img;

      swiperSlide.append(swiperImg);
      fragment.append(swiperSlide);
    });
    parent.append(fragment);
  }

  if (type === "books") {
    elCards.innerHTML = "";
    const bookFragment = document.createDocumentFragment();
    arr.reverse().forEach((book) => {
      const cloneTemplate = template.content.cloneNode(true);
      const image = cloneTemplate.querySelector(".card__image img");
      const title = cloneTemplate.querySelector(".card__info h5");
      const author = cloneTemplate.querySelector(".author");
      const year = cloneTemplate.querySelector(".year");
      const bookmarkBtn = cloneTemplate.querySelector(".card__bookmark");
      const moreBtn = cloneTemplate.querySelector(".card__more");
      image.src = book.img;
      title.textContent = book.name;
      author.textContent = book.author;
      year.textContent = book.year;
      bookmarkBtn.dataset.id = book.id;
      moreBtn.dataset.id = book.id;

      bookFragment.appendChild(cloneTemplate);
    });
    parent.appendChild(bookFragment);
  }
}

// search posts
function searchBooksHandler(array) {
  elSearchInput.addEventListener("input", () => {
    const searchValue = elSearchInput.value.trim();

    const elRegx = new RegExp(searchValue, "gi");
    const filteredBooks = array
      .reverse()
      .filter((book) => book.name.match(elRegx) || book.author.match(elRegx));
    if (filteredBooks.length > 0) {
      renderPosts(filteredBooks, elCards, "books");
      navResults.textContent = filteredBooks.length
        ? filteredBooks.length
        : "0";
    } else {
    }
  });
}

// select by year
function searchBooksBySelectHandler(array) {
  elSelect.addEventListener("change", () => {
    const selectvalue = elSelect.value;
    const selectRegx = new RegExp(selectvalue, "gi");
    const filteredSelect = array
      .reverse()
      .filter((item) => item.year.match(selectRegx) || selectvalue === "all");
    if (filteredSelect.length > 0) {
      renderPosts(filteredSelect, elCards, "books");
      navResults.textContent = filteredSelect.length;
    }
  });
}

// loggedd btn configure
const isLogged = localStorage.getItem("isLogged");
if (isLogged) {
  elLogoutBtn.textContent = "logout";
  elAdminBtn.style.display = "block";
} else {
  elLogoutBtn.textContent = "login";
}

elLogoutBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

elLogoutBtn.addEventListener("click", () => {
  if (elLogoutBtn.textContent == "logout") {
    localStorage.removeItem("isLogged");
    window.location.reload();
    elLogoutBtn.textContent = "login";
  }
});

// bookmark
const bookmarks = [];

elCards.addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  if (e.target.matches(".card__more")) {
    localStorage.setItem("id", id);
    window.location.href = "single.html";
  } else if (e.target.matches(".card__bookmark")) {
    fetch(`https://63ca7b43d0ab64be2b537ecf.mockapi.io/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const newBookmark = {
          id: data.id,
          name: data.name,
          author: data.author,
        };
        bookmarks.push(newBookmark);
        localStorage.setItem("bookmark", JSON.stringify(bookmarks));

        renderBookmark(bookmarks);
      });
  }
});

const bookmarksAll = JSON.parse(localStorage.getItem("bookmark"));
const elBokmarkBooks = document.querySelector(".bookmark__books");
const elBookmarkTemplate = document.querySelector("#template-bookmarks");
function renderBookmark(books) {
  const bookmarkFragment = document.createDocumentFragment();
  elBokmarkBooks.innerHTML = null;
  books.forEach((book) => {
    const clone = elBookmarkTemplate.content.cloneNode(true);
    const title = clone.querySelector(".bookmark__book-left h5");
    const text = clone.querySelector(".bookmark__book-left p");
    const deleteBtn = clone.querySelector(".bookmark__delete");
    title.textContent = book.name;
    text.textContent = book.author;
    deleteBtn.dataset.id = book.id;

    bookmarkFragment.appendChild(clone);
  });

  elBokmarkBooks.appendChild(bookmarkFragment);
}

renderBookmark(bookmarksAll);

// delete bookmarks items

elBokmarkBooks.addEventListener("click", (e) => {
  if (e.target.matches(".bookmark__delete")) {
    const id = e.target.dataset.id;
    const filtered = bookmarksAll.filter((book) => {
      if (book.id != id) {
        return book;
      }
    });

    bookmarksAll = filtered;
    if(bookmarksAll.length === 0){
      localStorage.removeItem('bookmark')
    }
    renderBookmark(bookmarksAll);
    
  }
});
