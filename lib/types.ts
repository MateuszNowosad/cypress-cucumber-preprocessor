export interface IParameterTypeDefinition<T> {
  name: string;
  regexp: RegExp;
  transformer: (this: Mocha.ITestCallbackContext, ...match: string[]) => T;
  useForSnippets?: boolean;
  preferForRegexpMatch?: boolean;
}

export type YieldType<T extends Generator> = T extends Generator<infer R>
  ? R
  : never;