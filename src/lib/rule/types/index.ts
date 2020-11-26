import RuleItem, { SPECIAL_OPERATORS, } from '../../evaluators';

export type Rule = RuleBaseSpecialPath | RuleItem;

export type RuleBaseSpecialPath = {
  [key in SPECIAL_OPERATORS]?: Array<Rule>;
};
