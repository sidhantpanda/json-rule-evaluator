# json-rule-evaluator
---

Demo at: https://gifted-mcclintock-348e6f.netlify.app/

#### Installation

```
npm i -S json-rule-evaluator
```

#### Usage

```typescript
import RuleEvaluator, { Rule } from 'json-rule-evaluator';

const sampleData = {
  some: {
    boolean: true,
    number: 12,
    string: 'abc',
  },
  other: {
    boolean: false,
    number: 2,
    string: 'xyz',
  },
};

const testRule: Rule = {
  $and: [
    {
      path: 'some.number',
      value: 12,
      operator: '>',
    },
    {
      path: 'some.boolean',
      value: true,
      operator: '==',
    },
    {
      $or: [
        {
          path: 'some.string',
          ref: 'other.string',
          operator: '!=',
          options: {
            caseSensitive: false,
          },
        },
        {
          path: 'some.boolean',
          ref: 'other.boolean',
          operator: '==',
        },
      ],
    },
  ],
};

const evaluator = new RuleEvaluator(testRule);
const processed = evaluator.test(sampleData);

console.log(processed);
// Output:
// {
//   result: false,
//   details: {
//     operator: "$and",
//     status: "false",
//     children: [{
//       rule: {
//         path: "some.number",
//         value: 12,
//         operator: ">"
//       },
//       status: "false"
//     }, {
//       rule: {
//         path: "some.boolean",
//         value: true,
//         operator: "=="
//       },
//       status: "not_evaluated"
//     }, {
//       operator: "$or",
//       status: "not_evaluated",
//       children: [{
//         rule: {
//           path: "some.string",
//           ref: "other.string",
//           operator: "!=",
//           options: {
//             caseSensitive: false
//           }
//         },
//         status: "true"
//       },
//       {
//         rule: {
//           path: "some.boolean",
//           ref: "other.boolean",
//           operator: "=="
//         },
//         status: "not_evaluated"
//       }]
//     }]
//   }
// }
```

#### Available Operators

##### Boolean

- ==
- !=
- and
- or

##### Number

- ==
- !=
- <
- \>
- <=
- \>=

##### String

- ==
- !=
- contains
- startsWith
- endsWith
- doesntContain
- doesntStartWith
- doesntEndWith
