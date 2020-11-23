import { BaseRuleItem, BaseOperator } from './base';

type STRING_OPERATORS = 'eq' | 'contains' | 'endsWith' | 'ne' | 'doesntContain' | 'doesntStartWith' | 'doesntEndWith';

export interface RuleItemString extends BaseRuleItem {
  /** Value to be checked against */
  value?: string;
  /** Operator to be invoked */
  operator: STRING_OPERATORS
}

export default class NumberOperator extends BaseOperator<string, STRING_OPERATORS> {
  public invoke = (source: string, target: string, operator: STRING_OPERATORS): boolean => {
    return false;
  }
}
