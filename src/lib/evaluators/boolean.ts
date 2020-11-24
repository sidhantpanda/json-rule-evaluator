import { BaseRuleItem, BaseEvaluator, BaseOperators } from './base';

type BOOLEAN_OPERATORS = BaseOperators | 'and' | 'or';

export interface RuleItemBoolean extends BaseRuleItem {
  /** Value to be checked against */
  value?: boolean;
  /** Operator to be invoked */
  operator: BOOLEAN_OPERATORS;
}

export default class BooleanEvaluator extends BaseEvaluator<RuleItemBoolean> {
  // private rule: RuleItemBoolean;
  constructor(ruleItem: RuleItemBoolean) {
    super(ruleItem, { loadCommonOperators: true });

    this.addOperator('and', (source, target) => source && target);
    this.addOperator('or', (source, target) => source || target);
  }
}
