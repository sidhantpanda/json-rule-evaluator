import { evaluate, SPECIAL_OPERATORS, } from '../evaluators';
import { Rule } from './types/';
import RuleItemNode, { IRuleItemNode, getTree, RULE_ITEM_EVALUATION_STATUS } from './rule-item-node';

const getAndResult = (
  data: any,
  ruleItemsWithId: RuleItemNode[]
): boolean => {
  let result = true;
  for (let i = 0; i < ruleItemsWithId.length; i++) {
    const thisResult = getResult(data, ruleItemsWithId[i]);
    ruleItemsWithId[i].status = thisResult ?
      RULE_ITEM_EVALUATION_STATUS.TRUE
      : RULE_ITEM_EVALUATION_STATUS.FALSE;
    result = result && thisResult;
    if (result === false) {
      break;
    }
  }
  return result;
};

const getOrResult = (
  data: any,
  ruleItemsWithId: RuleItemNode[]
): boolean => {
  let result = false;
  for (let i = 0; i < ruleItemsWithId.length; i++) {
    const thisResult = getResult(data, ruleItemsWithId[i]);
    ruleItemsWithId[i].status = thisResult ?
      RULE_ITEM_EVALUATION_STATUS.TRUE : RULE_ITEM_EVALUATION_STATUS.FALSE;
    result = result || thisResult;
    if (result === true) {
      break;
    }
  }
  return result;
};

export const getResult = (data: any, ruleWithIdentifier: RuleItemNode): boolean => {
  let result: boolean = false;
  if (ruleWithIdentifier.operator) {
    if (ruleWithIdentifier.operator === SPECIAL_OPERATORS.$and) {
      result = getAndResult(data, ruleWithIdentifier.children || []);
    } else if (ruleWithIdentifier.operator === SPECIAL_OPERATORS.$or) {
      result = getOrResult(data, ruleWithIdentifier.children || []);
    }
  } else if (ruleWithIdentifier.rule) {
    result = evaluate(data, ruleWithIdentifier.rule);
  }

  ruleWithIdentifier.status = result ? RULE_ITEM_EVALUATION_STATUS.TRUE : RULE_ITEM_EVALUATION_STATUS.FALSE;
  return result;
};

export default class RuleEvaluator {
  private originalRule: Rule;
  public ruleWithIdentifier: RuleItemNode;

  constructor(rule: Rule) {
    this.originalRule = rule;
    this.ruleWithIdentifier = getTree(rule);
  }

  public test = (data: any): { result: boolean, details: IRuleItemNode } => {
    const result = getResult(data, this.ruleWithIdentifier);
    return {
      result,
      details: this.ruleWithIdentifier.toJSON()
    };
  }
}
