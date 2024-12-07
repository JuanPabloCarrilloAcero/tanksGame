import { boardSize } from "../constants/constants.js";

export function getLayout() {
    console.log("getLayout");
    // Lista completa de tipos de bloques
    const allBlockTypes = ['brick', 'steel', 'bush', 'water', 'empty'];
    // Tipos sin acero, para asegurar que los bordes no tengan acero
    const nonSteelTypes = ['brick', 'bush', 'water', 'empty'];
    // Lista con mayor tendencia a espacios abiertos, para reducir callejones
    const mostlyOpen = ['bush', 'water', 'empty', 'empty', 'empty'];

    const layout = [];

    for (let row = 0; row < boardSize; row++) {
        // Usamos currentRow para evitar sombrear la variable row del bucle for
        const currentRow = [];
        for (let col = 0; col < boardSize; col++) {
            let possibleTypes;

            // Para las celdas del borde (primera y última fila/columna),
            // no permitimos acero y preferimos más espacios abiertos para evitar bloqueos
            if (row === 0 || row === boardSize - 1 || col === 0 || col === boardSize - 1) {
                // Combinamos tipos sin acero con mayor tendencia a espacios abiertos
                possibleTypes = nonSteelTypes.concat(mostlyOpen);
            } else {
                // Dentro del mapa sí permitimos acero, pero igualmente
                // aumentamos la probabilidad de espacios abiertos para reducir callejones
                possibleTypes = allBlockTypes.concat(mostlyOpen);
            }

            // Seleccionamos aleatoriamente un tipo de bloque de la lista correspondiente
            const blockType = possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
            currentRow.push(blockType);
        }
        layout.push(currentRow);
    }

    layout[boardSize - 1][0] = 'empty';

    return layout;
}
