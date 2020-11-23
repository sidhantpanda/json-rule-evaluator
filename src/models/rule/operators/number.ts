import { BaseRuleItem, BaseOperator } from './base';

type NUMBER_OPERATORS = '==' | '!=' | '<' | '>' | '<=' | '>=';

export interface RuleItemNumber extends BaseRuleItem {
  /** Value to be checked against */
  value?: number;
  /** Operator to be invoked */
  operator: NUMBER_OPERATORS
}

export default class NumberOperator extends BaseOperator<number, NUMBER_OPERATORS> {
  public invoke = (source: number, target: number, operator: NUMBER_OPERATORS): boolean => {
    switch (operator) {
      case '==':
        return source === target;
      case '!=':
        return source != target;
      case '<':
        return source < target;
      case '>':
        return source > target;
      case '<=':
        return source <= target;
      case '>=':
        return source >= target;
      default:
        return false;
    }
  }
}
