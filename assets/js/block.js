

/*  
    properties:

    {
        type: 'arrow',
        charged: false,
        cbch: true,
        direction: 'up'
    }

*/


class Block {
    constructor(x, y, properties)
    {
        this.charged    = properties.charged ? true : false;
        this.x          = Number(x);
        this.y          = Number(y);
        this.type       = properties.type;
        typeof properties.cbch != 'undefined' ? this.cbch = properties.cbch : this.cbch = true; 
        typeof properties.cch != 'undefined' ? this.cch = properties.cch : this.cch = true; 
        typeof properties.morch != 'undefined' ? this.morch = properties.morch : this.morch = false; 
        typeof properties.cbo != 'undefined' ? this.cbo = properties.cbo : this.cbo = false;
        typeof properties.settings.command != 'undefined' ? this.command = properties.settings.command : this.command = '';
        
        this.oneBlock   = config.bg.gridSize;
        properties.type == 'Arrow' ? this.direction = properties.direction : false; 
        

        if(properties.settings != false)
        {
            for(let key of Object.keys(properties.settings))
            {
                if(typeof properties.settings[key] != 'string')
                {
                    eval(`this.${key} = ${properties.settings[key]}`);
                }else{
                    eval(`this.${key} = "${properties.settings[key]}"`);

                }
            }
        }

        if(properties.settings.img)
        {
            let img = new Image();
            img.src = properties.settings.img;
            this.img = img;
        }else{
            eval(`this.img  = ${properties.type}Block || ${properties.img}`);
        }
        
        

        

        this.draw();
    }

    draw(clear)
    {
        clear ? cnv( () => { ctx.clearRect(this.x * this.oneBlock - this.oneBlock, this.y * this.oneBlock - this.oneBlock, this.oneBlock, this.oneBlock); } ) : false;
        if(clear && this.type == 'Lamp') {
            eff(
                () => {
                    effect.clearRect(this.x * this.oneBlock - this.oneBlock - this.oneBlock / 5, this.y * this.oneBlock - this.oneBlock - this.oneBlock / 5, this.oneBlock * 1.5, this.oneBlock * 1.5);
                }
            )
        }

        if(this.charged == true)
        {
                    
            if(this.type == 'Lamp')
            {
                eff(
                    () => {
                        effect.rect(this.x * this.oneBlock - this.oneBlock, this.y * this.oneBlock   - this.oneBlock, this.oneBlock, this.oneBlock);
                        effect.filter = 'blur(2px)';
                        effect.fillStyle = config.fg.charge.colorLamp;
                        effect.fill();
                        effect.filter = 'blur(0px)';
                    }
                )
            }else if(config.game.development){
                cnv(
                    () => {
                        ctx.rect(this.x * this.oneBlock - this.oneBlock, this.y * this.oneBlock   - this.oneBlock, this.oneBlock, this.oneBlock);
                        ctx.fillStyle = config.fg.charge.color;
                        ctx.fill();
                    }
                )
            }
            
        }

        cnv(
            () => {

                if(this.direction)
                {
                    let deg;
                    let x, y;
                    if(this.direction == 'top')
                    {
                        deg = 0;
                        x = this.x * this.oneBlock - this.oneBlock;
                        y = this.y * this.oneBlock - this.oneBlock;
                    }
                    if(this.direction == 'right')
                    {
                        deg = 90;
                        x = this.x * this.oneBlock;
                        y = this.y * this.oneBlock - this.oneBlock;
                    }
                    if(this.direction == 'bottom')
                    {
                        deg = 180;
                        x = this.x * this.oneBlock;
                        y = this.y * this.oneBlock;
                    }
                    if(this.direction == 'left')
                    {
                        deg = 270;
                        x = this.x * this.oneBlock - this.oneBlock;
                        y = this.y * this.oneBlock;
                    }

                    ctx.save();

                    ctx.translate(x, y);
                    ctx.rotate(deg * Math.PI / 180);
                    ctx.drawImage(this.img, 0, 0, this.oneBlock, this.oneBlock);

                    ctx.restore();
                    
                }else{
                    ctx.drawImage(this.img, this.x * this.oneBlock - this.oneBlock, this.y * this.oneBlock - this.oneBlock, this.oneBlock, this.oneBlock);       
                }

            }
        )
    }

    redstone()
    {
        
        this.cases(
            block => {
                if(block.cbch == true)
                {
                    if( (block.type == 'Arrow' && block.direction != 'bottom') || block.type != 'Arrow' )
                    {
                        block.charge(true);
                    }
                }
            },
            block => {
                if(block.cbch == true)
                {
                    if( (block.type == 'Arrow' && block.direction != 'left') || block.type != 'Arrow' )
                    {
                        block.charge(true);
                    }
                }
            },
            block => {
                if(block.cbch == true)
                {
                    if( (block.type == 'Arrow' && block.direction != 'top') || block.type != 'Arrow' )
                    {
                        block.charge(true);
                    }
                }
            },
            block => {
                if(block.cbch == true)
                {
                    if( (block.type == 'Arrow' && block.direction != 'right') || block.type != 'Arrow' )
                    {
                        block.charge(true);
                    }
                }
            }
        )

    }

