
/*

    MOD RULES

    rules:
        1. class must begin with uppercase
        2. class must extends from class "Block"
        3. in the arguments of constructor you must pass "x" and "y"
        4. in constructor you must create variable "properties" 
            with key "type" with the value of block name (must begin with uppercase)
        5. after variable "properties" you must call a function super(x, y, properties)
        6. create function tick() in your class. In this function will be logic of your block
        7. you must push your block name into array "allBlocks"
        8. block type in array "allBlocks" must be the same with his class name

        [!] you can use URLofsite/create.html and code will generate automaticly 

    hints:
        1. if you want "redstone" mode for your block - write 'this.redstone();' in the tick() function
        2. to charge block you can write:
            block.charge(true);

    abbreviations:
        1. cbch     = can be charged by something else
        2. cch      = can charge anything else (in this case blocks around this block will not verify charge)
        3. morch    = my own rules of charging (in this case blocks will not check for their charge) | not recomended 
        4. cbo      = can be opened by click

*/

let allBlocks = [
    {
        type: 'Redstone',
        title: 'Питание'
    },
    {
        type: 'Arrow',
        title: 'Стрелочка'
    },
    {
        type: 'Lamp',
        title: 'Лампа'
    },
    {
        type: 'Hub',
        title: 'Хаб'
    },
    {
        type: 'And',
        title: 'ИИ'
    },
    {
        type: 'Negative',
        title: 'Отрицание'
    },
    {
        type: 'Code',
        title: 'Командный блок'
    },
    {
        type: 'Matrix',
        title: 'матрица'
    },
    {
        type: 'Pointer',
        title: 'Указатель'
    },
    {
        type: 'Binadder',
        title: 'Сумматор'
    }
    
];

for(let mod of mods)
{
    $(`#${mod}`).on('load', function() {
        let files;
        eval(`files = ${mod}_Main.blocks`);
        for(let file of files)
        {
            let img;
            eval(`img = ${mod}_Main.imgs.find(el => el.block == file[1]).src`);
            allBlocks.push(
                {
                    type: file[1],
                    title: file[2],
                    mod: true,
                    src: img
                }
            );
        }
        renderMenu();
    })
}


class Redstone extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type:       'Redstone',
            cbch:       false,
            charged:    true,
            settings: false
        }

        properties.settings = settings;
        
        super(x, y, properties);
    }

    tick()
    {
        this.redstone();
    }
}

class Arrow extends Block {
    constructor(x, y, settings = false)
    {

        let properties = {
            type: 'Arrow',
            direction: config.user.arrowDirection,
            settings: false
        }

        properties.settings = settings;
        
        super(x, y, properties);
    }

    tick()
    {
    
        if(this.charged)
        {
            this.checkCharge();
            this.cases(
                block => {
                    if(block.cbch && this.direction == 'top')
                    {
                        if( (block.type == 'Arrow' && block.direction != 'bottom') || block.type != 'Arrow')
                        {
                            block.charge(true);
                        }
                    }
                },
                block => {
                    if(block.cbch && this.direction == 'right')
                    {
                        if( (block.type == 'Arrow' && block.direction != 'left') || block.type != 'Arrow' )
                        {
                            block.charge(true);
                        }
                    }
                },
                block => {
                    if(block.cbch && this.direction == 'bottom')
                    {
                        if( (block.type == 'Arrow' && block.direction != 'top') || block.type != 'Arrow' )
                        {
                            block.charge(true);
                        }
                    }
                },
                block => {
                    if(block.cbch && this.direction == 'left')
                    {
                        if( (block.type == 'Arrow' && block.direction != 'right') || block.type != 'Arrow' )
                        {
                            block.charge(true);
                        }
                    }
                }
            )
        }

        
    }
}

class Lamp extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type:   'Lamp',
            cch:    false,
            settings: false
        }

        properties.settings = settings;

        super(x, y, properties);
    }

    tick()
    {
        this.checkCharge();
    }
}

class Hub extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type: 'Hub',
            settings: false
        }

        properties.settings = settings;

        super(x, y, properties);
    }

    tick()
    {
        this.checkCharge();

        if(this.charged)
        {
            this.redstone();
        }
    }
}

