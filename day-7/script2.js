const SEARCH = 'shiny gold';
const data = input.replace(/bags?\.?/g, '').trim().split('\n');
const rules2 = [];
var totalBags = 0;
var contadorbolsas = 0;

data.map(rule => rules2.push(rule.split(' contain ')));
rules2.map(rule => {
    rule[0] = rule[0].trim();
    rule[1] = rule[1].trim();
    rule[1] = rule[1].split(' , ')  ;
});
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

function searchIndex(contain){
    var search = -1;
    rules2.map((rule, index) =>  {
        if (rule[0] == contain) search = index;
    });
    return search;
}

totalBags = countBags(searchIndex(SEARCH));
console.log(totalBags);
