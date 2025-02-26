const {getMinNumber} = require('./util.js');
const express = require('express');

const app = new express();
const port = 3000;
//const greeting={message:'hello node'};

app.get('/number/max', (req, res) => {});

///number/avg?numbers=1,4,7,44,676,......n
app.get('/number/avg', (req, res) => {}); 

///number/sort?numbers=1,4,7,44,676,......n&type (asc |dec)
app.get('/number/sort', (req, res) => {}); 

///number/count?numbers=1,A,saman,Kamal,676,......n&search=saman //need to return how many occurances
app.get('/number/count', (req, res) => {}); 

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