class And extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type:   'And',
            cbch:   false,
            cch:    true,
            settings: false
        }

        properties.settings = settings;

        super(x, y, properties);
    }

    tick()
    {

        let blocksAround = [

        ]

        this.cases(
            block => {
                blocksAround.push({
                    position: 'top',
                    block: block
                });
            },
            block => {
                blocksAround.push({
                    position: 'right',
                    block: block
                });
            },
            block => {
                blocksAround.push({
                    position: 'bottom',
                    block: block
                });
            },
            block => {
                blocksAround.push({
                    position: 'left',
                    block: block
                });
            }
        )

        let inputs = [];
        let outputs = [];

        for(let jsonblock of blocksAround)
        {
            if(jsonblock.position == 'top')
            {
                let blck = jsonblock.block;
                if(blck.type == 'Arrow')
                {
                    if(blck.direction == 'bottom' && blck.charged) {inputs.push(blck);}
                    if(blck.direction != 'bottom') {outputs.push(blck);}
                }
            }
            if(jsonblock.position == 'right')
            {
                let blck = jsonblock.block;
                if(blck.type == 'Arrow')
                {
                    if(blck.direction == 'left' && blck.charged) {inputs.push(blck)}
                    if(blck.direction != 'left') {outputs.push(blck)}
                }
            }
            if(jsonblock.position == 'bottom')
            {
                let blck = jsonblock.block;
                if(blck.type == 'Arrow')
                {
                    if(blck.direction == 'top' && blck.charged) {inputs.push(blck)}
                    if(blck.direction != 'top') {outputs.push(blck)}
                }
            }
            if(jsonblock.position == 'left')
            {
                let blck = jsonblock.block;
                if(blck.type == 'Arrow')
                {
                    if(blck.direction == 'right' && blck.charged) {inputs.push(blck)}
                    if(blck.direction != 'right') {outputs.push(blck)}
                }
            }
        }

        if(inputs.length >= 2)
        {
            this.charge(true);
            for(let output of outputs)
            {
                output.charge(true);
            }
        }else{
            this.charge(false);
        }
        
    }
}

class Negative extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type: 'Negative',
            charged: true,
            cbch: false,
            settings: false
        }

        properties.settings = settings;

        super(x, y, properties);

        this.canOn = true;
        this.canOff = false;
        
    }

    tick()
    {
        
        let chargeOff = false;

        this.cases(
            block => {
                if(block.cch && block.charged)
                {
                    if(block.type == 'Arrow' && block.direction == 'bottom')
                    {
                        chargeOff = true;
                    }else if(block.type != 'Arrow')
                    {
                        chargeOff = true;
                    }
                }
                if(block.cbch && this.charged)
                {
                    if(block.type == 'Arrow' && block.direction != 'bottom' && block.charged == false && this.charged == true)
                    {
                        block.charge(true);
                    }else if(block.type != 'Arrow')
                    {
                        block.charge(true);
                    }
                }
                
            },
            block => {
                if(block.cch && block.charged)
                {
                    if(block.type == 'Arrow' && block.direction == 'left')
                    {
                        chargeOff = true;
                    }else if(block.type != 'Arrow')
                    {
                        chargeOff = true;
                    }
                }
                if(block.cbch && this.charged)
                {
                    if(block.type == 'Arrow' && block.direction != 'left' && block.charged == false && this.charged == true)
                    {
                        block.charge(true);
                    }else if(block.type != 'Arrow')
                    {
                        block.charge(true);
                    }
                }
            },
            block => {
                if(block.cch && block.charged)
                {
                    if(block.type == 'Arrow' && block.direction == 'top')
                    {
                        chargeOff = true;
                    }else if(block.type != 'Arrow')
                    {
                        chargeOff = true;
                    }
                }
                if(block.cbch && this.charged)
                {
                    if(block.type == 'Arrow' && block.direction != 'top' && block.charged == false && this.charged == true)
                    {
                        block.charge(true);
                    }else if(block.type != 'Arrow')
                    {
                        block.charge(true);
                    }
                }
            },
            block => {
                if(block.cch && block.charged)
                {
                    if(block.type == 'Arrow' && block.direction == 'right')
                    {
                        chargeOff = true;
                    }else if(block.type != 'Arrow')
                    {
                        chargeOff = true;
                    }
                }
                if(block.cbch && this.charged)
                {
                    if(block.type == 'Arrow' && block.direction != 'right' && block.charged == false && this.charged == true)
                    {
                        block.charge(true);
                    }else if(block.type != 'Arrow')
                    {
                        block.charge(true);
                    }
                }
            }
        )

        if(chargeOff)
        {
            if(this.canOff)
            {
                this.charge(false);
                this.canOn = true;
                this.canOff = false;
            }
        }else{

            if(this.canOn)
            {
                this.charge(true);
                this.canOn = false;
                this.canOff = true;
            }
            
        }

    }
}