    id()
    {
        for(let i = 0; i < blocks.length; i++)
        {
            if(blocks[i].x == this.x && blocks[i].y == this.y)
            {
                return i;
            }
        }
    }

    remove()
    {
        cnv(
            () => {
                ctx.clearRect(this.x * this.oneBlock - this.oneBlock, this.y * this.oneBlock - this.oneBlock, this.oneBlock, this.oneBlock);
            }
        )
        if(this.type == 'Lamp')
        {
            effect.beginPath();
            effect.clearRect(this.x * this.oneBlock - this.oneBlock - this.oneBlock / 2, this.y * this.oneBlock - this.oneBlock - this.oneBlock / 2, this.oneBlock * 2, this.oneBlock * 2);
            effect.closePath();
        }
        if(this.type == 'Code' && this.openedIde)
        {
            $(`#ide${this.id()}`).remove();
            config.user.countIdeOpened--; 
            if(config.user.countIdeOpened == 0){config.user.codeMenu = false}
        }
        blocks.splice(this.id(), 1);
    }


    cases(top, right, bottom, left)
    {
        for(let block of blocks)
        {
            if(block.x == this.x && block.y == this.y - 1)
            {
                top(block);
            }
            if(block.x == this.x + 1 && block.y == this.y)
            {
                right(block);
            }
            if(block.x == this.x && block.y == this.y + 1)
            {
                bottom(block);
            }
            if(block.x == this.x - 1 && block.y == this.y)
            {
                left(block);
            }
        }
    }

    checkCharge() {

        let founded = false;

        this.cases(

            block => {
                if( (block.cch && this.cbch && block.charged == true) || block.morch)
                {
                    if( 
                        
                        (block.type != 'Arrow' && this.type == 'Arrow' && this.direction != 'top') 
                        ||
                        (block.type != 'Arrow' && this.type != 'Arrow')
                        ||
                        (block.type == 'Arrow' && block.direction == 'bottom' && this.type != 'Arrow')
                        ||
                        (block.type == 'Arrow' && block.direction == 'bottom' && this.type == 'Arrow' && this.direction != 'top')
                        ||
                        (block.morch)

                    )
                    {
                        founded = true;
                    }
                }
            },
            block => {
                if( (block.cch && this.cbch && block.charged == true) || block.morch)
                {
                    if( 
                        
                        (block.type != 'Arrow' && this.type == 'Arrow' && this.direction != 'right') 
                        ||
                        (block.type != 'Arrow' && this.type != 'Arrow')
                        ||
                        (block.type == 'Arrow' && block.direction == 'left' && this.type != 'Arrow')
                        ||
                        (block.type == 'Arrow' && block.direction == 'left' && this.type == 'Arrow' && this.direction != 'right')
                        ||
                        (block.morch)

                    )
                    {
                        founded = true;
                    }
                }
            },
            block => {
                if( (block.cch && this.cbch && block.charged == true) || block.morch)
                {
                    if( 
                        
                        (block.type != 'Arrow' && this.type == 'Arrow' && this.direction != 'bottom') 
                        ||
                        (block.type != 'Arrow' && this.type != 'Arrow')
                        ||
                        (block.type == 'Arrow' && block.direction == 'top' && this.type != 'Arrow')
                        ||
                        (block.type == 'Arrow' && block.direction == 'top' && this.type == 'Arrow' && this.direction != 'bottom')
                        ||
                        (block.morch)

                    )
                    {
                        founded = true;
                    }
                }
            },
            block => {
                if( (block.cch && this.cbch && block.charged == true) || block.morch)
                {
                    if( 
                        
                        (block.type != 'Arrow' && this.type == 'Arrow' && this.direction != 'left') 
                        ||
                        (block.type != 'Arrow' && this.type != 'Arrow')
                        ||
                        (block.type == 'Arrow' && block.direction == 'right' && this.type != 'Arrow')
                        ||
                        (block.type == 'Arrow' && block.direction == 'right' && this.type == 'Arrow' && this.direction != 'left')
                        ||
                        (block.morch)

                    )
                    {
                        founded = true;
                    }
                }
            }

        )

        founded == false ? this.charge(false) : false;
        

    }

    foundBlock(x, y, func = false, type = false, nfFunc = false)
    {

        if(type != false)
        {
            let foundBlock = false;
            for(let block of blocks)
            {
                if(block.x == x && block.y == y && block.type == type)
                {
                    foundBlock = true;
                    if(func != false)
                    {
                        func(block);
                        break;
                    }else{
                        return block;
                    }
                }
            }
            if(foundBlock == false && nfFunc != false)
            {
                nfFunc();
            }
        }else{
            let foundBlock = false;
            for(let block of blocks)
            {
                if(block.x == x && block.y == y)
                {
                    foundBlock = true;
                    if(func != false)
                    {
                        func(block);
                        break;
                    }else{
                        return block;
                    }
                } 
            }
            if(foundBlock == false && nfFunc != false)
            {
                nfFunc();
            }
        }

        
    }

    charge(boolean)
    {
        this.charged = boolean;
        this.draw(true);
        
    }

}


/* 

    Krekcr | 2021
    if you want to cooperate: vk.com/krekcr || shilenkok@bk.ru

*/