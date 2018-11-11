export class NotEnoughChoicesError extends Error {
  public askedElementCount: number;
  public availableElementCount: number;
  constructor(askedElementCount: number, availableElementCount: number) {
    super();
    this.askedElementCount = askedElementCount;
    this.availableElementCount = availableElementCount;
    Object.setPrototypeOf(this, NotEnoughChoicesError.prototype);
  }
}
