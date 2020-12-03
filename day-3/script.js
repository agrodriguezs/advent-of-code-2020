const data = input.split('\n');
const mapa = [];


data.forEach((tramo, i) => {
    mapa.push(tramo.split(''));
});

function searchTree(jota, down ){
    var mapPath = mapa;
    var j = 0, o = 0, x = 0;
    var end = mapPath.length;
    for (var i = 0; i < end-1; i= i+down) {
        j = j + jota;
        if (mapPath[i+down]) {
            if (j >= mapPath[i+down].length)  
                j= j-mapPath[i+down].length;
    
            if (mapPath[i+down][j] === '.')     
                o++; 
            else   
                x++; 
        }
    }  

    return x;
}

var result1 = searchTree(3,1); 
var result2 = searchTree(3,1)*searchTree(1,1)*searchTree(5,1)*searchTree(7,1)*searchTree(1,2);

document.getElementById('day-three-one').innerHTML = result1;
console.log('se encontro con: ' + result1 + ' árboles');

document.getElementById('day-three-two').innerHTML = result2;
console.log('segunda parte: ' + result2);