class Code extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type: 'Code',
            cch: false,
            settings: false,
            cbo: true
        }

        properties.settings = settings;

        super(x, y, properties);
        
        if(!this.command)
        {
            this.command = ``;
        }
        this.openedIde = false;
        this.first = true;

        
    }

    tick()
    {
        this.checkCharge();
        if(this.charged && this.first)
        {
            try {
                eval(this.command);
            } catch (e) {
                new Msg(`[ОШИБКА] Блок x: ${this.x} y: ${this.y} <br> Подробности в консоли (ctrl + shift + i)`, 1, 10);
                log('------');
                log(`Ошибка блока x: ${this.x} y: ${this.y}`);
                log(`При выполнении команды: ${this.command}`);
                log(' ');
                log(e.toString());
                log('------');
            }
            this.first = false;
        }

        if(!this.charged)
        {
            this.first = true;
        }
    }

    matrix(x, y, text)
    {

        x = x.toString();
        y = y.toString();
        x.includes('~') ? x = this.x + Number(x.replace('~', '')) : x = Number(x);
        y.includes('~') ? y = this.y + Number(y.replace('~', '')) : y = Number(y);

        for(let block of blocks)
        {
            if(block.x == x && block.y == y && block.type == 'Matrix')
            {
                block.text = text;
                block.again = true;
            }
        }
    }

    openIde()
    {
        if(this.openedIde != true)
        {
            let ide = document.createElement('div');
            ide.classList.add('codeIDE');
            ide.id = `ide${this.id()}`;
            ide.innerHTML = `
            <textarea spellcheck="false">${this.command}</textarea>
            <div class="codeIDE__btns">
                <button class="saveCodeMenu" onclick="blocks[${this.id()}].command = this.parentNode.parentNode.querySelector('textarea').value; this.parentNode.parentNode.remove(); blocks[${this.id()}].openedIde = false; config.user.countIdeOpened--; if(config.user.countIdeOpened == 0){config.user.codeMenu = false}">Сохранить</button>
                <button onclick="this.parentNode.parentNode.remove(); blocks[${this.id()}].openedIde = false; config.user.countIdeOpened--; if(config.user.countIdeOpened == 0){config.user.codeMenu = false}">Закрыть</button>
            </div>`;
            ide.setAttribute('style', `top: ${this.y * this.oneBlock}px; left: ${this.x * this.oneBlock}px`);
            $('body').append(ide);
            config.user.countIdeOpened++; 
        }
        this.openedIde = true;
    }

    delBlock(x, y)
    {
        x = x.toString();
        y = y.toString();
        x.includes('~') ? x = this.x + Number(x.replace('~', '')) : x = Number(x);
        y.includes('~') ? y = this.y + Number(y.replace('~', '')) : y = Number(y);
        
        
        for(let block of blocks)
        {
            if(block.x == x && block.y == y)
            {
                block.remove();
            }
        }
    }

    addBlock(type, x, y, properties = false)
    {

        

        x = x.toString();
        y = y.toString();
        x.includes('~') ? x = this.x + Number(x.replace('~', '')) : x = Number(x);
        y.includes('~') ? y = this.y + Number(y.replace('~', '')) : y = Number(y);

        let block = type[0].toUpperCase() + type.slice(1).toLowerCase(); 
        if(properties != false)
        {
            let keys = Object.keys(properties);
            for(let key of keys)
            {
                eval(`block.${key} = ${properties[key]}`);
            }
        }
        eval(`blocks.push(new ${block}(${x}, ${y}))`);
    }

    replace(x, y, x2, y2)
    {
        let block = blocks.find(el => el.x == x && el.y == y);
        if(block != undefined) {
            block.x = x2;
            block.y = y2;
            block.draw(1);
            clearBlock(x, y);
        }
            
    }

    alert(msg)
    {

    }

    click()
    {
        this.openIde();
        config.user.codeMenu = true;
    }
}

