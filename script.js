// База данных машин с уникальными характеристиками и ценами
const cars = [
    {
        id: 1,
        name: "BMW X5 xDrive",
        description: "Роскошный спортивный кроссовер с непревзойденной динамикой и комфортом премиум-класса.",
        power: "340 л.с.",
        time: "5.5 сек",
        drive: "Полный (AWD)",
        price: "7 500 000 ₽",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Audi A6 Business",
        description: "Элегантный бизнес-седан с перенсивыми технологиями и безупречной управляемостью на дороге.",
        power: "245 л.с.",
        time: "6.8 сек",
        drive: "Передний / Полный",
        price: "5 200 000 ₽",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Mercedes-Benz GLC",
        description: "Инновационный премиальный внедорожник, сочетающий стиль, безопасность и просторный салон.",
        power: "258 л.с.",
        time: "6.2 сек",
        drive: "Полный (4MATIC)",
        price: "6 800 000 ₽",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Porsche Cayenne Sport",
        description: "Настоящий спортивный характер в кузове мощного и престижного кроссовера.",
        power: "440 л.с.",
        time: "4.8 сек",
        drive: "Полный (AWD)",
        price: "11 500 000 ₽",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
    }
];

let currentIndex = 0;

// Элементы DOM
const carCard = document.getElementById('carCard');
const carImage = document.getElementById('carImage');
const carName = document.getElementById('carName');
const carDescription = document.getElementById('carDescription');
const specPower = document.getElementById('specPower');
const specTime = document.getElementById('specTime');
const specDrive = document.getElementById('specDrive');
const carPrice = document.getElementById('carPrice');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Функция обновления данных с плавной анимацией
function updateCarSlide(index) {
    // Сначала добавляем класс анимации исчезновения (fade)
    carCard.classList.add('fade');

    setTimeout(() => {
        // Подставляем данные текущей машины из массива
        const car = cars[index];
        carImage.src = car.image;
        carName.textContent = car.name;
        carDescription.textContent = car.description;
        specPower.textContent = car.power;
        specTime.textContent = car.time;
        specDrive.textContent = car.drive;
        carPrice.textContent = car.price;

        // Убираем класс анимации, чтобы карточка плавно проявилась обратно
        carCard.classList.remove('fade');
    }, 300); // 300мс совпадает с transition в CSS
}

// Кнопка "Вперед"
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cars.length;
    updateCarSlide(currentIndex);
});

// Кнопка "Назад"
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cars.length) % cars.length;
    updateCarSlide(currentIndex);
});

// Функция бронирования выбранного в данный момент автомобиля
function bookCurrentCar() {
    const currentCar = cars[currentIndex];
    const phoneInput = document.getElementById('clientPhone');
    alert(`Вы выбрали "${currentCar.name}" (${currentCar.price}). Заполните форму ниже, и мы забронируем её для вас!`);
    document.querySelector('.booking-section').scrollIntoView({ behavior: 'smooth' });
    phoneInput.focus();
}

// Обработка формы
document.getElementById('testDriveForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const messageElement = document.getElementById('formMessage');

    messageElement.textContent = `Спасибо, ${name}! Ваша заявка на тест-драйв принята. Менеджер свяжется с вами по номеру ${phone}.`;
    this.reset();
});

// Первичная загрузка первой машины при открытии сайта
document.addEventListener('DOMContentLoaded', () => {
    updateCarSlide(currentIndex);
});