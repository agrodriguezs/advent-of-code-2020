const SEARCH = 'shiny gold';
const data = input.replace(/bags?\.?/g, '').trim().split('\n');
const data2 = input2.replace(/bags?\.?/g, '').trim().split('\n');
const rules = [];
var counter = 0;

const rules2 = [];
var totalBags = 0;

data.map(rule => rules.push(rule.split(' contain ')));
data2.map(rule => rules2.push(rule.split(' contain ')));
rules.map(rule => {
    rule[0] = rule[0].trim();
    rule[1] = rule[1].replace(/\d /g, '').trim().split(' , ');
});

rules2.map(rule => {
    rule[0] = rule[0].trim();
    rule[1] = rule[1].trim();
    rule[1] = rule[1].split(' , ')  ;
});


function searchB(ruleConIndex, search) {
    var rule = rules[ruleConIndex];
    var result = false;
    for (var i = 0; i < rule[1].length; i++) {
        var contain = rule[1][i];
        
        if (contain === SEARCH) {
           result = true;
        } else {
            if (contain === 'no other' ||rule[0][i] === SEARCH) {
                if (!result) result = false;
            } 
            else {
                var child = searchIndex(contain);
                if (!result) result = (searchB(child, search));
            }
        }

    }
    return result;
}

function searchIndex(contain){
    var search = -1;
    rules2.map((rule, index) =>  {
        if (rule[0] == contain) search = index;
    });
    return search;
}

function countBags(index) {
    var rule = rules2[index];
    var total = 0;
    for (var i = 0; i < rule[1].length; i++) {
        var contain = rule[1][i].substr(2,rule[1][i].length-1);
        var cant = rule[1][i].substr(0,1);
        if (cant == 'n') cant = 0;
        total = total + parseInt(cant);
        if (contain === ' other' ) {
               total +=  cant;
        } 
        else {
            var child = searchIndex(contain);
            total += cant*countBags(child);
        }
    }
    return total;
}


rules.map( (rule, index) => {
        if (searchB(index, SEARCH)) 
            counter++;
});


document.getElementById('day-seven-one').innerHTML = counter;
console.log('the sum of these counts is ' + counter);


totalBags = countBags(searchIndex(SEARCH));
document.getElementById('day-seven-two').innerHTML = totalBags;
console.log(totalBags + " part two");
