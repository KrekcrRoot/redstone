

let canv = document.querySelector('#fg');
let ctx  = canv.getContext('2d');

canv.width  = window.innerWidth;
canv.height = window.innerHeight;

let blocks = [];


function tick()
{
    for(let i = blocks.length - 1; i >= 0; i--)
    {
        blocks[i].tick();
    }
}

function render()
{
    if(config.game.render == true)
    {
        tick();
    }

    window.requestAnimationFrame(render);
}

render();

let timeout;

window.addEventListener('resize', () => {
    canv.width  = window.innerWidth;
    canv.height = window.innerHeight;
    canvEffect.width = window.innerWidth;
    canvEffect.height = window.innerHeight;
    canvBg.width  = window.innerWidth;
    canvBg.height = window.innerHeight;
    clearTimeout(timeout);
    timeout = setTimeout( function() {
        grid();
        for(let block of blocks)
        {
            block.draw(1);
        }
    }, 100); 
    
})



/* 

    Krekcr | 2021
    if you want to cooperate: vk.com/krekcr || shilenkok@bk.ru

*/