class Matrix extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type: 'Matrix',
            cbch: false,
            cch: false,
            settings: false,
            cbo: true
        }

        properties.settings = settings;

        super(x, y, properties);

        this.text = '';
        this.again = true;
    }

    tick()
    {
        if(this.again)
        {
            cnv(
                () => {
                    this.draw(1);
                    ctx.font = "40px arial";
                    ctx.fillStyle = '#00ff00';
                    ctx.fillText(this.text, this.x * this.oneBlock - this.oneBlock / 1.25, this.y * this.oneBlock - this.oneBlock / 10);
                }
            )
            this.again = false;
        }
    }

    click()
    {
        this.text = '';
        this.again = true;
    }
}

class Pointer extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type: 'Pointer',
            cbch: false,
            settings: false
        }

        properties.settings = settings;

        super(x, y, properties);
    }

    tick()
    {

        let founded = false;

        this.cases(
            block => {
                if(block.cbch)
                {
                    if( 
                        (block.type == 'Arrow' && block.direction != 'bottom') 
                        ||
                        (block.type != 'Arrow')
                    )
                    {
                        this.foundBlock(this.x, this.y + 1, secondBlock => {
                            if(secondBlock.cch && secondBlock.charged)
                            {
                                if(secondBlock.type == 'Arrow' && secondBlock.direction == 'top')
                                {
                                    block.charge(true);
                                    founded = true;
                                }else if(secondBlock.type !=  'Arrow')
                                {
                                    block.charge(true);
                                    founded = true;
                                }
                            }else if(secondBlock.cch && !secondBlock.charged)
                            {
                                block.charge(false);
                            }
                        }, false, () => {
                            block.charge(false);
                        });
                    }
                }
            },
            block => {
                if(block.cbch)
                {
                    if( 
                        (block.type == 'Arrow' && block.direction != 'left') 
                        ||
                        (block.type != 'Arrow')
                    )
                    {
                        this.foundBlock(this.x - 1, this.y, secondBlock => {
                            if(secondBlock.cch && secondBlock.charged)
                            {
                                if(secondBlock.type == 'Arrow' && secondBlock.direction == 'right')
                                {
                                    block.charge(true);
                                    founded = true;
                                }else if(secondBlock.type !=  'Arrow')
                                {
                                    block.charge(true);
                                    founded = true;
                                }
                            }else if(secondBlock.cch && !secondBlock.charged)
                            {
                                block.charge(false);
                            }
                        }, false, () => {
                            block.charge(false);
                        });
                    }
                }
            },
            block => {
                if(block.cbch)
                {
                    if( 
                        (block.type == 'Arrow' && block.direction != 'top') 
                        ||
                        (block.type != 'Arrow')
                    )
                    {
                        this.foundBlock(this.x, this.y - 1, secondBlock => {
                            if(secondBlock.cch && secondBlock.charged)
                            {
                                if(secondBlock.type == 'Arrow' && secondBlock.direction == 'bottom')
                                {
                                    block.charge(true);
                                    founded = true;
                                }else if(secondBlock.type !=  'Arrow')
                                {
                                    block.charge(true);
                                    founded = true;
                                }
                            }else if(secondBlock.cch && !secondBlock.charged)
                            {
                                block.charge(false);
                            }
                        }, false, () => {
                            block.charge(false);
                        });
                    }
                }
            },
            block => {
                if(block.cbch)
                {
                    if( 
                        (block.type == 'Arrow' && block.direction != 'right') 
                        ||
                        (block.type != 'Arrow')
                    )
                    {
                        this.foundBlock(this.x + 1, this.y, secondBlock => {
                            if(secondBlock.cch && secondBlock.charged)
                            {
                                if(secondBlock.type == 'Arrow' && secondBlock.direction == 'left')
                                {
                                    block.charge(true);
                                    founded = true;
                                }else if(secondBlock.type !=  'Arrow')
                                {
                                    block.charge(true);
                                    founded = true;
                                }
                            }else if(secondBlock.cch && !secondBlock.charged)
                            {
                                block.charge(false);
                            }
                        }, false, () => {
                            block.charge(false);
                        });
                    }
                }
            }
        )

        if(founded)
        {
            this.charge(true);
        }else{
            this.charge(false);
        }
        
    }
}


