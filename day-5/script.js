const data = input.split(`\n`);
const binarySpacePart = [];
data.map(b => binarySpacePart.push(b.split(``)));
const rows = 128;
const cols = 8;

var PartbyID = [];
function lowerHalf(zone) {
    return [zone[0], parseInt(zone[0] / 2) + parseInt(zone[1] / 2)]
}
function upperHalf(zone) {
    return [parseInt((zone[1] - zone[0]) / 2) + zone[0] + 1, zone[1]];
}
function findRow(letter, zone) {
    return (letter === 'F') ? lowerHalf(zone) : upperHalf(zone);
}
function findCol(letter, zone) {
    return (letter === 'L') ? lowerHalf(zone) : upperHalf(zone);
}
function getSeatID(row, col) {
    return (row * 8) + col;
}

binarySpacePart.map((binary) => {
    searchRow = [0, rows - 1];
    searchCol = [0, cols - 1];
    for (var i = 0; i <= 6; i++) {
        searchRow = findRow(binary[i], searchRow);
    }
    for (var i = 7; i <= 9; i++) {
        searchCol = findCol(binary[i], searchCol);
    }
    PartbyID.push(getSeatID(searchRow[0], searchCol[0]));
});
var max = Math.max.apply(null, PartbyID);
var min = Math.min.apply(null, PartbyID);

function searchMissing(PartbyID, max, min) {
    let found = null;
    for (var i = min; i <= max; i++) {
        found = PartbyID.find(e => e == i);
        if (PartbyID.find(e => e == i + 1) && PartbyID.find(e => e == i - 1) && found == undefined) 
            return i;
    }
}

var result1 = max;
var result2 = searchMissing(PartbyID, max, min);
document.getElementById('day-five-one').innerHTML = result1;
console.log(result1 + ' is the largest number ID');

document.getElementById('day-five-two').innerHTML = result2;
console.log(result2 + " it's my seat number");
