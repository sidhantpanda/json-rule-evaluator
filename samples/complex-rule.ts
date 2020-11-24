import { Rule } from '../src/lib/rule';

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
      operator: 'is'
    },
    {
      path: 'some.otherd.key',
      value: true,
      operator: 'is'
    }, {
      '$or': [{
        path: 'some.otherd.key',
        value: true,
        operator: 'is'
      }, {
        path: 'some.otherd.key',
        value: true,
        operator: 'is'
      }, {
        '$and': [
          {
            path: 'some.otherd.key',
            value: true,
            operator: 'is'
          },
          {
            path: 'some.otherd.key',
            value: true,
            operator: 'is'
          }
        ]
      }]
    }
  ]
};
