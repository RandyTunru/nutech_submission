import HttpException from './http-exception';
class UnauthorizedException extends HttpException{
    constructor(message: string) {
        super(401, 103, message);
    }
}

export default UnauthorizedException;