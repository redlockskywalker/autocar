// Данные автомобилей
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
        description: "Элегантный бизнес-седан с передовыми технологиями и безупречной управляемостью на дороге.",
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

// Элементы UI
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
const openCatalogBtn = document.getElementById('openCatalogBtn');
const catalogSection = document.getElementById('catalog');

// Элементы модального окна бронирования
const bookingModal = document.getElementById('bookingModal');
const bookBtn = document.getElementById('bookBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const selectedCarName = document.getElementById('selectedCarName');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');

// Элементы контактов
const contactsModal = document.getElementById('contactsModal');
const openContactsBtn = document.getElementById('openContactsBtn');
const closeContactsBtn = document.getElementById('closeContactsBtn');

// Элементы менеджера
const managerModal = document.getElementById('managerModal');
const closeManagerBtn = document.getElementById('closeManagerBtn');
const managerTableContainer = document.getElementById('managerTableContainer');
const clearBookingsBtn = document.getElementById('clearBookingsBtn');

// LocalStorage helpers
function getBookings() {
    return JSON.parse(localStorage.getItem('carBookings') || '[]');
}

function saveBooking(booking) {
    const bookings = getBookings();
    bookings.push({
        id: Date.now(),
        date: new Date().toLocaleString('ru-RU'),
        ...booking
    });
    localStorage.setItem('carBookings', JSON.stringify(bookings));
}

// 2. МЕНЮ МЕНЕДЖЕРА НА САЙТЕ
window.manager = function(password) {
    if (String(password) !== '123123') {
        alert('❌ Неверный пароль менеджера!');
        return 'Ошибка доступа';
    }

    renderManagerTable();
    managerModal.classList.add('active');
    return 'Панель менеджера открыта на сайте';
};

function renderManagerTable() {
    const bookings = getBookings();

    if (bookings.length === 0) {
        managerTableContainer.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">Заявок пока нет.</p>';
        return;
    }

    let html = `
        <table class="manager-table">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Имя</th>
                    <th>Телефон</th>
                    <th>Автомобиль</th>
                    <th>Тест-драйв</th>
                </tr>
            </thead>
            <tbody>
    `;

    bookings.forEach(b => {
        html += `
            <tr>
                <td>${b.date}</td>
                <td>${b.clientName}</td>
                <td>${b.clientPhone}</td>
                <td>${b.carName}</td>
                <td>${b.testDrive ? '<span class="badge-yes">Да</span>' : '<span class="badge-no">Нет</span>'}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    managerTableContainer.innerHTML = html;
}

clearBookingsBtn.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите удалить все заявки?')) {
        localStorage.removeItem('carBookings');
        renderManagerTable();
    }
});

// Обновление карточки авто
function updateCarSlide(index) {
    carCard.classList.add('fade');

    setTimeout(() => {
        const car = cars[index];
        carImage.src = car.image;
        carName.textContent = car.name;
        carDescription.textContent = car.description;
        specPower.textContent = car.power;
        specTime.textContent = car.time;
        specDrive.textContent = car.drive;
        carPrice.textContent = car.price;

        carCard.classList.remove('fade');
    }, 300);
}

// Навигация слайдера
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cars.length;
    updateCarSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cars.length) % cars.length;
    updateCarSlide(currentIndex);
});

// Плавное открытие каталога
openCatalogBtn.addEventListener('click', () => {
    catalogSection.classList.add('visible');
    catalogSection.scrollIntoView({ behavior: 'smooth' });
});

// 3. ОКНО КОНТАКТОВ
openContactsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contactsModal.classList.add('active');
});

closeContactsBtn.addEventListener('click', () => {
    contactsModal.classList.remove('active');
});

// Модальное окно бронирования
function openModal() {
    selectedCarName.textContent = `Автомобиль: ${cars[currentIndex].name}`;
    bookingModal.classList.add('active');
    formMessage.textContent = '';
    formMessage.className = 'form-message';
}

function closeModal() {
    bookingModal.classList.remove('active');
    bookingForm.reset();
}

bookBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
closeManagerBtn.addEventListener('click', () => managerModal.classList.remove('active'));

// Закрытие при клике вне окна
[bookingModal, contactsModal, managerModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});

// Обработка отправки формы
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const testDrive = document.getElementById('testDriveCheckbox').checked;

    if (!clientName || !clientPhone) return;

    saveBooking({
        clientName,
        clientPhone,
        testDrive,
        carName: cars[currentIndex].name,
        carPrice: cars[currentIndex].price
    });

    formMessage.textContent = '✅ Ваша заявка успешно отправлена!';
    formMessage.className = 'form-message success';

    setTimeout(() => {
        closeModal();
    }, 1500);
});

// Стартовая анимация
document.addEventListener('DOMContentLoaded', () => {
    updateCarSlide(currentIndex);

    setTimeout(() => {
        document.querySelector('.hero-title').classList.add('visible');
        document.querySelector('.hero-subtitle').classList.add('visible');
        document.querySelector('.hero-btn').classList.add('visible');
    }, 200);

    console.log('%cПанель менеджера:%c Для вызова введите %cmanager(123123)%c в консоли.', 
        'color: #aaa;', 'color: #fff;', 'color: #ff4757; font-weight: bold;', 'color: #fff;');
});