class Binadder extends Block {
    constructor(x, y, settings = false)
    {
        let properties = {
            type: 'Binadder',
            settings: false,
            cbch: false,
            cbo: true
        }

        properties.settings = settings;

        super(x, y, properties);

        if(!this.defaultOutput){
            this.defaultOutput = 'right';
        }
    }

    tick()
    {

        let inputs = [];
        let sum;
        let remainder;

        this.cases(
            block => {
                if(block.cch && block.charged) {
                    if(block.type == 'Arrow') {
                        if(block.direction == 'bottom') {
                            inputs.push(block);
                        }
                    }else{
                        inputs.push(block);
                    }
                }
                if(block.cbch){
                    if(block.type == 'Arrow') {
                        if(block.direction != 'bottom') {
                            if(this.defaultOutput == 'top') {remainder = block} else{
                                sum = block;
                            };
                        }
                    }else{
                        if(this.defaultOutput == 'top') {remainder = block} else{
                            sum = block;
                        };
                    }
                    
                }
            },
            block => {
                if(block.cch && block.charged) {
                    if(block.type == 'Arrow') {
                        if(block.direction == 'left') {
                            inputs.push(block);
                        }
                    }else{
                        inputs.push(block);
                    }
                }
                if(block.cbch){
                    if(block.type == 'Arrow') {
                        if(block.direction != 'left') {
                            if(this.defaultOutput == 'right') {remainder = block} else{
                                sum = block;
                            };
                        }
                    }else{
                        if(this.defaultOutput == 'right') {remainder = block} else{
                            sum = block;
                        };
                    }
                }
            },
            block => {
                if(block.cch && block.charged) {
                    if(block.type == 'Arrow') {
                        if(block.direction == 'top') {
                            inputs.push(block);
                        }
                    }else{
                        inputs.push(block);
                    }
                }
                if(block.cbch){
                    if(block.type == 'Arrow') {
                        if(block.direction != 'top') {
                            if(this.defaultOutput == 'bottom') {remainder = block} else{
                                sum = block;
                            };
                        }
                    }else{
                        if(this.defaultOutput == 'bottom') {remainder = block} else{
                            sum = block;
                        };
                    }
                }
            },
            block => {
                if(block.cch && block.charged) {
                    if(block.type == 'Arrow') {
                        if(block.direction == 'right') {
                            inputs.push(block);
                        }
                    }else{
                        inputs.push(block);
                    }
                }
                if(block.cbch){
                    if(block.type == 'Arrow') {
                        if(block.direction != 'right') {
                            if(this.defaultOutput == 'left') {remainder = block} else{
                                sum = block;
                            };
                        }
                    }else{
                        if(this.defaultOutput == 'left') {remainder = block} else{
                            sum = block;
                        };
                    }
                }
            }
        )

        if(inputs.length > 0 && remainder != undefined && sum != undefined)
        {
            let chargedInputs = inputs.filter(input => input.charged);
            if(chargedInputs.length == 2) {
                this.charge(true);
                remainder.charge(true);
                sum.charge(false);
            }else if(chargedInputs.length == 1) {
                this.charge(true);
                sum.charge(true);
                remainder.charge(false);
            }
        }else{
            this.charge(false);
        }
    }

    click() {
        if(this.defaultOutput == 'right') {new Msg(`Остаток двоичного сумматора x${this.x} y${this.y} будет выводиться <b style="font-size: 1.2em; font-weight: bold;">вниз</b>`);this.defaultOutput = 'bottom';}else
        if(this.defaultOutput == 'bottom') {new Msg(`Остаток двоичного сумматора x${this.x} y${this.y} будет выводиться <b style="font-size: 1.2em; font-weight: bold;">влево</b>`);this.defaultOutput = 'left';}else
        if(this.defaultOutput == 'left') {new Msg(`Остаток двоичного сумматора x${this.x} y${this.y} будет выводиться <b style="font-size: 1.2em; font-weight: bold;">вверх</b>`);this.defaultOutput = 'top';}else
        if(this.defaultOutput == 'top') {new Msg(`Остаток двоичного сумматора x${this.x} y${this.y} будет выводиться <b style="font-size: 1.2em; font-weight: bold;">вправо</b>`);this.defaultOutput = 'right';}
    }
}






/* 

    Krekcr | 2021
    if you want to cooperate: vk.com/krekcr || shilenkok@bk.ru

*/