const elForm = document.querySelector(".form");
const elEmail = document.querySelector(".form__username");
const elPassword = document.querySelector(".form__password");


const validateEmailHandler = () => {
  const emailValue = elEmail.value;
  if (!emailValue.includes("@") || emailValue.length === 0) {
    elEmail.style.border = "1px solid red";
  } else {
    elEmail.style.border = "1px solid transparent";
  }
};

const validatePasswordHandler = () => {
  const passwordValue = elPassword.value;
  if (passwordValue.trim().length < 6) {
    elPassword.style.border = "1px solid red";
  } else {
    elPassword.style.border = "1px solid transparent";
  }
};

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateEmailHandler();
  validatePasswordHandler();
  if (!elEmail.value.includes('@') || elPassword.value === "") {
    return;
  }

  localStorage.setItem("isLogged", "1");
  window.location.href = "index.html";
});
