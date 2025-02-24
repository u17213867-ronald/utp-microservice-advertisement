export class ResponseDto<T = any> {
    code: number;
    message: string;
    data: T;
  
    constructor(data: T = null, code: number = 200, message: string = 'ok') {
      this.code = code;
      this.message = message;
      this.data = data;
    }
  }
  