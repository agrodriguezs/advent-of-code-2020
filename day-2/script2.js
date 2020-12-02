var contValid2 = 0;
data.forEach((info, i) => {
    let contChar = 0;
    let parts = info.split('-');
    let position1 = parseInt(parts[0])
    parts = parts[1].split(' ');
    let position2 = parseInt(parts[0])
    let char = parts[1];
    char = char.substring(0, char.length - 1)
    let passw = parts[2];
    let passArray = passw.split('');
    if ((passArray[position1-1] === char && passArray[position2-1] !== char) || (passArray[position1-1] !== char && passArray[position2-1] === char) ) {
        contValid2++;
    }

});
console.log('total2: ' + contValid2);
document.getElementById('day-two-two').innerHTML=contValid2;