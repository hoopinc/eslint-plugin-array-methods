import { Rule, Linter } from 'eslint';

type DisallowArrayMethodsParams = {
  context: Rule.RuleContext;
  disallowMethodName: string;
};

type DisallowArrayMethods = (params: DisallowArrayMethodsParams) => Rule.RuleListener;

const disallowArrayMethod: DisallowArrayMethods = ({ context, disallowMethodName }) => {
  return {
    MemberExpression(node: any) {
      const methodName = node.property.name;

      if (methodName === disallowMethodName) {
        context.report({
          node,
          message: `Usage of Array#${disallowMethodName}() method is not allowed.`,
        });
      }
    },
  };
};

const ARRAY_METHODS = ['at','concat','copyWithin','entries','every','fill','filter','find','findIndex','findLast','findLastIndex','flat','flatMap','forEach','fromAsync','includes','indexOf','join','keys','lastIndexOf','length','map','pop','push','reduce','reduceRight','reverse','shift','slice','some','sort','splice','toLocaleString','toReversed','toSorted','toSpliced','toString','unshift','values','with'];
const rules: { [key: string]: Rule.RuleModule } = {};
ARRAY_METHODS.forEach(method => {
  rules['no-' + method] = {
    create: (context: any) => disallowArrayMethod({ context, disallowMethodName: method })
  };
});

const config: {
  rules: { [key: string]: Rule.RuleModule };
  configs: { [key: string]: Linter.Config };
} = {
  rules,
  configs: {
    recommended: {
      plugins: ['array-methods'],
      rules: {
        'array-methods/no-at': 'error',
        'array-methods/no-findLast': 'error',
        'array-methods/no-findLastIndex': 'error',
        'array-methods/no-fromAsync': 'error',
        'array-methods/no-toReversed': 'error',
        'array-methods/no-toSorted': 'error',
        'array-methods/no-toSpliced': 'error',
        'array-methods/no-with': 'error'
      }
    }
  }
};

module.exports = config;