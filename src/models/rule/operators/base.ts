interface RuleOptions {
  caseSensitive?: boolean;
}

export interface BaseRuleItem {
  // type: T,
  /** Dot separated JSON access */
  path: string;
  /** Reference to some other part of the JSON */
  ref?: string;
  options?: RuleOptions;
}

export abstract class BaseOperator<T, U> {
  abstract invoke: { (source: T, target: T, operator: U): boolean }
}
