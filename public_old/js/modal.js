(function () {
  // codyhouse.co for instructions
  function ModalSignin(element) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName("js-signin-modal-block");
    this.switchers = this.element
      .getElementsByClassName("js-signin-modal-switcher")[0]
      .getElementsByTagName("a");
    this.triggers = document.getElementsByClassName("js-signin-modal-trigger");
    this.hidePassword = this.element.getElementsByClassName("js-hide-password");
    this.init();
  }

  ModalSignin.prototype.init = function () {
    var self = this;
    for (var i = 0; i < this.triggers.length; i++) {
      (function (i) {
        self.triggers[i].addEventListener("click", function (event) {
          if (event.target.hasAttribute("data-signin")) {
            event.preventDefault();
            self.showSigninForm(event.target.getAttribute("data-signin"));
          }
        });
      })(i);
    }

    this.element.addEventListener("click", function (event) {
      if (
        hasClass(event.target, "js-signin-modal") ||
        hasClass(event.target, "js-close")
      ) {
        event.preventDefault();
        removeClass(self.element, "cd-signin-modal--is-visible");
      }
    });

    document.addEventListener("keydown", function (event) {
      event.which == "27" &&
        removeClass(self.element, "cd-signin-modal--is-visible");
    });

    for (var i = 0; i < this.hidePassword.length; i++) {
      (function (i) {
        self.hidePassword[i].addEventListener("click", function (event) {
          self.togglePassword(self.hidePassword[i]);
        });
      })(i);
    }
  };

  ModalSignin.prototype.togglePassword = function (target) {
    var password = target.previousElementSibling;
    "password" == password.getAttribute("type")
      ? password.setAttribute("type", "text")
      : password.setAttribute("type", "password");
    target.textContent = "Hide" == target.textContent ? "Show" : "Hide";
    putCursorAtEnd(password);
  };

  ModalSignin.prototype.showSigninForm = function (type) {
    !hasClass(this.element, "cd-signin-modal--is-visible") &&
      addClass(this.element, "cd-signin-modal--is-visible");
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].getAttribute("data-type") == type
        ? addClass(this.blocks[i], "cd-signin-modal__block--is-selected")
        : removeClass(this.blocks[i], "cd-signin-modal__block--is-selected");
    }
    var switcherType = type == "signup" ? "signup" : "login";
    for (var i = 0; i < this.switchers.length; i++) {
      this.switchers[i].getAttribute("data-type") == switcherType
        ? addClass(this.switchers[i], "cd-selected")
        : removeClass(this.switchers[i], "cd-selected");
    }
  };

  ModalSignin.prototype.toggleError = function (input, bool) {
    toggleClass(input, "cd-signin-modal__input--has-error", bool);
    toggleClass(
      input.nextElementSibling,
      "cd-signin-modal__error--is-visible",
      bool
    );
  };

  var signinModal = document.getElementsByClassName("js-signin-modal")[0];
  if (signinModal) {
    new ModalSignin(signinModal);
  }

  var mainNav = document.getElementsByClassName("js-main-nav")[0];
  if (mainNav) {
    mainNav.addEventListener("click", function (event) {
      if (hasClass(event.target, "js-main-nav")) {
        var navList = mainNav.getElementsByTagName("ul")[0];
        toggleClass(
          navList,
          "cd-main-nav__list--is-visible",
          !hasClass(navList, "cd-main-nav__list--is-visible")
        );
      }
    });
  }

  function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else
      return !!el.className.match(
        new RegExp("(\\s|^)" + className + "(\\s|$)")
      );
  }
  function addClass(el, className) {
    var classList = className.split(" ");
    if (el.classList) el.classList.add(classList[0]);
    else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
    if (classList.length > 1) addClass(el, classList.slice(1).join(" "));
  }
  function removeClass(el, className) {
    var classList = className.split(" ");
    if (el.classList) el.classList.remove(classList[0]);
    else if (hasClass(el, classList[0])) {
      var reg = new RegExp("(\\s|^)" + classList[0] + "(\\s|$)");
      el.className = el.className.replace(reg, " ");
    }
    if (classList.length > 1) removeClass(el, classList.slice(1).join(" "));
  }
  function toggleClass(el, className, bool) {
    if (bool) addClass(el, className);
    else removeClass(el, className);
  }

  //credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
  function putCursorAtEnd(el) {
    if (el.setSelectionRange) {
      var len = el.value.length * 2;
      el.focus();
      el.setSelectionRange(len, len);
    } else {
      el.value = el.value;
    }
  }
});
