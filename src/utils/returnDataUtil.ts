
/**
 * 数据操作是否成功
 */
enum ResultDataCode {
    success = 0,
    error = 1,
}

/**
 * error msg
 */
enum ResultDataErrString {
    DATABASE_ERR = "DATABASE_ERR",
    SERVER_ERR = "SERVER_ERR",
    PARAMS_NULL_ERR = "PARAMS_NULL_ERR"
}

/**
 * 返回数据包装类
 */
class ResultData<T> {
    private code: ResultDataCode;
    private errString: ResultDataErrString;
    private data: T = null;

    constructor() {
    }

    public setCode(code: ResultDataCode):ResultData<T> {
        this.code = code;
        return this;
    }

    public getErrCode(): ResultDataErrString {
        return this.errString;
    }

    public setErrCode(code: ResultDataErrString): ResultData<T>{
        this.errString = code;
        return this;
    }

    public getCode(): ResultDataCode {
        return this.code;
    }

    public setData(data: T): ResultData<T> {
        this.data = data
        return this;
    }

    public getData(): T {
        return this.data;
    }
}



export { ResultDataCode, ResultDataErrString, ResultData };

