export function getBlockImage(type) {
    //Coordinadas de los sprites en la imagen
    const sprites = {
        brick: {x: 198, y: 5, width: 78, height: 80},
        steel: {x: 504, y: 5, width: 79, height: 80},
        bush: {x: 735, y: 5, width: 79, height: 80},
        water: [            
            {x: 620, y: 5, width: 79, height: 80},  // Primer frame
            {x: 620, y: 96, width: 79, height: 80}, // Segundo frame
        ],
        empty: {x: 0, y: 160, width: 0, height: 0}
    }    
        
    return sprites[type];
}