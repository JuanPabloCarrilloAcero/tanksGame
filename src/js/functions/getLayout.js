import { boardSize } from "../constants/constants.js";

export function getLayout() {
    console.log("getLayout");
    /*
    // Lista completa de tipos de bloques
    const allBlockTypes = ['brick', 'steel', 'bush', 'water', 'empty'];
    // Tipos sin acero, para asegurar que los bordes no tengan acero
    const nonSteelTypes = ['brick', 'bush', 'water', 'empty'];
    // Lista con mayor tendencia a espacios abiertos, para reducir callejones
    const mostlyOpen = ['bush', 'water', 'empty', 'empty', 'empty'];*/
    
    //definimos la matriz que define los tipos de bloques para preestablecer un nivel
    /*const level1 = [
        [0,	1,	0,	0,	3,	3,	0,	1,	1,	0,1,1,1],
        [1,	0,	4,	0,	0,	0,	0,	4,	0,	1,1,1,1],
        [1,	4,	3,	0,	0,	0,	0,	3,	4,	1,1,1,1],  
        [2,	0,	0,	4,	0,	0,	4,	0,	0,	2,1,1,1],
        [2,	1,	0,	0,	2,	2,	0,	0,	1,	2,1,1,1],
        [2,	0,	1,	0,	2,	2,	0,	1,	0,	2,1,1,1],
        [2,	0,	0,	4,	0,	0,	4,	0,	0,	2,1,1,1],
        [1,	4,	3,	0,	0,	0,	0,	3,	4,	1,1,1,1],
        [1,	0,	4,	0,	0,	0,	0,	4,	0,	1,1,1,1],
        [0,	1,	1,	0,	3,	3,	0,	1,	1,	0,1,1,1],
        [0,	1,	1,	0,	3,	3,	0,	1,	1,	0,1,1,1],
        [0,	1,	1,	0,	3,	3,	0,	1,	1,	0,1,1,1],
        [0,	1,	1,	0,	3,	3,	0,	1,	1,	0,1,1,1]
    ];*/
    const level1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [2, 0, 0, 4, 4, 4, 0, 4, 4, 4, 0, 0, 2], 
        [2, 2, 0, 4, 0, 4, 0, 4, 0, 4, 0, 2, 2], 
        [2, 2, 0, 4, 4, 4, 0, 4, 0, 4, 0, 2, 2], 
        [2, 2, 0, 0, 0, 4, 0, 4, 0, 4, 0, 2, 2], 
        [2, 0, 0, 4, 4, 4, 0, 4, 4, 4, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 4, 3, 4, 0, 0, 0, 0, 3],
        [1, 4, 0, 4, 0, 4, 4, 4, 0, 4, 0, 4, 1],
        [1, 4, 3, 4, 3, 4, 4, 4, 3, 4, 3, 4, 1],
        [1, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 1],
        [1, 4, 0, 4, 0, 0, 0, 0, 0, 4, 0, 4, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    ]

    const layout = [];    
    for (let row = 0; row < boardSize; row++) {
        // Usamos currentRow para evitar sombrear la variable row del bucle for
        const currentRow = [];
        let blockType;
        for (let col = 0; col < boardSize; col++) {
            switch(level1[row][col]){
                case 1:
                    blockType = 'bush';
                    break;
                case 2:
                    blockType = 'water';
                    break;
                case 3:
                    blockType = 'steel';
                    break;
                case 4:
                    blockType = 'brick';
                    break;
                default:
                    blockType = 'empty';
            }
            currentRow.push(blockType);
        }
        layout.push(currentRow);
    }

    return layout;
}
