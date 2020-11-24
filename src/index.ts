import RuleEvaluator, { Rule } from './lib/rule';

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
const testRule: Rule = {
  '$and': [
    {
      path: 'some.number',
      value: 12,
      operator: '==',
    },
    {
      path: 'some.boolean',
      value: true,
      operator: '=='
    },
    {
      path: 'some.boolean',
      ref: 'other.boolean',
      operator: 'endsWith'
    },

  ]
};

const evaluator = new RuleEvaluator(testRule);

console.log('result', evaluator.test(data));
