const cars = [
    {
        id: 1,
        name: "BMW X5 xDrive",
        description: "Роскошный спортивный кроссовер с непревзойденной динамикой и комфортом премиум-класса.",
        power: "340 л.с.",
        time: "5.5 сек",
        drive: "Полный (AWD)",
        price: "75 000 000 ₸",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Audi A6 Business",
        description: "Элегантный бизнес-седан с передовыми технологиями и безупречной управляемостью на дороге.",
        power: "245 л.с.",
        time: "6.8 сек",
        drive: "Передний / Полный",
        price: "52 000 000 ₸",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Mercedes-Benz GLC",
        description: "Инновационный премиальный внедорожник, сочетающий стиль, безопасность и просторный салон.",
        power: "258 л.с.",
        time: "6.2 сек",
        drive: "Полный (4MATIC)",
        price: "68 000 000 ₸",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Porsche Cayenne Sport",
        description: "Настоящий спортивный характер в кузове мощного и престижного кроссовера.",
        power: "440 л.с.",
        time: "4.8 сек",
        drive: "Полный (AWD)",
        price: "115 000 000 ₸",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
    }
];

let currentIndex = 0;

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

const bookingModal = document.getElementById('bookingModal');
const bookBtn = document.getElementById('bookBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const selectedCarName = document.getElementById('selectedCarName');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');

const contactsModal = document.getElementById('contactsModal');
const openContactsBtn = document.getElementById('openContactsBtn');
const closeContactsBtn = document.getElementById('closeContactsBtn');

const managerModal = document.getElementById('managerModal');
const closeManagerBtn = document.getElementById('closeManagerBtn');
const managerTableContainer = document.getElementById('managerTableContainer');
const clearBookingsBtn = document.getElementById('clearBookingsBtn');

const imageModal = document.getElementById('imageModal');
const closeImageBtn = document.getElementById('closeImageBtn');

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
                    <th>Тип</th>
                    <th>Имя / Телефон</th>
                    <th>Детали заявки</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
    `;

    bookings.forEach(b => {
        if (b.type === 'trade-in') {
            html += `
                <tr>
                    <td><span style="color:#ff4757; font-weight:bold;">Trade-In</span></td>
                    <td>${b.clientName}<br><small style="color:#aaa;">${b.clientPhone}</small></td>
                    <td>Оценка: <strong>${b.tradeInPrice}</strong></td>
                    <td><button class="btn btn-secondary" style="padding: 6px 12px; margin: 0; font-size: 0.85rem;" onclick="viewTradeIn(${b.id})">Смотреть фото</button></td>
                </tr>
            `;
        } else {
            html += `
                <tr>
                    <td><span style="color:#2ed573; font-weight:bold;">Покупка</span></td>
                    <td>${b.clientName}<br><small style="color:#aaa;">${b.clientPhone}</small></td>
                    <td>${b.carName} (Тест-драйв: ${b.testDrive ? 'Да' : 'Нет'})</td>
                    <td>-</td>
                </tr>
            `;
        }
    });

    html += '</tbody></table>';
    managerTableContainer.innerHTML = html;
}

window.viewTradeIn = function(id) {
    const bookings = getBookings();
    const b = bookings.find(x => x.id === id);
    if (b) {
        document.getElementById('managerViewImage').src = b.tradeInImage;
        document.getElementById('managerViewPrice').textContent = `Оценка: ${b.tradeInPrice}`;
        imageModal.classList.add('active');
    }
};

clearBookingsBtn.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите удалить все заявки?')) {
        localStorage.removeItem('carBookings');
        renderManagerTable();
    }
});

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

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cars.length;
    updateCarSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cars.length) % cars.length;
    updateCarSlide(currentIndex);
});

function openCatalog(e) {
    if (e) e.preventDefault();
    catalogSection.style.display = 'block';
    setTimeout(() => {
        catalogSection.classList.add('visible');
        catalogSection.scrollIntoView({ behavior: 'smooth' });
    }, 10);
}

openCatalogBtn.addEventListener('click', openCatalog);
const navCatalogLink = document.querySelector('a[href="#catalog"]');
if (navCatalogLink) navCatalogLink.addEventListener('click', openCatalog);

openContactsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contactsModal.classList.add('active');
});

closeContactsBtn.addEventListener('click', () => contactsModal.classList.remove('active'));

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
closeImageBtn.addEventListener('click', () => imageModal.classList.remove('active'));

[bookingModal, contactsModal, managerModal, imageModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const testDrive = document.getElementById('testDriveCheckbox').checked;

    if (!clientName || !clientPhone) return;

    saveBooking({
        type: 'buy',
        clientName,
        clientPhone,
        testDrive,
        carName: cars[currentIndex].name,
        carPrice: cars[currentIndex].price
    });

    formMessage.textContent = '✅ Ваша заявка успешно отправлена!';
    formMessage.className = 'form-message success';

    setTimeout(() => { closeModal(); }, 1500);
});

const tradeInFab = document.getElementById('tradeInFab');
const tradeInChat = document.getElementById('tradeInChat');
const closeChatBtn = document.getElementById('closeChatBtn');
const carPhotoInput = document.getElementById('carPhotoInput');
const chatMessages = document.getElementById('chatMessages');
const chatInputArea = document.getElementById('chatInputArea');
const tradeInForm = document.getElementById('tradeInForm');

let currentTradeInImage = '';
let currentTradeInPrice = '';

tradeInFab.addEventListener('click', () => {
    tradeInChat.classList.toggle('active');
});

closeChatBtn.addEventListener('click', () => {
    tradeInChat.classList.remove('active');
});

function addChatMessage(sender, text, isHtml = false) {
    const msg = document.createElement('div');
    msg.className = `msg ${sender}`;
    if (isHtml) msg.innerHTML = text;
    else msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

carPhotoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        currentTradeInImage = event.target.result;
        
        addChatMessage('user', `<img src="${currentTradeInImage}" alt="Мой авто">`, true);
        
        chatInputArea.classList.add('hidden');
        
        setTimeout(() => {
            addChatMessage('bot', 'Анализирую состояние по фото...');
            
            setTimeout(() => {
                const randomPrice = Math.floor(Math.random() * 10 + 3) * 1000000;
                currentTradeInPrice = randomPrice.toLocaleString('ru-RU') + ' ₸';
                
                addChatMessage('bot', `✨ Отличный автомобиль! Моя предварительная оценка: <strong>${currentTradeInPrice}</strong>.<br><br>Оставьте контакты, чтобы зафиксировать эту стоимость.`, true);
                
                tradeInForm.classList.remove('hidden');
                tradeInForm.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 1500);
            
        }, 1000);
    };
    reader.readAsDataURL(file);
});

tradeInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const clientName = document.getElementById('tiName').value.trim();
    const clientPhone = document.getElementById('tiPhone').value.trim();
    
    if(!clientName || !clientPhone) return;

    saveBooking({
        type: 'trade-in',
        clientName,
        clientPhone,
        tradeInPrice: currentTradeInPrice,
        tradeInImage: currentTradeInImage
    });

    addChatMessage('user', `Отправлено: ${clientName}, ${clientPhone}`);
    addChatMessage('bot', `✅ Заявка успешно принята! Наш менеджер скоро свяжется с вами.`);
    
    tradeInForm.innerHTML = '<p style="color: #2ed573; text-align: center; margin-top: 10px;">Заявка передана менеджеру.</p>';
});

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

document.querySelector('a[href="#managers"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('managers').scrollIntoView({ behavior: 'smooth' });
});