const cars = [
    {
        id: 1,
        name: "BMW X5 xDrive",
        price: "7 500 000 ₽",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Audi A6 Business",
        price: "5 200 000 ₽",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Mercedes-Benz GLC",
        price: "6 800 000 ₽",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80"
    }
];

function renderCatalog() {
    const carGrid = document.getElementById('carGrid');
    carGrid.innerHTML = '';

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');
        
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-price">${car.price}</div>
                <button class="btn" onclick="bookCar('${car.name}')">Забронировать</button>
            </div>
        `;
        
        carGrid.appendChild(carCard);
    });
}

function bookCar(carName) {
    const phoneInput = document.getElementById('clientPhone');
    alert(`Вы выбрали "${carName}". Пожалуйста, заполните форму ниже или укажите телефон, и мы свяжемся с вами!`);
    document.querySelector('.booking-section').scrollIntoView({ behavior: 'smooth' });
    phoneInput.focus();
}

document.getElementById('testDriveForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const messageElement = document.getElementById('formMessage');

    
    messageElement.textContent = `Спасибо, ${name}! Ваша заявка принята. Менеджер позвонит на номер ${phone} в течение 15 минут.`;
    
    this.reset();
});

document.addEventListener('DOMContentLoaded', renderCatalog);