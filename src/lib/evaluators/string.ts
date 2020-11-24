import { BaseRuleItem, BaseEvaluator, BaseOperators } from './base';

type STRING_OPERATORS = BaseOperators
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'doesntContain'
  | 'doesntStartWith'
  | 'doesntEndWith';

export interface RuleItemString extends BaseRuleItem {
  /** Value to be checked against */
  value?: string;
  /** Operator to be invoked */
  operator: STRING_OPERATORS,
  options?: {
    caseSensitive?: boolean
  }
}

export default class StringEvaluator extends BaseEvaluator<RuleItemString> {
  constructor(ruleItem: RuleItemString) {
    super(ruleItem, { loadCommonOperators: true });

    this.addOperator('contains', (source: string, target: string) => source.indexOf(target) >= 0);
    this.addOperator('startsWith', (source: string, target: string) => source.startsWith(target));
    this.addOperator('endsWith', (source: string, target: string) => source.endsWith(target));
    this.addOperator('doesntContain', (source: string, target: string) => source.indexOf(target) < 0);
    this.addOperator('doesntStartWith', (source: string, target: string) => !source.startsWith(target));
    this.addOperator('doesntEndWith', (source: string, target: string) => !source.endsWith(target));
  }
}
