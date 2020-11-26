import RuleItem, { SPECIAL_OPERATORS, } from '../../evaluators';


export type RuleBaseSpecialPath = {
  [key in SPECIAL_OPERATORS]?: Array<Rule>;
};

export type Rule = RuleBaseSpecialPath | RuleItem;
