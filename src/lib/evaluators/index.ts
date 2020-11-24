import { BaseEvaluator } from './base';
import BooleanEvaluator, { RuleItemBoolean } from './boolean';
import NumberEvaluator, { RuleItemNumber } from './number';
import StringEvaluator, { RuleItemString } from './string';
import _ from 'lodash';

export type RuleItem = RuleItemBoolean | RuleItemNumber | RuleItemString;

export const evaluate = (data: any, rule: RuleItem): boolean => {
  let sourceValue = _.get(data, rule.path, null);
  const warnings = [];
  let targetValue = null;
  if (rule.value != null) {
    targetValue = rule.value;
  } else if (rule.ref != null) {
    targetValue = _.get(data, rule.ref, targetValue);
  } else {
    warnings.push({
      rule,
      message: 'Missing `value` or `ref`. Proceeding with `null` as deafult value'
    })
  }

  let operator: BaseEvaluator | BooleanEvaluator | NumberEvaluator | StringEvaluator;

  switch (typeof sourceValue) {
    case 'string':
      if ((rule as RuleItemString).options && (rule as RuleItemString).options?.caseSensitive === true) {
        // Do not modify values
      } else {
        // Evaluate case-insensitive by default
        sourceValue = (sourceValue as string).toLowerCase();
        targetValue = (targetValue as string).toLowerCase();
      }
      operator = new StringEvaluator(rule as RuleItemString);
      break;
    case 'number':
      operator = new NumberEvaluator(rule as RuleItemNumber);
      break;
    case 'boolean':
      operator = new BooleanEvaluator(rule as RuleItemBoolean);
      break;
    default:
      operator = new BaseEvaluator(rule, { loadCommonOperators: false });
      break;
  }

  return operator.test((sourceValue), targetValue);
}

export default RuleItem;


