export class DatabaseException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseException.prototype);
  }
}
