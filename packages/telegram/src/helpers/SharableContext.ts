import { Context } from "../context";

export class SharableContext {
  constructor(
    private readonly context: any,
  ) {}

  public getContext(): Context {
    return this.context as Context
  };
};