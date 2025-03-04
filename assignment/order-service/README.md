https://blog.nashtechglobal.com/handling-http-requests-in-nestjs/ :
const response = await this.httpService.get('https://example.com/api/users');
const statusCode = response.status;

https://www.npmjs.com/package/@nestjs/axios:
npm i --save @nestjs/axios axios

https://docs.nestjs.com/techniques/http-module :
<!-- findAll(): Observable<AxiosResponse<Cat[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  } -->
  
https://stackoverflow.com/questions/75642287/how-to-change-an-observable-http-request-to-promise-request:
async yourFunction(): Promise {
    const request$ = this.httpClient.get(yourUrl).pipe(take(1));

    return await lastValueFrom(request$);
  }

