

let canvBg  = document.querySelector('#bg');
let bg      = canvBg.getContext('2d');

canvBg.width  = window.innerWidth;
canvBg.height = window.innerHeight;

function grid()
{


    let maxGrid = {
        x: Math.ceil(window.innerWidth / config.bg.gridSize),
        y: Math.ceil(window.innerHeight / config.bg.gridSize),
    }

    bg.strokeStyle = config.bg.gridColor;

    for(let x = 0; x < maxGrid.x * config.bg.gridSize; x += config.bg.gridSize)
    {

        bnv(
            () => {
                bg.moveTo(x, 0);
                bg.lineTo(x, canvBg.height);
        
                bg.stroke();
            }
        )

    }

    for(let y = 0; y < maxGrid.y * config.bg.gridSize; y += config.bg.gridSize)
    {

        bnv(
            () => {
                bg.moveTo(0, y);
                bg.lineTo(canvBg.width, y);
        
                bg.stroke();
            }
        )

    }

}

grid();


/* 

    Krekcr | 2021
    if you want to cooperate: vk.com/krekcr || shilenkok@bk.ru

*/