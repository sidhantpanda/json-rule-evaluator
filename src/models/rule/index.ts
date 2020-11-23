import RuleItem, { invoke } from './operators';

export enum SPECIAL_OPERATORS {
  $and = '$and',
  $or = '$or'
}

export type RuleBaseSpecialPaths = {
  [key in SPECIAL_OPERATORS]?: Array<RuleItem | RuleBaseSpecialPaths>;
};

export interface RuleBaseAnyPath {
  [key: string]: RuleItem;
}

type Rule = RuleBaseSpecialPaths | RuleBaseAnyPath;

const getItemResult = (data: any, item: RuleItem | RuleBaseSpecialPaths): boolean => {
  let result: boolean;
  if ((item as RuleBaseSpecialPaths)['$and'] != null) {
    result = getAndResult(
      data,
      ((item as RuleBaseSpecialPaths)['$and'] as Array<RuleItem | RuleBaseSpecialPaths>)
    );
  } else if ((item as RuleBaseSpecialPaths)['$or'] != null) {
    result = getOrResult(
      data,
      ((item as RuleBaseSpecialPaths)['$and'] as Array<RuleItem | RuleBaseSpecialPaths>)
    );
  } else {
    result = invoke(data, (item as RuleItem));
  }

  return result;
}

const getOrResult = (data: any, items: Array<RuleItem | RuleBaseSpecialPaths>): boolean => {
  let result = false;
  for (let i = 0; i < items.length; i++) {
    result = result || getItemResult(data, items[i]);
    if (result === true) {
      break;
    }
  }
  return result;
}

const getAndResult = (data: any, items: Array<RuleItem | RuleBaseSpecialPaths>): boolean => {
  let result = true;
  for (let i = 0; i < items.length; i++) {
    result = result && getItemResult(data, items[i]);
    if (result === false) {
      break;
    }
  }
  return result;
}

const data: any = {
  some: {
    boolean: true,
    number: 12,
    string: 'abc',
  },
  other: {
    boolean: false,
    number: 2,
    string: 'xyz',
  }
}
const a: Rule = {
  '$and': [
    {
      path: 'some.json.path',
      ref: 'r',
      operator: 'doesntEndWith',
      options: {
        caseSensitive: false
      }
    },
    {
      path: 'some.other.key',
      value: true,
      operator: 'eq'
    },
    {
      path: 'some.otherd.key',
      value: true,
      operator: 'eq'
    }, {
      '$or': [{
        path: 'some.otherd.key',
        value: true,
        operator: 'eq'
      }, {
        path: 'some.otherd.key',
        value: true,
        operator: 'eq'
      }, {
        '$and': [
          {
            path: 'some.otherd.key',
            value: true,
            operator: 'eq'
          },
          {
            path: 'some.otherd.key',
            value: true,
            operator: 'eq'
          }
        ]
      }]
    }
  ]
}

const testRule: Rule = {
  '$and': [
    {
      // type: 'number',
      path: 'some.number',
      value: 12,
      operator: '==', // !=, <, >, <=, >=,
    },
    {
      // type: 'number',
      path: 'some.boolean',
      value: true,
      operator: 'eq' // !=, <, >, <=, >=,
    },
    {
      // type: 'number',
      path: 'some.boolean',
      ref: 'other.boolean',
      operator: 'or' // !=, <, >, <=, >=,
    },

  ]
};

console.log('result', getAndResult(data, (testRule['$and'] as Array<RuleItem | RuleBaseSpecialPaths>)));
