const data = input.split('\n');
const routeMap = [];


data.forEach((tramo, i) => {
    routeMap.push(tramo.split(''));
});

function searchTrees(goRight, goDown ){
    var j = 0, openSquares = 0, trees = 0;
    var end = routeMap.length;
    for (var i = 0; i < end-1; i= i + goDown) {
        j = j + goRight;
        if (routeMap[i+goDown]) {
            if (j >= routeMap[i+goDown].length)  
                j = j - routeMap[i+goDown].length;
    
            if (routeMap[i+goDown][j] === '.')     
                openSquares++; 
            else   
                trees++; 
        }
    }  

    return trees;
}

var result1 = searchTrees(3,1); 
var result2 = searchTrees(3,1)*searchTrees(1,1)*searchTrees(5,1)*searchTrees(7,1)*searchTrees(1,2);

document.getElementById('day-three-one').innerHTML = result1;
console.log('Found: ' + result1 + ' trees');

document.getElementById('day-three-two').innerHTML = result2;
console.log('second part answer: ' + result2);


