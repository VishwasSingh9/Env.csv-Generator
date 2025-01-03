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
        <input type="number" placeholder="Distance between bar-codes" class="distance">
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
            rows.push([markerId++, x.toFixed(2), y.toFixed(2)]);
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
    } else if (shape === 'comb-Shaped') {
        openModal("combShapedModal");
    } else if (shape === 'hollow-Rectangle') {
        openModal("hollowRectangleModal");
    }
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

            rowsData.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);

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

            rowsData.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);

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
            rowsData.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
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
            rowsData.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
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
            rowsData.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
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
                data.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
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
//                                  Comb-Shaped                                              //
///////////////////////////////////////////////////////////////////////////////////////////////

function addFinger() {
    const fingersContainer = document.getElementById("combFingersContainer");
    const newFinger = document.createElement("div");
    newFinger.classList.add("finger-inputs");
    newFinger.innerHTML = `
        <h3>Finger ${fingersContainer.children.length + 1}</h3>
        <input type="number" placeholder="Rows" class="fingerRows">
        <input type="number" placeholder="Columns" class="fingerCols">
        <input type="number" placeholder="Initial X Value" class="fingerInitialX">
        <input type="number" placeholder="Initial Y Value" class="fingerInitialY">
        <input type="number" placeholder="Starting Barcode" class="fingerStartBarcode">
        <input type="number" placeholder="End Barcode" class="fingerEndBarcode">
        <input type="number" placeholder="Distance Between Barcodes" class="fingerDistance">
        <select class="fingerAxis">
            <option value="x">Increase in X Axis</option>
            <option value="y">Increase in Y Axis</option>
        </select>
    `;

    fingersContainer.appendChild(newFinger);
}
function generateCombShapeCSV() {
    const rowsData = [["marker id", "x_value", "y_value"]];
    // Main Rectangle inputs
    const mainRows = parseInt(document.getElementById("combMainRows").value);
    const mainCols = parseInt(document.getElementById("combMainCols").value);
    const mainInitialX = parseFloat(document.getElementById("combMainInitialX").value);
    const mainInitialY = parseFloat(document.getElementById("combMainInitialY").value);
    const mainStartBarcode = parseInt(document.getElementById("combMainStartBarcode").value);
    const mainEndBarcode = parseInt(document.getElementById("combMainEndBarcode").value);
    const mainDistance = parseFloat(document.getElementById("combMainDistance").value);
    const mainAxis = document.getElementById("combMainAxis").value;
    rowsData.push(...generateRectangle(mainRows, mainCols, mainInitialX, mainInitialY, mainStartBarcode, mainEndBarcode, mainDistance, mainAxis));
    // Finger inputs
    const fingerInputs = document.querySelectorAll("#combFingersContainer .finger-inputs");
    fingerInputs.forEach(finger => {
        const rows = parseInt(finger.querySelector(".fingerRows").value);
        const cols = parseInt(finger.querySelector(".fingerCols").value);
        const initialX = parseFloat(finger.querySelector(".fingerInitialX").value);
        const initialY = parseFloat(finger.querySelector(".fingerInitialY").value);
        const startBarcode = parseInt(finger.querySelector(".fingerStartBarcode").value);
        const endBarcode = parseInt(finger.querySelector(".fingerEndBarcode").value);
        const distance = parseFloat(finger.querySelector(".fingerDistance").value);
        const axis = finger.querySelector(".fingerAxis").value;
        rowsData.push(...generateRectangle(rows, cols, initialX, initialY, startBarcode, endBarcode, distance, axis));
    });
    let csvContent = "data:text/csv;charset=utf-8," + rowsData.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "comb_shape_env.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
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
            data.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
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

///////////////////////////////////////////////////////////////////////////////////////////////
//                                  Hollow Rectangle                                         //
///////////////////////////////////////////////////////////////////////////////////////////////

function generateHollowRectangleCSV() {
    // Hollow Rectangle inputs
    const rows = parseInt(document.getElementById("hollowRows").value);
    const cols = parseInt(document.getElementById("hollowCols").value);
    const initialX = parseFloat(document.getElementById("hollowInitialX").value);
    const initialY = parseFloat(document.getElementById("hollowInitialY").value);
    const startBarcode = parseInt(document.getElementById("hollowStartBarcode").value);
    const endBarcode = parseInt(document.getElementById("hollowEndBarcode").value);
    const distance = parseFloat(document.getElementById("hollowDistance").value);
    const axis = document.getElementById("hollowAxis").value;

    const rowsData = [["marker id", "x_value", "y_value"]];

    let barcode = startBarcode;
    let x = initialX;
    let y = initialY;

    function generatePerimeter(rows, cols, startX, startY, distance, axis) {
        const data = [];
        let currentX = startX;
        let currentY = startY;

        // Top row
        for (let c = 0; c < cols && barcode <= endBarcode; c++) {
            data.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
            currentX += (axis === "x") ? distance : 0;
            currentY += (axis === "y") ? distance : 0;
        }

        // Right column
        for (let r = 1; r < rows - 1 && barcode <= endBarcode; r++) {
            currentX -= (axis === "y") ? distance : 0;
            currentY += (axis === "x") ? distance : 0;
            data.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
        }

        // Bottom row (if more than 1 row)
        if (rows > 1) {
            for (let c = cols - 1; c >= 0 && barcode <= endBarcode; c--) {
                currentX -= (axis === "x") ? distance : 0;
                currentY -= (axis === "y") ? distance : 0;
                data.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
            }
        }

        // Left column (if more than 1 column)
        if (cols > 1) {
            for (let r = rows - 2; r > 0 && barcode <= endBarcode; r--) {
                currentX += (axis === "y") ? distance : 0;
                currentY -= (axis === "x") ? distance : 0;
                data.push([barcode++, currentX.toFixed(2), currentY.toFixed(2)]);
            }
        }

        return data;
    }

    // Generate perimeter data
    rowsData.push(...generatePerimeter(rows, cols, x, y, distance, axis));

    // Export to CSV
    let csvContent = "data:text/csv;charset=utf-8," + rowsData.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "hollow_rectangle_env.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                                  PNG                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////

// Open the PNG Modal
function openPngModal() {
    document.getElementById("pngModal").style.display = "flex";
}

// Close any modal by ID
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Function to open the CSV input modal
function openCsvInputModal() {
    openModal("csvInputModal");
}

// Function to open the FleetMap input modal
function openFleetMapInputModal() {
    openModal("fleetMapInputModal");
}

function openFleetMapInputModal2() {
    openModal("fleetMapInputModal2");
}

//Function to process the uploaded CSV file
function processCsvFile() {
    const fileInput = document.getElementById("csvFileInput");
    if (fileInput.files.length === 0) {
        return console.error("Error: No CSV file selected.");
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const rows = e.target.result
            .split("\n")
            .map(row => row.split(",").map(cell => cell.trim()));

        const [header, ...data] = rows;
        const xIndex = header.indexOf("x_value");
        const yIndex = header.indexOf("y_value");

        if (xIndex === -1 || yIndex === -1 || data.length === 0) {
            return console.error("Error: CSV must contain valid 'x_value' and 'y_value' columns.");
        }

        const coordinates = data
            .map(row => ({ x: parseFloat(row[xIndex]), y: parseFloat(row[yIndex]) }))
            .filter(coord => !isNaN(coord.x) && !isNaN(coord.y));

        if (coordinates.length === 0) {
            return console.error("Error: No valid x and y values in CSV file.");
        }

        generateDotGrid(coordinates);
    };

    reader.readAsText(file);
}

function generateDotGrid(coordinates) {
    const canvas = document.getElementById("dotGridCanvas") || document.createElement("canvas");
    if (!canvas.id) {
        canvas.id = "dotGridCanvas";
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const margin = 50, dotSize = 5;

    const [minX, maxX] = [Math.min(...coordinates.map(c => c.x)), Math.max(...coordinates.map(c => c.x))];
    const [minY, maxY] = [Math.min(...coordinates.map(c => c.y)), Math.max(...coordinates.map(c => c.y))];
    const scaleX = (canvas.width - 2 * margin) / (maxX - minX);
    const scaleY = (canvas.height - 2 * margin) / (maxY - minY);

    coordinates.forEach(({ x, y }) => {
        const canvasX = margin + (x - minX) * scaleX;
        const canvasY = canvas.height - margin - (y - minY) * scaleY;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
    });

    console.log("Dot grid generated successfully.");
    downloadImage(canvas);
}

function downloadImage(canvas) {
    const link = document.createElement("a");
    link.download = "dot_grid_image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

//Function to process the uploaded Fleet Map file

function processFleetMapFile() {
    const fileInput = document.getElementById("mapFileInput");
    if (fileInput.files.length === 0) {
        return console.error("Error: No MAP file selected.");
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        let data;
        try {
            data = JSON.parse(e.target.result);
        } catch (error) {
            return console.error("Error decoding JSON: ", error);
        }

        if (!data.nodes) {
            return console.error("Error: 'nodes' key not found in the JSON data.");
        }

        const positions = data.nodes.map(node => {
            const position = node.pose?.position;
            const x = position?.x;
            const y = position?.y;
            return (x != null && y != null) ? { x, y } : null;
        }).filter(coord => coord !== null);

        if (positions.length === 0) {
            return console.error("Error: No valid positions found in the 'nodes' data.");
        }

        generateDotGrid(positions);
    };

    reader.readAsText(file);
}

function generateDotGrid(positions) {
    const canvas = document.getElementById("dotGridCanvas") || document.createElement("canvas");
    if (!canvas.id) {
        canvas.id = "dotGridCanvas";
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const margin = 50, dotSize = 5;

    const [minX, maxX] = [Math.min(...positions.map(c => c.x)), Math.max(...positions.map(c => c.x))];
    const [minY, maxY] = [Math.min(...positions.map(c => c.y)), Math.max(...positions.map(c => c.y))];
    const scaleX = (canvas.width - 2 * margin) / (maxX - minX);
    const scaleY = (canvas.height - 2 * margin) / (maxY - minY);

    positions.forEach(({ x, y }) => {
        const canvasX = margin + (x - minX) * scaleX;
        const canvasY = canvas.height - margin - (y - minY) * scaleY;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
    });

    console.log("Dot grid generated successfully.");
    downloadImage(canvas);
}

function downloadImage(canvas) {
    const link = document.createElement("a");
    link.download = "dot_grid_image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}


////////////////////////////// .map to .json converter //////////////////////

function triggerFileInput() {
    const fileInput = document.getElementById("mapRenameFileInput");
    fileInput.click();
}
function renameMapToJson() {
    const fileInput = document.getElementById("mapRenameFileInput"); // Updated id
    if (fileInput.files.length === 0) {
        return console.error("Error: No MAP file selected.");
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const fileContent = e.target.result;

        const newFileName = file.name.replace(/\.map$/, ".json");

        const blob = new Blob([fileContent], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = newFileName;
        link.click();

        console.log(`File renamed and saved as ${newFileName}`);
    };

    reader.readAsText(file);

    fileInput.value = "";
}

/////////////////////////// .map to .csv ///////////////////////////////////////

function processFleetMapFile2() {
    const fileInput = document.getElementById("map2FileInput");
    if (fileInput.files.length === 0) {
        return console.error("Error: No JSON file selected.");
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        let data;
        try {
            data = JSON.parse(e.target.result);
        } catch (error) {
            return console.error("Error decoding JSON: ", error);
        }

        if (!data.nodes) {
            return console.error("Error: 'nodes' key not found in the JSON data.");
        }

        const positions = data.nodes.map(node => {
            const position = node.pose?.position;
            const x = position?.x;
            const y = position?.y;
            return (x != null && y != null) ? { x, y } : null;
        }).filter(coord => coord !== null);

        if (positions.length === 0) {
            return console.error("Error: No valid positions found in the 'nodes' data.");
        }

        generateCSV(positions);
    };

    reader.readAsText(file);
}

function generateCSV(positions) {
    positions.sort((a, b) => a.x - b.x);

    const header = "x_value,y_value\n";
    const rows = positions.map(({ x, y }) => `${x},${y}`).join("\n");
    const csvContent = header + rows;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.download = "env.csv";
    link.href = URL.createObjectURL(blob);
    link.click();

    console.log("env.csv generated successfully.");
}

//////
///////
///////////
//////////////
