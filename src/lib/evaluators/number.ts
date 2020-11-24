import { BaseRuleItem, BaseEvaluator, BaseOperators } from './base';

type NUMBER_OPERATORS = BaseOperators | '<' | '>' | '<=' | '>=';

export interface RuleItemNumber extends BaseRuleItem {
  /** Value to be checked against */
  value?: number;
  /** Operator to be invoked */
  operator: NUMBER_OPERATORS
}

export default class NumberEvaluator extends BaseEvaluator<RuleItemNumber> {
  constructor(ruleItem: RuleItemNumber) {
    super(ruleItem, { loadCommonOperators: true });

    this.addOperator('<', (source, target) => source < target);
    this.addOperator('>', (source, target) => source > target);
    this.addOperator('<=', (source, target) => source <= target);
    this.addOperator('>=', (source, target) => source >= target);
  }
}
