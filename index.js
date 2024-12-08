document.addEventListener("DOMContentLoaded", () => {
  const chatWrapper = document.querySelector(".chat_messages");
  const buttons = document.querySelectorAll(".buttons_button");
  const formSection = document.querySelector(".form-section");
  const form = document.querySelector("#user-form");
  const formFields = document.querySelectorAll(".form-field");

  let currentQuestionIndex = 0;

  const questions = [
    {
      question: "Чи був у вас досвід пов'язаний із Арбітражем трафіку?",
      options: ["Так", "Ні", "Чув про це"],
    },
    {
      question: "Скільки часу ви могли б приділяти на день?",
      options: ["Одна година", "2-3 години", "5 і більше"],
    },
  ];

  const showMessage = (text, isUser = false) => {
    const message = document.createElement("div");
    message.classList.add("messages_text2");

    if (isUser) message.classList.add("answer2");

    const p = document.createElement("p");
    p.textContent = text;

    message.appendChild(p);
    chatWrapper.appendChild(message);

    setTimeout(() => {
      message.classList.add("visible");
    }, 100);
  };

  const showQuestion = (index) => {
    if (index < questions.length) {
      const { question, options } = questions[index];
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("messages_text");
      questionDiv.innerHTML = `<p>${question}</p>`;
      chatWrapper.appendChild(questionDiv);

      options.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("buttons_button");
        button.textContent = option;
        button.addEventListener("click", (e) => {
          const userAnswer = e.target.textContent;
          showMessage(userAnswer, true);

          setTimeout(() => {
            chatWrapper.removeChild(questionDiv);
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
          }, 1000);
        });
        chatWrapper.appendChild(button);
      });
    } else {
      showMessage(
        "Дякую! Наша компанія дуже зацікавлена ​​вами, для подальшої підтримки зв'язку, будь ласка, заповніть форму."
      );

      setTimeout(() => {
        formSection.classList.add("visible");
      }, 1000);
    }
  };

  buttons[1].addEventListener("click", (e) => {
    const userAnswer = e.target.textContent;
    showMessage(userAnswer, true);

    setTimeout(() => {
      showMessage("Дякую за вашу відповідь, чекаємо на ваше повернення!");
    }, 1000);
  });

  buttons[0].addEventListener("click", () => {
    const userAnswer = buttons[0].textContent;
    showMessage(userAnswer, true);

    setTimeout(() => {
      showQuestion(currentQuestionIndex);
    }, 1000);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    formFields.forEach((field) => {
      const existingError = field.querySelector(".error-message");
      if (existingError) {
        existingError.remove();
      }
    });

    formFields.forEach((field) => {
      const input = field.querySelector("input");
      const value = input.value.trim();
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");

      if (!value) {
        isValid = false;
        errorMessage.textContent = "Це поле не може бути порожнім.";
        errorMessage.style.color = "red";
        field.appendChild(errorMessage);
      }
    });

    const phoneInput = document.getElementById("phone");
    const phoneValue = phoneInput.value.trim();
    const phonePattern = /^[+]?[0-9]{10,15}$/;
    if (phoneValue && !phoneValue.match(phonePattern)) {
      isValid = false;
      const phoneField = document
        .querySelector("#phone")
        .closest(".form-field");
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent =
        "Будь ласка, введіть правильний номер телефону.";
      errorMessage.style.color = "red";
      phoneField.appendChild(errorMessage);
    }

    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue && !emailValue.match(emailPattern)) {
      isValid = false;
      const emailField = document
        .querySelector("#email")
        .closest(".form-field");
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent =
        "Будь ласка, введіть правильну електронну пошту.";
      errorMessage.style.color = "red";
      emailField.appendChild(errorMessage);
    }

    if (isValid) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log("Дані форми:", data);

      window.location.href = "success.html";
      form.reset();
    }
  });
});
