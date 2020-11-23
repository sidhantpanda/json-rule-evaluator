import { BaseRuleItem, BaseOperator } from './base';

type BOOLEAN_OPERATORS = 'eq' | 'ne' | 'and' | 'or';

export interface RuleItemBoolean extends BaseRuleItem {
  /** Value to be checked against */
  value?: boolean;
  /** Operator to be invoked */
  operator: BOOLEAN_OPERATORS
}

export default class BooleanOperator extends BaseOperator<boolean, BOOLEAN_OPERATORS> {
  public invoke = (source: boolean, target: boolean, operator: BOOLEAN_OPERATORS): boolean => {
    switch (operator) {
      case 'eq':
        return source === target;
      case 'ne':
        return source != target;
      case 'and':
        return source && target;
      case 'or':
        return source || target;
      default:
        return false;
    }
  }
}
