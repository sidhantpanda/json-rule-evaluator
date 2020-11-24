interface CustomOperation {
  (source: any, target: any): boolean;
}

interface OperationMap {
  [key: string]: CustomOperation;
}

export type BaseOperators = '==' | '!=';

export interface BaseRuleItem {
  /** Dot separated JSON access */
  path: string;
  /** Reference to some other part of the JSON */
  ref?: string;
  /** Operator to be used */
  operator: string;
}

interface BaseEvaluatorOptions {
  /** Should load common operators like === and != */
  loadCommonOperators: boolean;
}

export class BaseEvaluator<T extends BaseRuleItem = BaseRuleItem>  {
  protected ruleItem: T;
  protected operationMap: OperationMap = {};
  constructor(ruleItem: T, options: BaseEvaluatorOptions) {
    this.ruleItem = ruleItem;
    if (options.loadCommonOperators) {
      this.addOperator('==', (source, target) => source === target);
      this.addOperator('!=', (source, target) => source != target);
    }
  }
  public test = (source: any, target: any): boolean => {
    if (this.operationMap[this.ruleItem.operator] == null) {
      return false;
    }
    return this.operationMap[this.ruleItem.operator](source, target);
  }

  protected addOperator = (operator: string, predicate: CustomOperation) => {
    this.operationMap[operator] = predicate;
  }
}
