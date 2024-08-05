//відображення спливаючого повідомлення - бібліотека
import iziToast from "izitoast";
//відображення спливаючого повідомлення - імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form")                  // витягуємо форму в JS
form.addEventListener("submit", function handleSubmit (e) {   // Прослуховуємо форму
    e.preventDefault();                                       // Запобігаємо стандартній дії форми


const delay = Number(form.delay.value)          // Отримуємо значення затримки як рядок та перетворюємо його в число
const state = form.state.value                               // Отримуємо значення стану як рядок



// Створюємо новий об'єкт Promise
const promise = new Promise ((resolve, reject) => { 
//Використовуємо setTimeout для затримки виконання коду всередині функції на вказану кількість мілісекунд, що визначена змінною delay.
    setTimeout(()=>                                    
    {
      if (state === "fulfilled") {     //якщо state дорівнює "fulfilled" то умова виконата, а якщо "rejected" то відхилена
        resolve(delay);                         
      } else {
        reject(delay);
      }
    }, delay);                         //значення затримки введеним користувачем в полі форми 
});


//^ Оброблюємо promise
    promise
    .then((delay) => {                                              //*Використовуємо метод then якщо операція пройшла успішно
      console.log(`✅ Fulfilled promise in ${delay}ms`);           // Виводимо повідомлення про успішне виконання обіцянки в консоль
      iziToast.success({                                           //Використання бібліотеки iziToast для відображення спливаючого повідомлення про успіх
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
      });
    })
    .catch((delay) => {                                           //*Використовуємо метод catch якщо операція пройшла невдало
      console.log(`❌ Rejected promise in ${delay}ms`);           // Виводимо повідомлення про відхилення обіцянки в консоль
      iziToast.error({                                            //Використання бібліотеки iziToast для відображення спливаючого повідомлення про помилку
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
    });
});

