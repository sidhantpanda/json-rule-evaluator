import RuleItem, { evaluate } from '../evaluators';

enum SPECIAL_OPERATORS {
  $and = '$and',
  $or = '$or'
}

type RuleBaseSpecialPath = {
  [key in SPECIAL_OPERATORS]?: Array<RuleItem | RuleBaseSpecialPath>;
};

export type Rule = RuleBaseSpecialPath | RuleItem;

interface RuleWithIdentifiers {
  id: number;
  label: string;
  status: string;
  children?: RuleWithIdentifiers[];
}

export default class RuleEvaluator {
  private rule: Rule;
  private ruleWithIdentifiers: RuleWithIdentifiers;
  constructor(rule: Rule) {
    this.rule = rule;
    this.ruleWithIdentifiers = {
      id: 1,
      label: 'AND',
      status: 'false',
      children: [{
        id: 2,
        label: 'path.ref eq 33',
        status: 'true'
      }, {
        id: 3,
        label: 'path.ref > 34',
        status: 'false'
      }, {
        id: 4,
        label: 'OR',
        status: 'not_computed',
        children: [{
          id: 5,
          label: 'path.ref eq 33',
          status: 'not_computed'
        }, {
          id: 6,
          label: 'path.ref eq 33',
          status: 'not_computed'
        }]
      }],
    }
  }

  public test = (data: any): boolean => {
    const result = this.getResult(data, this.rule);
    return result;
  }

  private getResult = (data: any, item: Rule): boolean => {
    let result: boolean;
    if ((item as RuleBaseSpecialPath)['$and'] != null) {
      result = this.getAndResult(
        data,
        ((item as RuleBaseSpecialPath)['$and'] as Array<RuleItem | RuleBaseSpecialPath>)
      );
    } else if ((item as RuleBaseSpecialPath)['$or'] != null) {
      result = this.getOrResult(
        data,
        ((item as RuleBaseSpecialPath)['$or'] as Array<RuleItem | RuleBaseSpecialPath>)
      );
    } else {
      result = evaluate(data, (item as RuleItem));
    }

    return result;
  }

  private getOrResult = (data: any, items: Array<RuleItem | RuleBaseSpecialPath>): boolean => {
    let result = false;
    for (let i = 0; i < items.length; i++) {
      result = result || this.getResult(data, items[i]);
      if (result === true) {
        break;
      }
    }
    return result;
  }

  private getAndResult = (data: any, items: Array<RuleItem | RuleBaseSpecialPath>): boolean => {
    let result = true;
    for (let i = 0; i < items.length; i++) {
      result = result && this.getResult(data, items[i]);
      if (result === false) {
        break;
      }
    }
    return result;
  }
}
