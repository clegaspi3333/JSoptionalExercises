//Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these into individual array that is ordered. For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]
const originalArr = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];

//map same numbers and strings in mini arrays
const groupInArrays =(arr2) => {
    let smallgrp = [];
    let mainArr = [];
    arr2.forEach(item => {
        if (smallgrp.length === 0 || smallgrp[0] === item) {
            smallgrp.push(item);
        }else {
            if (smallgrp.length > 1) {
                mainArr.push(smallgrp);
            } else {
                mainArr.push(smallgrp[0]);
            }
        smallgrp = [item];
        }   
    })

    if (smallgrp.length >0) {
     if (smallgrp.length >1) {
        mainArr.push(smallgrp);
    } else {
        mainArr.push(smallgrp[0]);
        }
    }
    return mainArr;
}

const cleanRoom = (arr) => {
     //identify numbers from strings
     let numbers =[];
     let others =[];
     arr.forEach(item => {
        if (typeof item === 'number') {
            numbers.push(item);
        } else {
            others.push(item);
        }
     });
     //arrange numbers and strings in ascending order
     let GrpNums = groupInArrays(numbers.sort((a,b) => a-b));
     let GrpOthers = groupInArrays(others.sort());
     

     //combine numbers and strings arrays
     let answerArr = [];
     if (GrpNums.length >0) {
        if (GrpOthers.length === 0){
            answerArr = answerArr.concat(GrpNums);
        } else {
            answerArr.push(GrpNums);
        }
     }
     if (GrpOthers.length >0) {
        answerArr.push(GrpOthers);
     }  
return answerArr;
}

cleanRoom(originalArr);


//Question 2: Write a javascript function that takes an array of numbers and a target number. The function should find two different numbers in the array that, when added together, give the target number. For example: answer([1,2,3], 4)should return [1,3]

const AddTwoOfEquals = (arr, num) => {
    let totalPairs = [];
    
    arr.forEach((item, i, array) => {
        array.forEach((nextItem, j) => {
            if (i < j && item + nextItem === num) { // Avoid duplicate pairs and self-pairing
                totalPairs.push([item, nextItem]);
            }
        });
    });
    return totalPairs;
};

// Example usage
console.log(AddTwoOfEquals([1, 2, 3], 4)); 


//Question 3: Write a function that converts HEX to RGB. Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.

const isHex=(digits)=> {
    let hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexRegex.test(digits);
}

const isRgb=(input)=> {
    const rgbIntegerRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    return rgbIntegerRegex.test(input);
}

const CharChecker = (numset) => {
    // Parse the hexadecimal value directly
    return parseInt(numset, 16); 
};

const rgbtohex = (char) => {
    char = Math.trunc(char);
    if (char <= 9) {
        return String(char);
    } else {
        switch (char) {
            case 10:
                char="A";
                break;
            case 11:
                char="B"
                break;
            case 12:
                char="C"
                break;
            case 13:
                char="D"
                break;
            case 14:
                char="E"
                break;
            case 15:
                char="F"
                break;
        }
    }
    return char;
}

const ColourConverter = (item) => {
    if (isHex(item)) {
        // Extract each RGB component from the hex string
        let red = CharChecker(item.substring(1, 3));  // First two characters
        let green = CharChecker(item.substring(3, 5)); // Middle two characters
        let blue = CharChecker(item.substring(5, 7)); // Last two characters

        console.log(`rgb(${red}, ${green}, ${blue})`);

      } else if (isRgb(item)) {
        let rgbmixed = item.match(/\d+/g).map(Number); //extract digits and convert to Numbers
        let finalRgb = rgbmixed.map((value)=> {
            let high = rgbtohex(value/16);
            let low = rgbtohex(value%16);
            return `${high}${low}`;
        });
        let hex = finalRgb.join("");
        console.log("#" + hex);
        
      } else {
        console.log("Please enter a valid color.");
      }
}

ColourConverter("#FD9878");
ColourConverter("rgb(45, 79, 20)");