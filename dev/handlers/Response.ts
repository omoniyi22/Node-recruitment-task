export default class Responses {
  constructor() {
    this.SuccessResponse = this.SuccessResponse.bind(this);
    this.ErrorResponse = this.ErrorResponse.bind(this);
  }

  public async SuccessResponse(
    res: any,
    code: number,
    message: string,
    data: any
  ) {
    const _data = {
      message,
      data,
    };

    return res.status(code).json(_data);
  }

  public async ErrorResponse(
    res: any,
    code: number,
    message: string,
    error: any
  ) {
    const _error = {
      message,
      error,
    };

    return res.status(code).json(_error);
  }
}
