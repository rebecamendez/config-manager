export class EntityAlreadyExistsError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, EntityAlreadyExistsError.prototype);
  }
}
