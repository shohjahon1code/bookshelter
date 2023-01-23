var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var elBookmarkMenu = document.querySelector(".nav__bars");
var elBookmarks = document.querySelector(".bookmark");
var swiperWrapper = document.querySelector(".swiper-wrapper");
var elCards = document.querySelector(".cards");
var template = document.querySelector("#template-book");
var elSearchInput = document.querySelector(".header__search");
var elLogoutBtn = document.querySelector(".login");
var elAdminBtn = document.querySelector(".admin");
var elSelect = document.querySelector(".nav__select");
var navResults = document.querySelector(".nav__results span");
var overlay = document.querySelector(".overlay");
var loaders = document.querySelector(".loaders");
var topPosts = [];
var books = [];
elBookmarkMenu.addEventListener("click", function () {
    elBookmarks.classList.toggle("active");
});
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fetch("https://63ca7b43d0ab64be2b537ecf.mockapi.io/top-Posts")];
                case 1:
                    res = _a.sent();
                    return [4, res.json()];
                case 2:
                    data = _a.sent();
                    topPosts = data;
                    localStorage.setItem("top", JSON.stringify(topPosts));
                    renderPosts(topPosts, swiperWrapper, (type = "topPosts"));
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
})();
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fetch("https://63ca7b43d0ab64be2b537ecf.mockapi.io/books\n  ")];
                case 1:
                    res = _a.sent();
                    return [4, res.json()];
                case 2:
                    data = _a.sent();
                    books = data;
                    renderPosts(books, elCards, "books");
                    searchBooksHandler(books);
                    searchBooksBySelectHandler(books);
                    navResults.textContent = books.length;
                    overlay.style.display = "none";
                    loaders.style.display = "none";
                    return [3, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
})();
function renderPosts(arr, parent, type) {
    if (type === "topPosts") {
        var fragment_1 = document.createDocumentFragment();
        arr.reverse().forEach(function (item) {
            var swiperSlide = document.createElement("div");
            swiperSlide.className = "swiper-slide";
            var swiperImg = document.createElement("img");
            swiperImg.className = "swiper-img";
            swiperImg.src = item.img;
            swiperSlide.append(swiperImg);
            fragment_1.append(swiperSlide);
        });
        parent.append(fragment_1);
    }
    if (type === "books") {
        elCards.innerHTML = "";
        var bookFragment_1 = document.createDocumentFragment();
        arr.reverse().forEach(function (book) {
            var cloneTemplate = template.content.cloneNode(true);
            var image = cloneTemplate.querySelector(".card__image img");
            var title = cloneTemplate.querySelector(".card__info h5");
            var author = cloneTemplate.querySelector(".author");
            var year = cloneTemplate.querySelector(".year");
            var bookmarkBtn = cloneTemplate.querySelector(".card__bookmark");
            var moreBtn = cloneTemplate.querySelector(".card__more");
            image.src = book.img;
            title.textContent = book.name;
            author.textContent = book.author;
            year.textContent = book.year;
            bookmarkBtn.dataset.id = book.id;
            moreBtn.dataset.id = book.id;
            bookFragment_1.appendChild(cloneTemplate);
        });
        parent.appendChild(bookFragment_1);
    }
}
function searchBooksHandler(array) {
    elSearchInput.addEventListener("input", function () {
        var searchValue = elSearchInput.value.trim();
        var elRegx = new RegExp(searchValue, "gi");
        var filteredBooks = array
            .reverse()
            .filter(function (book) { return book.name.match(elRegx) || book.author.match(elRegx); });
        if (filteredBooks.length > 0) {
            renderPosts(filteredBooks, elCards, "books");
            navResults.textContent = filteredBooks.length
                ? filteredBooks.length
                : "0";
        }
        else {
        }
    });
}
function searchBooksBySelectHandler(array) {
    elSelect.addEventListener("change", function () {
        var selectvalue = elSelect.value;
        var selectRegx = new RegExp(selectvalue, "gi");
        var filteredSelect = array
            .reverse()
            .filter(function (item) { return item.year.match(selectRegx) || selectvalue === "all"; });
        if (filteredSelect.length > 0) {
            renderPosts(filteredSelect, elCards, "books");
            navResults.textContent = filteredSelect.length;
        }
    });
}
var isLogged = localStorage.getItem("isLogged");
if (isLogged) {
    elLogoutBtn.textContent = "logout";
    elAdminBtn.style.display = "block";
}
else {
    elLogoutBtn.textContent = "login";
}
elLogoutBtn.addEventListener("click", function () {
    window.location.href = "login.html";
});
elLogoutBtn.addEventListener("click", function () {
    if (elLogoutBtn.textContent == "logout") {
        localStorage.removeItem("isLogged");
        window.location.reload();
        elLogoutBtn.textContent = "login";
    }
});
var bookmarks = [];
elCards.addEventListener("click", function (e) {
    var id = e.target.dataset.id;
    if (e.target.matches(".card__more")) {
        localStorage.setItem("id", id);
        window.location.href = "single.html";
    }
    else if (e.target.matches(".card__bookmark")) {
        fetch("https://63ca7b43d0ab64be2b537ecf.mockapi.io/books/".concat(id))
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var newBookmark = {
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
var bookmarksAll = JSON.parse(localStorage.getItem("bookmark"));
var elBokmarkBooks = document.querySelector(".bookmark__books");
var elBookmarkTemplate = document.querySelector("#template-bookmarks");
function renderBookmark(books) {
    var bookmarkFragment = document.createDocumentFragment();
    elBokmarkBooks.innerHTML = null;
    books.forEach(function (book) {
        var clone = elBookmarkTemplate.content.cloneNode(true);
        var title = clone.querySelector(".bookmark__book-left h5");
        var text = clone.querySelector(".bookmark__book-left p");
        var deleteBtn = clone.querySelector(".bookmark__delete");
        title.textContent = book.name;
        text.textContent = book.author;
        deleteBtn.dataset.id = book.id;
        bookmarkFragment.appendChild(clone);
    });
    elBokmarkBooks.appendChild(bookmarkFragment);
}
renderBookmark(bookmarksAll);
elBokmarkBooks.addEventListener("click", function (e) {
    if (e.target.matches(".bookmark__delete")) {
        var id_1 = e.target.dataset.id;
        var filtered = bookmarksAll.filter(function (book) {
            if (book.id != id_1) {
                return book;
            }
        });
        bookmarksAll = filtered;
        if (bookmarksAll.length === 0) {
            localStorage.removeItem('bookmark');
        }
        renderBookmark(bookmarksAll);
    }
});
