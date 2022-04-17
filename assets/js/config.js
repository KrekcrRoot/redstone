


/**
 * Redstone
 * Version: 1.0
 * Release
 * 26.11.2021
 */

let lowGraphic = true;
if(localStorage.lowgraphic) lowGraphic = localStorage.lowgraphic;

let config = {

    game: {

        /*
        
            if 'render' is false - game will not render

        */

        render: false,
        development: false,
        lowGraphic: lowGraphic,
        texturepack: 'default',
        scale: 2
    },

    fg: {
        charge: {

            /*
            
                color for charge block

            */

            color: '#FF6666',
            colorLamp: '#ffff7d'
        }
    },

    bg: {
        /* 
        
            gridSize can be: 

                tiny:
                    16 18 20 22
                
                small:
                    30 32
                    34 - best

                medium:
                    36 - best
                    38 - best
                    40 44
                
                large:
                    64 128 256

                laboratory Size:
                    400 - this size is for full resolution of block

                you can set any size but quality of image will not be good
                

        */

        gridSize: 36,
        gridColor: '#8f8f8f' // #47525d dark: #303030
    },

    user: {

        /*
        
            not recommend changing the settings below

        */

        tool: 'Redstone',
        toolId: 1,
        arrowDirection: 'top',

        menuOpened: false,
        codeMenu: false,
        countIdeOpened: 0,

        settingsMenuOpened: false,

        mouse: {

            last: {
                x: 0,
                y: 0
            },

            x: 0,
            y: 0,

            gridXY: {
                x: 0,
                y: 0
            },

            btn: 0,
            pressed: false

        }

    }

}


