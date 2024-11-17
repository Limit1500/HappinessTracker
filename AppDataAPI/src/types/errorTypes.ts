export class CustomError extends Error {
  public statusCode: number;
  constructor(
    message: string = "A unexpected error occured",
    statusCode: number = 500
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
