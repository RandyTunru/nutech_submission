import HttpException from './http-exception';
class BadRequestException extends HttpException {
    constructor(message: string) {
        super(400, 102, message);
    }
}

export default BadRequestException;