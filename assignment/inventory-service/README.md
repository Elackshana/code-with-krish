https://stackoverflow.com/questions/76921431/typeorm-postgres-nestjs-columndecimal-is-returning-string - 
@Column('decimal', {
    precision: 5,
    scale: 2
})

https://learn.microsoft.com/en-us/sql/t-sql/data-types/precision-scale-and-length-transact-sql?view=sql-server-ver16 -
Precision is the number of digits in a number. Scale is the number of digits to the right of the decimal point in a number. For example, the number 123.45 has a precision of 5 and a scale of 2.

https://www.npmjs.com/package/class-validator/v/0.6.0  -
npm install class-validator --save
@IsString(), @IsInt()


