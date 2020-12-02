//compare the numbers to see which add up to 2020
data.forEach((number1, i) => {
	data.forEach((number2, j) => {
		data.forEach((number3, k) => {
            if( i !== j && i !== k ) {
                if (number1 + number2 + number3 === 2020){
                    //show by console the result of the puzzle
                    console.log("--- Part Two ---");
                    console.log('puzzle answer: ' + number1*number2*number3);
                }
            }
            
        });
    });
});
