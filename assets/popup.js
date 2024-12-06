const btnClose = document.querySelector(".textskip"),
  popup = document.querySelector(".popup"),
  btnSub = document.querySelector(".btnsub");
body = document.querySelector(".homepage");

// Hiện popup khi vào web
window.addEventListener("load", function () {
  checkCookie();
});

// Ẩn popup khi click btn
function closePopup() {
  btnClose.addEventListener("click", function () {
    popup.classList.remove("active");
    setCookie("gmail", "true", 1);
    body.classList.remove("--disable-scroll ");
  });
}
closePopup();

// Kiểm tra xem cookie đã tồn tại chưa
function checkCookie() {
  let value = getCookie("gmail");
  if (value !== "") {
    popup.classList.remove("active"); // Cookie đã tồn tại, không hiển thị popup
  } else {
    popup.classList.add("active"); // Cookie chưa tồn tại, hiển thị popup
    // body.classList.add("--disable-scroll ");
  }
}
// Lấy cookie
function getCookie(cgmail) {
  let gmail = cgmail + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(gmail) == 0) {
      return c.substring(gmail.length, c.length);
    }
  }
  return "";
}
// Hàm tạo cookie
function setCookie(cgmail, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cgmail + "=" + cvalue + ";" + expires + ";path=/";
}

// FORM VALIDATE
function Validator(options) {
  function valiate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("--invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("--invalid");
    }
    return !errorMessage;
  }

  // lấy element của form cần validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    //khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      // lặp qua từng rule và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = valiate(inputElement, rule);
        // Tồn tại 1 kí tự invalid rule => error
        if (!isValid) {
          isFormValid = false;
        }
      });

      // Thỏa mãn đk -> tắt popup
      if (isFormValid) {
        var enableInput = formElement.querySelectorAll("[name]");
        var formValue = Array.from(enableInput).reduce(function (value, input) {
          return (value[input.name] = input.value) && value;
        }, {});
        var email = formValue.email;
        // setCookie("gmail", email, 30);
        // popup.classList.remove("active");
        // body.classList.remove("--disable-scroll ");
        console.log(email);
      }
    };

    // lặp qua và xử lí inputElement
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );
      if (inputElement) {
        // Xử lí khi người dùng nhập
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("--invalid");
        };
      }
    });
  }
}
// rules
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : "Please enter a valid email address.";
    },
  };
};

Validator({
  form: "#formjs",
  formGroupSelector: ".form",
  errorSelector: ".emailFeedback",
  rules: [Validator.isEmail("#emailinput")],
});
