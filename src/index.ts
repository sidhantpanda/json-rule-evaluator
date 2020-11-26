import RuleEvaluator from './lib/rule';
// import { Rule } from './lib/rule/types';

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
const testRule = {
  '$and': [
    {
      path: 'some.number',
      value: 12,
      operator: '>',
    },
    {
      path: 'some.boolean',
      value: true,
      operator: '=='
    },
    {
      $or: [{
        path: 'some.boolean',
        ref: 'other.boolean',
        operator: 'endsWith'
      }, {
        path: 'some.boolean',
        ref: 'other.boolean',
        operator: 'endsWith'
      },]
    }
  ]
};

// const evaluator = new RuleEvaluator(testRule);
// const processed = evaluator.test(data);


// console.log('result', processed.result);
// console.log('tree', JSON.stringify(processed.details, null, 4));

export default RuleEvaluator;
