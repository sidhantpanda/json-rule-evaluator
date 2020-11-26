import { Rule } from '../src/lib/rule/types';

export const rule: Rule = {
  $and: [
    {
      path: 'some.json.path',
      ref: 'r',
      operator: 'doesntEndWith',
      options: {
        caseSensitive: false
      }
    }, {
      path: 'some.json.path',
      ref: 'r',
      operator: 'doesntEndWith'
    }, {
      $or: [{
        path: 'some.json.path',
        ref: 'r',
        operator: 'doesntEndWith'
      }, {
        $and: [{
          path: 'some.json.path',
          ref: 'r',
          operator: 'doesntEndWith'
        }, {
          path: 'some.json.path',
          ref: 'r',
          operator: 'doesntEndWith'
        }]
      }]
    }
  ]
};
