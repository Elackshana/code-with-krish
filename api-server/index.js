const {getMinNumber, getMaxNumber, getAvgNumber, sortNumbers, countOccurrences} = require('./util.js');
const express = require('express');

const app = new express();
const port = 3000;
//const greeting={message:'hello node'};

//http://localhost:3000/number/max?numbers=3,4,6,10,4
app.get('/number/max', (req, res) => {
    const numbers = req.query.numbers.split(',');
    const result = getMaxNumber(numbers);
    res.status(result.status).json(result.data);
});

///number/avg?numbers=1,4,7,44,676,......n
//http://localhost:3000/number/avg?numbers=2,6,1
app.get('/number/avg', (req, res) => {
    const numbers = req.query.numbers.split(',');
    const result = getAvgNumber(numbers);
    res.status(result.status).json(result.data);
}); 

///number/sort?numbers=1,4,7,44,676,......n&type (asc |dec)
//http://localhost:3000/number/sort?numbers=2,6,1,9&type=asc
app.get('/number/sort', (req, res) => {
    const numbers = req.query.numbers.split(',');
    const type = req.query.type;
    const result = sortNumbers(numbers,type);
    res.status(result.status).json(result.data);
}); 

///http://localhost:3000/number/count?numbers=1,A,saman,Kamal,676,......n&search=saman //need to return how many occurances
//http://localhost:3000/number/count?numbers=1,A,saman,Kamal,saman,saman,676&search=saman
app.get('/number/count', (req, res) => {
    const numbers = req.query.numbers.split(',');
    const search = req.query.search;
    const result = countOccurrences(numbers,search);
    res.status(result.status).json(result.data);
}); 

//Lab exercise :

app.get('/number/min',(req,res) => {

    const num1 = parseFloat (req.query.num1);
    const num2 = parseFloat (req.query.num2);

    const result = getMinNumber(num1,num2);
    res.status(result.status).json(result.data);


    //res.json({min: Math.min(num2, num1)});
    // if(isNaN(num1)|| isNaN(num2)){
    //     res.status(400).json(`error:both values must be number`);
    // }else{
    //     res.json({min: num1 > num2 ? num2 : num1});
    // }
        
});
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});
//note : json will convert NaN as null