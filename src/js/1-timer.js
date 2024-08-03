// Календар бібліотека
import flatpickr from "flatpickr";
// Календар бібліотека - імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Alert бібліотека
import iziToast from "izitoast";
// Alert бібліотека - імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const inputEl = document.querySelector("#datetime-picker");
const button = document.querySelector("button[data-start]");


let userSelectedDate;
let countInterval;     

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const currentDate = new Date();
if (inputEl.value === ''|| userSelectedDate < currentDate) {   //якщо input порожній і вибрана дата користувачем меньша за сьогоднішню, то:
    button.disabled = true;                                    // кнопка не працює
    iziToast.error({                                           // використовуємо бібліотеку щоб відобразити alert
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: 'Please choose a date in the future'
    })
} else {                                                       //якщо input не порожній і вибрана дата користувачем більша за теперішню
button.disabled = false;                                      // кнопка працює
}
    },
};

flatpickr(inputEl, options)                     // !виклик функції має бути після функції - ця фун. є бібліотекою яка приймає параментер "кнопка" і умову вище


//Додаємо ще один нуль перед числом для того щоб показувало 00:00:00:00
//Приймає число -> перетворює його в рядок -> і додає в початок "0" якщо число меньше 2-х знаків
function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}


//Конвертація мілісекундів в дні, години, хвилини та секунди
function convertMs(ms) {
    // Кількість мілісекунд в одній одиниці часу
    const second = 1000;                // 1 секунда = 1000 мілісекунд
    const minute = second * 60;         // 1 хвилина = 60 секунд
    const hour = minute * 60;           // 1 година = 60 хвилин
    const day = hour * 24;              // 1 день = 24 години
  
 // Обчислення днів
    const days = Math.floor(ms / day);            // Кількість повних днів
 // Обчислення годин
    const hours = Math.floor((ms % day) / hour); // Залишок годин після обчислення днів
// Обчислення хвилин
    const minutes = Math.floor(((ms % day) % hour) / minute); // Залишок хвилин після обчислення годин
    // Обчислення секунд
    const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Залишок секунд після обчислення хвилин
  
    return { days, hours, minutes, seconds };
  }
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  


// Функція для оновлення відображення таймера
function updateTimer(days, hours, minutes, seconds) {
  document.querySelector("span.value[data-days]").textContent = addLeadingZero(days);     // Знаходимо елемент з атрибутом data-days та оновлюємо його текстовий вміст, додавши провідний нуль, якщо потрібно
  document.querySelector("span.value[data-hours]").textContent = addLeadingZero(hours);   // Знаходимо елемент з атрибутом data-hours та оновлюємо його текстовий вміст, додавши провідний нуль, якщо потрібно
  document.querySelector("span.value[data-minutes]").textContent = addLeadingZero(minutes);  // Знаходимо елемент з атрибутом data-minutes та оновлюємо його текстовий вміст, додавши провідний нуль, якщо потрібно
  document.querySelector("span.value[data-seconds]").textContent = addLeadingZero(seconds);  // Знаходимо елемент з атрибутом data-seconds та оновлюємо його текстовий вміст, додавши провідний нуль, якщо потрібно
};


//^   Функція для запуску таймера

function startTimer() {
// Вимикаємо кнопку, щоб користувач не міг натискати її під час таймера
    button.disabled = true;

    // Встановлюємо інтервал, який буде виконуватися кожну секунду
    countInterval = setInterval(() => {

// Отримуємо поточний час у мілісекундах
    const now = Date.now();

// Обчислюємо різницю між вибраною датою та поточним часом
    const difference = userSelectedDate.getTime() - now;

// Якщо різниця менша або дорівнює нулю (таймер закінчився або вже пройшов)
    if(difference <= 0) {

// Очищаємо інтервал, щоб припинити оновлення таймера
        clearInterval(countInterval);

// Включаємо кнопку знову, дозволяючи користувачеві натискати її
        button.disabled = false;

// Відображаємо повідомлення про завершення таймера за допомогою iziToast
        iziToast.show({
            title: 'Time is up!',
            message: 'The countdown has reached zero.',
            color: 'green',
            position: 'topCenter'
        });

// Виходимо з функції, оскільки таймер закінчився
        return;
    }

// Перетворюємо залишок часу в дні, години, хвилини та секунди
 const { days, hours, minutes, seconds  } = convertMs(difference);

// Оновлюємо відображення таймера на сторінці
 updateTimer(days, hours, minutes, seconds);
}, 1000); // Інтервал в 1000 мілісекунд (1 секунда)
    }

    // Додаємо обробник подій на кнопку з атрибутом data-start
document.querySelector("[data-start]").addEventListener("click", startTimer);







