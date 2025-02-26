function getMinNumber(num1,num2){
    if(isNaN(num1)||isNaN(num2)){
        return{
            status:400,
            data: {
                error: `both parameters should be numbers`,
            },
        };
    }
    return {
        status:200,
        data: {min: Math.min(num1, num2)},
    };
}

function getMaxNumber(numbers){
    numbers= numbers.map(Number);
    for (let i = 0; i < numbers.length; i++) {
        if(isNaN(numbers[i])){
            return{
                status:400,
                data: {
                    error: `All parameters should be numbers`,
                },
            };
        }
    }
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if(numbers[i] > max){
            max = numbers[i];
            console.log(max);
        }
    }
    return {
        status:200,
        data: {max},
    };
}
function getAvgNumber(numbers){
    numbers= numbers.map(Number);

    let sum = 0
    for (let i = 0; i < numbers.length; i++) {
        if(isNaN(numbers[i])){
            return{
                status:400,
                data: {
                    error: `All parameters should be numbers`,
                },
            };
        }
        sum = sum + numbers[i];
    }
    
    avg = sum/ numbers.length;
    
    return {
        status:200,
        data: {avg},
    };
}
function sortNumbers(numbers, type){
    numbers= numbers.map(Number);
    if (numbers.length ===0){
        return{
            status:400,
            data: {
                error: `Array of elements are empty`,
            },
        };
    }

    for (let i = 0; i < numbers.length; i++) {
        if(isNaN(numbers[i])){
            return{
                status:400,
                data: {
                    error: `All parameters should be numbers`,
                },
            };
        }
    }
    
    if(type !== "asc"&& type !== "desc" ){
        return{
            status:400,
            data: {
                error: `Invalid type. Type should be asc or desc`,
            },
        };
    }
    if(type==="asc"){
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < (numbers.length - i - 1); j++) {
                    if (numbers[j] > numbers[j + 1] ) {
                        //swap
                        let temp = numbers[j]
                        numbers[j] = numbers[j + 1]
                        numbers[j + 1] = temp
                    }
            }
        }
    }
    if(type==="desc"){
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < (numbers.length - i - 1); j++) {
                    if (numbers[j] < numbers[j + 1] ) {
                        //swap
                        let temp = numbers[j]
                        numbers[j] = numbers[j + 1]
                        numbers[j + 1] = temp
                    }
            }
        }
    }

    
    return {
        status:200,
        data: {numbers},
    };
}
function countOccurrences(numbers, search){

    let count = 0
    for (let i = 0; i < numbers.length; i++) {
        if(numbers[i]===search){
            count++;
        }
    }
    
    return {
        status:200,
        data: {count},
    };
}
module.exports = {getMinNumber, getMaxNumber, getAvgNumber, sortNumbers, countOccurrences };