const data = input.split('\n\n');
var answersGroups = [];
data.map(answers => answersGroups.push(answers.split(/\n/)));
const reducer = (accumulator, currentValue) => accumulator + currentValue;

function letterFound(letter, group) {
    return group.find(element => element == letter);
}

function isInGroup(letter, grup) {
    var valid = 0;
    grup.map(resp => {
        if (resp.search(letter) != -1)
            valid++;
    });
    return (valid === grup.length) ? true : false;
}

function oneSolution() {
    var countAnswersByGroups = [];
    var sumAnswers = 0;

    answersGroups.map(group => {
        var letterbyGroup = [];
        group.map(resp => {
            if (resp.length > 1) {
                var answersbyperson = resp.split('');
                answersbyperson.map(answer => {
                    if (letterFound(answer, letterbyGroup) == undefined)
                        letterbyGroup.push(answer);
                });
            } else {
                if (letterFound(resp, letterbyGroup) == undefined)
                    letterbyGroup.push(resp);
            }
        });
        countAnswersByGroups.push(letterbyGroup.length);
    });

    sumAnswers = countAnswersByGroups.reduce(reducer)
    return sumAnswers;

}

function twoSolution() {
    var countAnswersByGroups = [];
    var sumAnswers = 0;

    answersGroups.map(group => {
        var letterbyGroup = [];
        group.map(resp => {
            if (resp.length > 1) {
                var answersbyperson = resp.split('');
                answersbyperson.map(answer => {
                    if (letterFound(answer, letterbyGroup) == undefined && isInGroup(answer, group))
                        letterbyGroup.push(answer);
                });
            } else {
                if (letterFound(resp, letterbyGroup) == undefined && isInGroup(resp, group))
                    letterbyGroup.push(resp);
            }
        });
        countAnswersByGroups.push(letterbyGroup.length);
    });
    
    sumAnswers = countAnswersByGroups.reduce(reducer)
    return sumAnswers;

}

var result1 = oneSolution();
var result2 = twoSolution();
document.getElementById('day-six-one').innerHTML = result1;
console.log('the sum of these counts is ' + result1);

document.getElementById('day-six-two').innerHTML = result2;
console.log(result2 + " part two");


