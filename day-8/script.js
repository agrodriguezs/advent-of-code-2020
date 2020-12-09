const data = input.split('\n');
operations = [];
data.map(operation => operations.push(operation.split(' ')));
operations.map(operation => operation.push('not executed'));
var acumulator = 0;
var orden = 0;
var infiniteLoop = false;
var operationsToChange = [];
operations.map((operation, index) => {
    var toCHange = [];
    if (operation[0] == 'jmp' ||operation[0] == 'nop' ){
        toCHange.push(index);
        toCHange.push(operation[0]);
        operationsToChange.push(toCHange);
    }
});
var success = false;

function evaluarIndex(index) {
    return (parseInt(index) >= 0 && parseInt(index) < operations.length) ? true : false;
}

//accumulator
function acc(argument, index) {
    var operator = argument.substr(0, 1);
    var cant = argument.substr(1, argument.length - 1);
    if (evaluarIndex(index)) {
        if (operator == '+')
            acumulator = acumulator + parseInt(cant);
        else {
            acumulator = acumulator - parseInt(cant);
        }
        index = index + 1;
        return index;
    } else {
        infiniteLoop = true;
        return index;
    }
}

//jumps
function jmp(argument, index) {
    var operator = argument.substr(0, 1);
    var cant = argument.substr(1, argument.length - 1);

    if (evaluarIndex(index)) {
        if (operator == '+')
        index = parseInt(index) + parseInt(cant);
    else
        index = parseInt(index) - parseInt(cant);
        return index;
    } else {
        infiniteLoop = true;
        return index;
    }

}

//No OPeration
function nop(index) {
        index = parseInt(index) + 1;
        return index;
}

function ejecutadoTodo() {
    return  (operations[operations.length-1][2] === 'executed') ? true : false;
}

function ejecutar() {
    var i = 0;
    var hecho = ejecutadoTodo();
    do {
        if (operations[i][2] == 'not executed') {
            if (operations[i][0] === 'acc') {
                operations[i][2] = 'executed'
                i = acc(operations[i][1], i);
            }else if (operations[i][0] === 'jmp') {
                operations[i][2] = 'executed'
                i = jmp(operations[i][1], i);
            }else if (operations[i][0] === 'nop') {
                operations[i][2] = 'executed'
                i = nop(i);
            }
        } else {
            infiniteLoop = true;
        }
    } while (infiniteLoop == false && !hecho && i !== operations.length );
    if (infiniteLoop) return 'infinite loop';
    if (hecho) success = true;
}
function partTwo(){
    for (var i = 0; i < operationsToChange.length; i++) {
        operations[operationsToChange[i][0]][0] = (operations[operationsToChange[i][0]][0] == 'jmp') ? 'nop' : 'jmp';
        ejecutar();
        if (!infiniteLoop){
            i = operationsToChange.length;
        } else{
            operations[operationsToChange[i][0]][0] = (operations[operationsToChange[i][0]][0] === 'jmp') ? 'nop' : 'jmp';
            operations.map(operation => operation[2]= 'not executed');
            infiniteLoop = false;
            acumulator = 0;
        }
        
    }
}

ejecutar();
document.getElementById('day-eight-one').innerHTML = acumulator;
console.log('acumulator: ' + acumulator);
partTwo();
document.getElementById('day-eight-two').innerHTML = acumulator;
console.log('acumulator: ' + acumulator);

