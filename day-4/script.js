const data = input.split('\n\n');
const requiredData = /byr|iyr|eyr|hgt|hcl|ecl|pid/;
const requiredNumber = /7/;
var passports = [];
data.map(passport => {
    passports.push(passport.split(/ |\n/));
});

passports.map(pass => {
    pass.forEach((pair, index) => {
        let info = [];
        info.push(pair.split(':'));
        pass[index] = info;
    });
});

function getValidPassports() {
    var validPassports = 0;
    passports.map(pass => {
        var countRequired = 0;
        pass.map(info => {
            info.map(pair => {
                if (requiredData.test(pair[0]))
                    countRequired++
            });
        });
        if (requiredNumber.test(countRequired))
            validPassports++;
    });
    return validPassports;
}

function yrValid(key, year) {
    var yearNumber = parseInt(year);
    //(Birth Year) - four digits; at least 1920 and at most 2002.
    if (key == 'byr')
        return (yearNumber >= 1920 && yearNumber <= 2002) ?  true : false;

    // (Issue Year) - four digits; at least 2010 and at most 2020.
    if (key == 'iyr')
        return (yearNumber >= 2010 && yearNumber <= 2020) ?  true : false;

    //(Expiration Year) - four digits; at least 2020 and at most 2030.
    if (key == 'eyr')
        return (yearNumber >= 2020 && yearNumber <= 2030) ?  true : false;
}

//(Height) - a number followed by either cm or in:
function hgtValid(height) {
    var heightNumber = parseInt(height);
    const cmNumber = /cm/;
    const inNumber = /in/;

    //If cm, the number must be at least 150 and at most 193.
    if (cmNumber.test(height))
        return (heightNumber >= 150 && heightNumber <= 193) ?  true : false;

    //If in, the number must be at least 59 and at most 76.
    if (inNumber.test(height))
        return (heightNumber >= 59 && heightNumber <= 76) ?  true : false;

}
//hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
function hclValid(hairColor) {
    const hairColorValid = /^#[0-9a-f]{6,6}/;
    return (hairColorValid.test(hairColor)) ?  true : false;
}

function eclValid(eyeColor) {
    const eyeColorValid = /amb|blu|brn|gry|grn|hzl|oth/;
    return (eyeColorValid.test(eyeColor)) ?  true : false;
}

// (Passport ID) - a nine-digit number, including leading zeroes.
function pidValid(id) {
    const passIdValid = /^(\d){9}$/;
    return (passIdValid.test(id)) ?  true : false;
}   


function getValidPassportsTwo() {
    var validPassports = 0;
    passports.map(pass => {
        var countRequired = 0;
        pass.map(info => {
            info.map(pair => {
                if (pair[0] == 'byr' && yrValid('byr', pair[1]))
                    countRequired++
                if (pair[0] == 'iyr' && yrValid('iyr', pair[1]))
                    countRequired++
                if (pair[0] == 'eyr' && yrValid('eyr', pair[1]))
                    countRequired++
                if (pair[0] == 'hgt' && hgtValid(pair[1]))
                    countRequired++
                if (pair[0] == 'hcl' && hclValid(pair[1]))
                    countRequired++
                if (pair[0] == 'ecl' && eclValid(pair[1]))
                    countRequired++
                if (pair[0] == 'pid' && pidValid(pair[1]))
                    countRequired++

            });
        });
        if (requiredNumber.test(countRequired))
            validPassports++;
    });
    return validPassports;
}

var result1 = getValidPassports();
var result2 = getValidPassportsTwo();

document.getElementById('day-four-one').innerHTML = result1;
console.log(result1 + ' passports valid');

document.getElementById('day-four-two').innerHTML = result2;
console.log('second part: ' + result2);
