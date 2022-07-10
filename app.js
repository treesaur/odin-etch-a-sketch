//get various elements/tags
const container = document.querySelector('.container');
const square = document.createElement('div');
square.className = 'box';
square.style.backgroundColor = 'black';
square.style.border = "1px solid white";

//make default 16x16 grid on page load
createNewGrid(16);
turnColorOff();

//make new grid when user clicks 'new grid' button
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    let sides = prompt("How many squares per side?");

    while (parseInt(sides) > 100 || isNaN(parseInt(sides))) {
        if (parseInt(sides) > 100) {
            sides = prompt("Must be 100 or less. How many squares per side?");
        } else if (sides === null) {
            return;
        } else if (isNaN(parseInt(sides))) {
            sides = prompt("Must be a number. How many squares per side?")
        }
    }

    createNewGrid(parseInt(sides));
    turnColorOff();
})

//turn to normal or color modes
const modes = document.querySelectorAll('.mode');
modes.forEach((mode) => {
    mode.addEventListener('click', () => {
        if (mode.id === 'color') {
            turnColorOn();
        } else if (mode.id === 'normal') {
            turnColorOff();
        }
    })
});

function turnColorOn () {
    const squares = document.querySelectorAll('.box');

    squares.forEach((sq) => {
        let test = true
        sq.addEventListener('mouseover', () => {
            if (test) {
                sq.style.backgroundColor = `gray`;
                setTimeout(() => {
                    sq.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                }, 100);
                test = false;
            }
        })
    })
}

function turnColorOff () {
    const squares = document.querySelectorAll('.box');

    squares.forEach((sq) => {
        let test = true
        sq.addEventListener('mouseover', () => {
            if (test) {
                sq.style.backgroundColor = 'gray';
                setTimeout(() => {
                    sq.style.backgroundColor = 'lightgray';
                }, 100)
                test = false;
            }
        })
    })
}


// create new Grid function (removes old grid, creates new grid, and adds event listener)
function createNewGrid(size) {
    if (!size) return

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 1; i <= size*size; i++) {
        container.appendChild(square.cloneNode(true));
    }
}

// reset the grid (keeps same grid size, removes colored tiles)
function resetGrid() {
    const squares = document.querySelectorAll('.box');

    squares.forEach((sq) => {
        sq.style.backgroundColor = 'black';
    })
}

const reset = document.querySelector('#reset');

reset.addEventListener('click', () => {
    resetGrid();
})






