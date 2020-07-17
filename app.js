let cars, carsLength;
let counter = 1;
let clickable = true;
const carList = document.querySelectorAll('.list-item');
const middleCar = document.querySelector('.center');

fetch('./cars.json')
.then(response => response.json())
.then(obj => {
    cars = obj;
    displayCars();
})


function displayCars() {

/* infinite slider */
    carsLength = Object.keys(cars).length;
    let car = cars[`car${counter % carsLength}`]
    let prevCar = cars[`car${(counter - 1 + carsLength) % carsLength}`];
    let nextCar = cars[`car${(counter + 1) % carsLength}`];

/* inject car img&info from provided JSON */
    carList[0].innerHTML = `
        <h2>${prevCar.name}</h2>
        <img onClick={nextSlide(false)} src="${prevCar.path}"/>
        <p>${prevCar.desc}</p>
    `;
    carList[1].innerHTML = `
        <h2>${car.name}</h2>
        <img src="${car.path}"/>
        <p>${car.desc}</p>
    `;
    carList[2].innerHTML = `
        <h2>${nextCar.name}</h2>
        <img onClick={nextSlide(true)} src="${nextCar.path}"/>
        <p>${nextCar.desc}</p>
    `;

};

/* based on boolean arg next or previous Slide */

function nextSlide(forward) {    
    if (!clickable) return;

    if (forward) {
        clickable = false;
        counter++;
        middleCar.classList.add('toLeft');
        displayCars();
    }
    else {
        clickable = false;
        console.log(counter)
        if (counter == 0){
            counter = carsLength-1;
        }
        else {
            counter--
        }
        middleCar.classList.add('toRight');
        displayCars();
    }
}

/* prev/next buttons active when animation ends & reset class for middle car  */

middleCar.addEventListener('animationend', ()=>{
    clickable = true;
    middleCar.className = 'list-item center';
})

/* Buttons listeners */

const nextBtn = document.querySelector('.nextBtn');
nextBtn.addEventListener('click', () => nextSlide(true));

const prevBtn = document.querySelector('.prevBtn');
prevBtn.addEventListener('click', () => nextSlide(false))