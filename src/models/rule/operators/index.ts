import { BaseOperator } from './base';
// import { RuleItemAnd } from './and';
import BooleanOperator, { RuleItemBoolean } from './boolean';
import NumberOperator, { RuleItemNumber } from './number';
import StringOperator, { RuleItemString } from './string';
import _, { fromPairs } from 'lodash';

export type RuleItem = RuleItemBoolean | RuleItemNumber | RuleItemString;

class DefaultOperator extends BaseOperator<any, any> {
  public invoke = (source: any, target: any, operation: any): boolean => false;
}

export const invoke = (source: any, rule: RuleItem): boolean => {
  const sourceValue = _.get(source, rule.path, null);
  let targetValue = null;
  if (rule.value != null) {
    targetValue = rule.value;
  } else if (rule.ref != null) {
    targetValue = _.get(source, rule.ref, targetValue);
  }

  let operator: BooleanOperator | NumberOperator | StringOperator | DefaultOperator;
  switch (typeof sourceValue) {
    case 'string':
      operator = new StringOperator();
      break;
    case 'number':
      operator = new NumberOperator();
      break;
    case 'boolean':
      operator = new BooleanOperator();
      break;
    default:
      operator = new DefaultOperator();
      break;
  }

  return operator.invoke(sourceValue, targetValue, rule.operator);
}

export default RuleItem;


