class HttpException extends Error {
    httpStatusCode: number;
    applicationStatusCode: number;
    constructor(httpStatusCode: number, applicationStatusCode: number,  message: string) {
        super(message);
        this.httpStatusCode = httpStatusCode;
        this.applicationStatusCode = applicationStatusCode;
    }
}

export default HttpException;