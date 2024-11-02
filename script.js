// Initial shape selection modal
document.getElementById("generateEnvButton").onclick = function() {
    openModal("shapeSelectionModal");
};

// Open a modal
function openModal(modalId) {
    console.log("Opening modal:", modalId);
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
}

// Close a modal
function closeModal(modalId) {
    console.log("Closing modal:", modalId);
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Irregular Shape Modal 
function openIrregularShapeModal() {
    closeModal("shapeSelectionModal");
    openModal("irregularShapeModal");
    addIrregularShapeFields();
}

// Regular Shape Modal
function openRegularShapeModal() {
    closeModal("shapeSelectionModal");
    openModal("regularShapeModal");
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                            Irregular Shapes                                              //
///////////////////////////////////////////////////////////////////////////////////////////////

// Dynamically add fields (+) for Irregular Shape input
function addIrregularShapeFields() {
    const container = document.getElementById("inputFieldsContainer");
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    inputGroup.innerHTML = `
        <input type="number" placeholder="Starting Barcode" class="barcode-start">
        <input type="number" placeholder="End Barcode" class="barcode-end">
        <input type="number" placeholder="Initial x-value" class="x-value">
        <input type="number" placeholder="Initial y-value" class="y-value">
        <input type="number" placeholder="Distance between barcodes" class="distance">
        <select class="axis">
            <option value="x">Increase in X</option>
            <option value="y">Increase in Y</option>
        </select>
    `;
    container.appendChild(inputGroup);
}

// Generate, convert and download the CSV file.
function generateCSV() {
    const rows = [["marker id", "x_value", "y_value"]]; 
    const inputs = document.querySelectorAll(".input-group");

    let markerId = 604; 
    inputs.forEach((group, index) => {
        const startBarcode = parseInt(group.querySelector(".barcode-start").value);
        const endBarcode = parseInt(group.querySelector(".barcode-end").value);
        const xValue = parseFloat(group.querySelector(".x-value").value);
        const yValue = parseFloat(group.querySelector(".y-value").value);
        const distance = parseFloat(group.querySelector(".distance").value);
        const axis = group.querySelector(".axis").value;

        let x = xValue, y = yValue;
        for (let i = startBarcode; i <= endBarcode; i++) {
            rows.push([markerId++, x.toFixed(1), y.toFixed(1)]);
            if (axis === "x") x += distance;
            else y += distance;
        }
    });

    // Convert and download CSV.
    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "env.csv";
    a.click();
    URL.revokeObjectURL(url);
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                                Regular Shaped                                             //
///////////////////////////////////////////////////////////////////////////////////////////////

// Regular shape based on user selection
function selectShape(shape) {
    closeModal("regularShapeModal"); 
    if (shape === 'Rectangular') {
        openModal("rectangularShapeModal");
    } else if (shape === 'Square') {
        openModal("squareShapeModal");
    } else if (shape === 'C-Shaped') {
        openModal("cShapedModal");
    } else if (shape === 'E-Shaped') {
        openModal("eShapedModal");
    } else if (shape === 'H-Shaped') {
        openModal("hShapedModal");
    }
    // Add similar logic for other shapes (e.g.,'Comb-Shaped', etc.) if needed
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                            Rectangular Shaped                                            //
///////////////////////////////////////////////////////////////////////////////////////////////

function generateRectangularCSV() {
    const rows = parseInt(document.getElementById("rectRows").value);
    const cols = parseInt(document.getElementById("rectCols").value);
    const startBarcode = parseInt(document.getElementById("rectStartBarcode").value);
    const endBarcode = parseInt(document.getElementById("rectEndBarcode").value);
    const distance = parseFloat(document.getElementById("rectDistance").value);
    const initialX = parseFloat(document.getElementById("rectInitialX").value);
    const initialY = parseFloat(document.getElementById("rectInitialY").value);
    const axis = document.getElementById("rectAxis").value;

    const rowsData = [["marker id", "x_value", "y_value"]];
    let barcode = startBarcode;
    let x = initialX;
    let y = initialY;

    for (let r = 0; r < rows; r++) {
        let currentX = x;
        let currentY = y;

        for (let c = 0; c < cols; c++) {
            if (barcode > endBarcode) break;

            rowsData.push([barcode++, currentX.toFixed(1), currentY.toFixed(1)]);

            if (axis === "x") {
                currentX += distance;
            } else {
                currentY += distance;
            }
        }

        if (axis === "x") {
            y += distance;
        } else {
            x += distance;
        }
    }

    const csvContent = rowsData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rectangular_env.csv";
    a.click();
    URL.revokeObjectURL(url);
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                            Square Shaped                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////

function syncSquareCols() {
    const rows = document.getElementById("squareRows").value;
    document.getElementById("squareCols").value = rows;
}

function generateSquareCSV() {
    const rows = parseInt(document.getElementById("squareRows").value);
    const cols = rows;
    const startBarcode = parseInt(document.getElementById("squareStartBarcode").value);
    const endBarcode = parseInt(document.getElementById("squareEndBarcode").value);
    const distance = parseFloat(document.getElementById("squareDistance").value);
    const initialX = parseFloat(document.getElementById("squareInitialX").value);
    const initialY = parseFloat(document.getElementById("squareInitialY").value);
    const axis = document.getElementById("squareAxis").value;

    const rowsData = [["marker id", "x_value", "y_value"]];
    let barcode = startBarcode;
    let x = initialX;
    let y = initialY;

    for (let r = 0; r < rows; r++) {
        let currentX = x;
        let currentY = y;

        for (let c = 0; c < cols; c++) {
            if (barcode > endBarcode) break;

            rowsData.push([barcode++, currentX.toFixed(1), currentY.toFixed(1)]);

            if (axis === "x") {
                currentX += distance;
            } else {
                currentY += distance;
            }
        }

        if (axis === "x") {
            y += distance;
        } else {
            x += distance;
        }
    }

    const csvContent = rowsData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "square_env.csv";
    a.click();
    URL.revokeObjectURL(url);
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                                  C-Shaped                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////

function generateCShapeCSV() {
    // Main Rectangle inputs
    const mainRows = parseInt(document.getElementById("cMainRows").value);
    const mainCols = parseInt(document.getElementById("cMainCols").value);
    const mainInitialX = parseFloat(document.getElementById("cMainInitialX").value);
    const mainInitialY = parseFloat(document.getElementById("cMainInitialY").value);
    const mainStartBarcode = parseInt(document.getElementById("cMainStartBarcode").value);
    const mainEndBarcode = parseInt(document.getElementById("cMainEndBarcode").value);
    const mainDistance = parseFloat(document.getElementById("cMainDistance").value);
    const mainAxis = document.getElementById("cMainAxis").value;
    // Finger 1 inputs
    const finger1Rows = parseInt(document.getElementById("cFinger1Rows").value);
    const finger1Cols = parseInt(document.getElementById("cFinger1Cols").value);
    const finger1InitialX = parseFloat(document.getElementById("cFinger1InitialX").value);
    const finger1InitialY = parseFloat(document.getElementById("cFinger1InitialY").value);
    const finger1StartBarcode = parseInt(document.getElementById("cFinger1StartBarcode").value);
    const finger1EndBarcode = parseInt(document.getElementById("cFinger1EndBarcode").value);
    const finger1Distance = parseFloat(document.getElementById("cFinger1Distance").value);
    const finger1Axis = document.getElementById("cFinger1Axis").value;
    // Finger 2 inputs
    const finger2Rows = parseInt(document.getElementById("cFinger2Rows").value);
    const finger2Cols = parseInt(document.getElementById("cFinger2Cols").value);
    const finger2InitialX = parseFloat(document.getElementById("cFinger2InitialX").value);
    const finger2InitialY = parseFloat(document.getElementById("cFinger2InitialY").value);
    const finger2StartBarcode = parseInt(document.getElementById("cFinger2StartBarcode").value);
    const finger2EndBarcode = parseInt(document.getElementById("cFinger2EndBarcode").value);
    const finger2Distance = parseFloat(document.getElementById("cFinger2Distance").value);
    const finger2Axis = document.getElementById("cFinger2Axis").value;

    const rowsData = [["marker id", "x_value", "y_value"]];
    // 1. Generate Main Rectangle
    let barcode = mainStartBarcode;
    let x = mainInitialX;
    let y = mainInitialY;

    for (let r = 0; r < mainRows; r++) {
        let currentX = x;
        let currentY = y;
        for (let c = 0; c < mainCols; c++) {
            if (barcode > mainEndBarcode) break;
            rowsData.push([barcode++, currentX.toFixed(1), currentY.toFixed(1)]);
            if (mainAxis === "x") {
                currentX += mainDistance;
            } else {
                currentY += mainDistance;
            }
        }
        if (mainAxis === "x") {
            y += mainDistance;
        } else {
            x += mainDistance;
        }
    }
    // 2. Generate Finger 1
    barcode = finger1StartBarcode;
    x = finger1InitialX;
    y = finger1InitialY;

    for (let r = 0; r < finger1Rows; r++) {
        let currentX = x;
        let currentY = y;
        for (let c = 0; c < finger1Cols; c++) {
            if (barcode > finger1EndBarcode) break;
            rowsData.push([barcode++, currentX.toFixed(1), currentY.toFixed(1)]);
            if (finger1Axis === "x") {
                currentX += finger1Distance;
            } else {
                currentY += finger1Distance;
            }
        }
        if (finger1Axis === "x") {
            y += finger1Distance;
        } else {
            x += finger1Distance;
        }
    }
    // 3. Generate Finger 2
    barcode = finger2StartBarcode;
    x = finger2InitialX;
    y = finger2InitialY;

    for (let r = 0; r < finger2Rows; r++) {
        let currentX = x;
        let currentY = y;
        for (let c = 0; c < finger2Cols; c++) {
            if (barcode > finger2EndBarcode) break;
            rowsData.push([barcode++, currentX.toFixed(1), currentY.toFixed(1)]);
            if (finger2Axis === "x") {
                currentX += finger2Distance;
            } else {
                currentY += finger2Distance;
            }
        }
        if (finger2Axis === "x") {
            y += finger2Distance;
        } else {
            x += finger2Distance;
        }
    }

    const csvContent = rowsData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "c_shape_env.csv";
    a.click();
    URL.revokeObjectURL(url);
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                                  E-Shaped                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////

function generateEShapeCSV() {
    // Main Rectangle inputs
    const mainRows = parseInt(document.getElementById("eMainRows").value);
    const mainCols = parseInt(document.getElementById("eMainCols").value);
    const mainInitialX = parseFloat(document.getElementById("eMainInitialX").value);
    const mainInitialY = parseFloat(document.getElementById("eMainInitialY").value);
    const mainStartBarcode = parseInt(document.getElementById("eMainStartBarcode").value);
    const mainEndBarcode = parseInt(document.getElementById("eMainEndBarcode").value);
    const mainDistance = parseFloat(document.getElementById("eMainDistance").value);
    const mainAxis = document.getElementById("eMainAxis").value;
    // Finger 1 inputs
    const finger1Rows = parseInt(document.getElementById("eFinger1Rows").value);
    const finger1Cols = parseInt(document.getElementById("eFinger1Cols").value);
    const finger1InitialX = parseFloat(document.getElementById("eFinger1InitialX").value);
    const finger1InitialY = parseFloat(document.getElementById("eFinger1InitialY").value);
    const finger1StartBarcode = parseInt(document.getElementById("eFinger1StartBarcode").value);
    const finger1EndBarcode = parseInt(document.getElementById("eFinger1EndBarcode").value);
    const finger1Distance = parseFloat(document.getElementById("eFinger1Distance").value);
    const finger1Axis = document.getElementById("eFinger1Axis").value;
    // Finger 2 inputs
    const finger2Rows = parseInt(document.getElementById("eFinger2Rows").value);
    const finger2Cols = parseInt(document.getElementById("eFinger2Cols").value);
    const finger2InitialX = parseFloat(document.getElementById("eFinger2InitialX").value);
    const finger2InitialY = parseFloat(document.getElementById("eFinger2InitialY").value);
    const finger2StartBarcode = parseInt(document.getElementById("eFinger2StartBarcode").value);
    const finger2EndBarcode = parseInt(document.getElementById("eFinger2EndBarcode").value);
    const finger2Distance = parseFloat(document.getElementById("eFinger2Distance").value);
    const finger2Axis = document.getElementById("eFinger2Axis").value;
    // Finger 3 inputs
    const finger3Rows = parseInt(document.getElementById("eFinger3Rows").value);
    const finger3Cols = parseInt(document.getElementById("eFinger3Cols").value);
    const finger3InitialX = parseFloat(document.getElementById("eFinger3InitialX").value);
    const finger3InitialY = parseFloat(document.getElementById("eFinger3InitialY").value);
    const finger3StartBarcode = parseInt(document.getElementById("eFinger3StartBarcode").value);
    const finger3EndBarcode = parseInt(document.getElementById("eFinger3EndBarcode").value);
    const finger3Distance = parseFloat(document.getElementById("eFinger3Distance").value);
    const finger3Axis = document.getElementById("eFinger3Axis").value;

    const rowsData = [["marker id", "x_value", "y_value"]];

    function generateRectangle(rows, cols, initialX, initialY, startBarcode, endBarcode, distance, axis) {
        let barcode = startBarcode;
        let x = initialX;
        let y = initialY;
        const data = [];

        for (let r = 0; r < rows; r++) {
            let currentX = x;
            let currentY = y;
            for (let c = 0; c < cols; c++) {
                if (barcode > endBarcode) break;
                data.push([barcode++, currentX.toFixed(1), currentY.toFixed(1)]);
                if (axis === "x") {
                    currentX += distance;
                } else {
                    currentY += distance;
                }
            }
            if (axis === "x") {
                y += distance;
            } else {
                x += distance;
            }
        }
        return data;
    }

    rowsData.push(...generateRectangle(mainRows, mainCols, mainInitialX, mainInitialY, mainStartBarcode, mainEndBarcode, mainDistance, mainAxis));
    rowsData.push(...generateRectangle(finger1Rows, finger1Cols, finger1InitialX, finger1InitialY, finger1StartBarcode, finger1EndBarcode, finger1Distance, finger1Axis));
    rowsData.push(...generateRectangle(finger2Rows, finger2Cols, finger2InitialX, finger2InitialY, finger2StartBarcode, finger2EndBarcode, finger2Distance, finger2Axis));
    rowsData.push(...generateRectangle(finger3Rows, finger3Cols, finger3InitialX, finger3InitialY, finger3StartBarcode, finger3EndBarcode, finger3Distance, finger3Axis));

    let csvContent = "data:text/csv;charset=utf-8," + rowsData.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "e_shape_env.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                                  H-Shaped                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////


