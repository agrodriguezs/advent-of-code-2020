const numbers = input.split('\n');
numbers.map(n => n = parseInt(n));
const predecessors = 25;
var numberError = null;
var rangeSumNumberError = [];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

function searchRange(number){
    var sum = 0;
    
    for (var i = 0; i < numbers.length; i++){
        rangeSumNumberError = [];
        var a = parseInt(numbers[i]);
        rangeSumNumberError.push(a);
        for (var j = i+1; j <  numbers.length; j++){
            var b = parseInt(numbers[j]);
            rangeSumNumberError.push(b);
            sum = rangeSumNumberError.reduce(reducer);

            if ( sum >= number){
                j = numbers.length;
                     if ( sum == number )
                        i =  numbers.length;                
            }
        }
    }
    return rangeSumNumberError;
}


function searchError(n){
    var valido = false;
    for (var i = n-predecessors; i < n; i++){
        for (var j = n-predecessors; j < n; j++){
            a = parseInt(numbers[i]);
            b = parseInt(numbers[j]);
            c = parseInt(numbers[n]);
            sum = a + b;
            if ((a != b )&& ( sum === c) ){
                valido = true;
            }
        }
    }
    return valido;
}
for (var i = predecessors; i < numbers.length; i++){
    if (!searchError(i)) 
        numberError = numbers[i];
}

document.getElementById('day-nine-one').innerHTML = numberError;
console.log('The number that does not follow rule is: ' + numberError);

rangeSumNumberError = searchRange(numberError);
var max = Math.max.apply(null, rangeSumNumberError);
var min = Math.min.apply(null, rangeSumNumberError);
var sumMaxMin = max + min;
console.log(min + ' and ' + max + ', producing: ' +  sumMaxMin);


document.getElementById('day-nine-two').innerHTML = sumMaxMin;

