import RuleItem, { SPECIAL_OPERATORS } from '../evaluators';
import { Rule, RuleBaseSpecialPath } from './types';

export enum RULE_ITEM_EVALUATION_STATUS {
  NOT_EVALUATED = 'not_evaluated',
  TRUE = 'true',
  FALSE = 'false',
}

interface RuleItemNodeOptions {
  rule?: RuleItem;
  operator?: SPECIAL_OPERATORS;
}

export interface IRuleItemNode {
  rule?: RuleItem;
  operator?: SPECIAL_OPERATORS;
  status: RULE_ITEM_EVALUATION_STATUS;
  children?: IRuleItemNode[];
}

export default class RuleItemNode {
  public rule: RuleItem | null = null;
  public operator: SPECIAL_OPERATORS | null = null;
  public status: RULE_ITEM_EVALUATION_STATUS;
  public children?: RuleItemNode[] | null = null;
  constructor(options?: RuleItemNodeOptions) {
    if (options?.rule) {
      this.rule = options?.rule;
    }
    if (options?.operator) {
      this.operator = options?.operator;
    }
    this.status = RULE_ITEM_EVALUATION_STATUS.NOT_EVALUATED;
  }

  public toJSON = () => {
    const getItem = (ruleWithIdentifierItem: RuleItemNode): IRuleItemNode => {
      return {
        rule: ruleWithIdentifierItem.rule ? ruleWithIdentifierItem.rule : undefined,
        operator: ruleWithIdentifierItem.operator ? ruleWithIdentifierItem.operator : undefined,
        status: ruleWithIdentifierItem.status,
        children: ruleWithIdentifierItem.children?.map(item => getItem(item))
      } as IRuleItemNode;
    }

    return getItem(this);
  }

  public addChildren = (children: RuleItemNode[]) => {
    if (this.operator) {
      if (this.children == null) {
        this.children = [];
      }
      this.children = [
        ...this.children,
        ...children,
      ]
    }
  }
}

const getChildren = (items: Array<Rule>): RuleItemNode[] => {
  const children: RuleItemNode[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let ruleItemWithIdentifier: RuleItemNode;
    if ((item as RuleBaseSpecialPath)[SPECIAL_OPERATORS.$and]) {
      ruleItemWithIdentifier = new RuleItemNode({ operator: SPECIAL_OPERATORS.$and });

      ruleItemWithIdentifier.addChildren(
        getChildren((item as RuleBaseSpecialPath)[SPECIAL_OPERATORS.$and] as Rule[])
      );
    } else if ((item as RuleBaseSpecialPath)[SPECIAL_OPERATORS.$or]) {
      ruleItemWithIdentifier = new RuleItemNode({ operator: SPECIAL_OPERATORS.$or });

      ruleItemWithIdentifier.addChildren(
        getChildren((item as RuleBaseSpecialPath)[SPECIAL_OPERATORS.$or] as Rule[])
      );
    } else {
      ruleItemWithIdentifier = new RuleItemNode({
        rule: item as RuleItem
      });
    }
    children.push(ruleItemWithIdentifier);
  }
  return children;
};

export const getTree = (rule: Rule): RuleItemNode => {
  const item = rule;
  let ruleItemWithIdentifier: RuleItemNode;
  if ((item as RuleBaseSpecialPath)[SPECIAL_OPERATORS.$and]) {
    ruleItemWithIdentifier = new RuleItemNode({ operator: SPECIAL_OPERATORS.$and });

    ruleItemWithIdentifier.addChildren(
      getChildren((item as RuleBaseSpecialPath)[SPECIAL_OPERATORS.$and] as Rule[])
    );
  } else if ((item as RuleBaseSpecialPath)[SPECIAL_OPERATORS.$or]) {
    ruleItemWithIdentifier = new RuleItemNode({ operator: SPECIAL_OPERATORS.$or });

    ruleItemWithIdentifier.addChildren(
      getChildren((item as RuleBaseSpecialPath)[SPECIAL_OPERATORS.$or] as Rule[])
    );
  } else {
    ruleItemWithIdentifier = new RuleItemNode({
      rule: item as RuleItem
    });
  }

  return ruleItemWithIdentifier;
};