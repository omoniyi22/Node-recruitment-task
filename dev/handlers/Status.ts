interface IStatus {
  NOT_FOUND: number;
  BAD_REQUEST: any;
  CREATED: any;
  OK: any;
  NO_CONTENT: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  CONFLICT: number;
  SERVER_ERROR: any;
  SERVICE_UNAVAILABLE: number;
  FETCHED: any
}

const Status: IStatus = {
  NOT_FOUND: 404,
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request"
  },
  CREATED: {
    code: 201,
    message: "Created Successfully"
  },
  OK: {
    code: 200,
    message: "Successfully"
  },
  FETCHED: {
    code: 200,
    message: "Fetched successfully"
  },
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  SERVER_ERROR: {
    code: 500,
    message: "Error"
  },
  SERVICE_UNAVAILABLE: 503
};

export default Status;
