'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (babel) {
  var t = babel.types;


  function buildDefaultCssProp(css) {
    return t.jSXAttribute(t.jSXIdentifier('css'), t.jSXExpressionContainer(t.templateLiteral([t.templateElement({
      raw: css,
      cooked: css
    })], [])));
  }

  function buildProps(node, defaultCss, cssProps) {
    var css = buildDefaultCssProp(defaultCss);
    var cssTemplate = css.value.expression;
    var props = [css];

    if (node.openingElement.attributes == null) {
      return props;
    }

    node.openingElement.attributes.forEach(function (attribute) {
      var name = attribute.name.name;

      if (name in propsToOmit) {
        return;
      } else if (name === 'css') {
        addTemplateToTemplate(cssTemplate, attribute.value.expression);
      } else if (name in cssProps) {
        addCssProp(cssTemplate, attribute, cssProps[name]);
      } else if (name in booleanProps) {
        addBooleanProp(cssTemplate, attribute, name, booleanProps[name]);
      } else if (name === 'grow') {
        addGrowProp(cssTemplate, attribute);
      } else {
        props.push(attribute);
      }
    });

    return props;
  }

  function addCssProp(cssTemplate, attribute, name) {
    var value = attribute.value;


    if (t.isJSXExpressionContainer(value)) {
      var expression = value.expression;


      if (t.isNumericLiteral(expression)) {
        addStringToTemplate(cssTemplate, name + ': ' + expression.extra.raw + ';');
      } else if (t.isStringLiteral(expression)) {
        addStringToTemplate(cssTemplate, name + ': ' + expression.value + ';');
      } else if (t.isIdentifier(expression)) {
        addStringToTemplate(cssTemplate, name + ': ');
        addQuasiToTemplate(cssTemplate, t.templateElement({ raw: ';', cooked: ';' }));
        addExpressionToTemplate(cssTemplate, t.identifier(expression.name));
      } else if (t.isTemplateLiteral(expression)) {
        expression.quasis[0].value.cooked = name + ': ' + expression.quasis[0].value.cooked;
        expression.quasis[0].value.raw = name + ': ' + expression.quasis[0].value.raw;
        addTemplateToTemplate(cssTemplate, expression);
        addStringToTemplate(cssTemplate, ';');
      } else if (t.isBinaryExpression(expression)) {
        addStringToTemplate(cssTemplate, name + ': ');
        addExpressionToTemplate(cssTemplate, expression);
        addQuasiToTemplate(cssTemplate, t.templateElement({ raw: ';', cooked: ';' }));
      } else if (t.isConditionalExpression(expression)) {
        addStringToTemplate(cssTemplate, name + ': ');
        addExpressionToTemplate(cssTemplate, expression);
        addQuasiToTemplate(cssTemplate, t.templateElement({ raw: ';', cooked: ';' }));
      }
    } else if (t.isStringLiteral(value)) {
      addStringToTemplate(cssTemplate, name + ': ' + value.value + ';');
    }
  }

  function addBooleanProp(cssTemplate, attribute, name, _ref) {
    var consequent = _ref.consequent,
        alternate = _ref.alternate;
    var value = attribute.value;


    if (value === null) {
      addStringToTemplate(cssTemplate, consequent);
    } else if (t.isJSXExpressionContainer(value)) {
      var expression = value.expression;


      if (t.isBooleanLiteral(expression) && expression.value === true) {
        addStringToTemplate(cssTemplate, consequent);
      } else if (t.isIdentifier(expression)) {
        addExpressionToTemplate(cssTemplate, t.conditionalExpression(t.binaryExpression('===', t.identifier(expression.name), t.booleanLiteral(true)), t.stringLiteral(consequent), t.stringLiteral(alternate)));

        addQuasiToTemplate(cssTemplate, t.templateElement({ raw: '', cooked: '' }));
      }
    }
  }

  function addGrowProp(cssTemplate, attribute) {
    var value = attribute.value;


    if (value === null) {
      addStringToTemplate(cssTemplate, 'flex-grow: 1;');
    } else if (t.isJSXExpressionContainer(value)) {
      var expression = value.expression;


      if (t.isNumericLiteral(expression)) {
        addStringToTemplate(cssTemplate, 'flex-grow: ' + expression.extra.raw + ';');
      } else if (t.isStringLiteral(expression)) {
        addStringToTemplate(cssTemplate, 'flex-grow: ' + expression.value + ';');
      } else if (t.isIdentifier(expression)) {
        addStringToTemplate(cssTemplate, 'flex-grow: ');
        addQuasiToTemplate(cssTemplate, t.templateElement({ raw: ';', cooked: ';' }));
        addExpressionToTemplate(cssTemplate, t.identifier(expression.name));
      }
    } else if (t.isStringLiteral(value)) {
      addStringToTemplate(cssTemplate, 'flex-grow: ' + value.value + ';');
    }
  }

  return {
    name: "ast-transform", // not required
    visitor: {
      JSXElement: function JSXElement(path) {
        var element = path.node && path.node.openingElement && path.node.openingElement.name;

        if (!element) {
          return;
        }

        if (element.name === 'view') {
          renameTag(path.node);
          path.node.openingElement.attributes = buildProps(path.node, defaultColCss, propsToUse);
        } else if (element.name === 'col') {
          renameTag(path.node);
          path.node.openingElement.attributes = buildProps(path.node, defaultColCss, propsToUse);
        } else if (element.name === 'row') {
          renameTag(path.node);
          path.node.openingElement.attributes = buildProps(path.node, defaultRowCss, propsToUse);
        } else if (element.name === 'flex') {
          renameTag(path.node);
          path.node.openingElement.attributes = buildProps(path.node, defaultFlexCss, flexPropsToUse);
        }
      }
    }
  };
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }


var propsToOmit = {
  as: true
};

var propsToUse = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  width: 'width',
  maxWidth: 'max-width',
  minWidth: 'min-width',
  height: 'height',
  maxHeight: 'max-height',
  minHeight: 'min-height',

  flex: 'flex',
  wrap: 'flex-wrap',
  // grow: 'flex-grow',
  shrink: 'flex-shrink',
  basis: 'flex-basis',
  order: 'order',
  alignContent: 'align-content',
  alignSelf: 'align-self',
  align: 'align-items',
  justify: 'justify-content',
  // alignVertical
  // alignHorizontal

  padding: 'padding',
  paddingTop: 'padding-top',
  paddingRight: 'padding-right',
  paddingBottom: 'padding-bottom',
  paddingLeft: 'padding-left',
  margin: 'margin',
  marginTop: 'margin-top',
  marginRight: 'margin-right',
  marginBottom: 'margin-bottom',
  marginLeft: 'margin-left',

  position: 'position',
  overflow: 'overflow',
  overflowX: 'overflow-x',
  overflowY: 'overflow-y',
  //WebkitOverflowScrolling
  zIndex: 'z-index'
};

var flexPropsToUse = _extends({}, propsToUse, {
  direction: 'flex-direction'
});

var booleanProps = {
  center: {
    consequent: 'align-items: center;justify-content: center;',
    alternate: ''
  },
  hidden: {
    consequent: 'display: none;',
    alternate: ''
  },
  inline: {
    consequent: 'display: inline-flex;',
    alternate: ''
  },
  fit: {
    consequent: 'height: 100%;width: 100%;',
    alternate: ''
  },
  absoluteFill: {
    consequent: 'position: absolute;top: 0;right: 0;bottom: 0;left: 0;',
    alternate: ''
  }
};

var defaultFlexCss = 'name: FLEX;display: flex;flex-shrink: 0;align-content: flex-start;position: relative;';
var defaultColCss = 'name: COL;display: flex;flex-direction: column;flex-shrink: 0;align-content: flex-start;position: relative;';
var defaultRowCss = 'name: ROW;display: flex;flex-direction: row;flex-shrink: 0;align-content: flex-start;position: relative;';

function addTemplateToTemplate(target, template) {
  if (template.expressions.length > 0) {
    if (target.expressions.length === target.quasis.length) {
      var _target$expressions, _target$quasis;

      // safe to just push these
      (_target$expressions = target.expressions).push.apply(_target$expressions, _toConsumableArray(template.expressions));
      (_target$quasis = target.quasis).push.apply(_target$quasis, _toConsumableArray(template.quasis));
    } else {
      var _target$expressions2, _target$quasis2;

      (_target$expressions2 = target.expressions).push.apply(_target$expressions2, _toConsumableArray(template.expressions));

      // concate the first quasi, then push on the rest
      addStringToTemplate(target, template.quasis[0].value.raw);
      (_target$quasis2 = target.quasis).push.apply(_target$quasis2, _toConsumableArray(template.quasis.slice(1)));
    }
  } else {
    addStringToTemplate(target, template.quasis[0].value.raw);
  }
}

function addStringToTemplate(template, str) {
  var last = template.quasis.length - 1;

  template.quasis[last].value.raw = template.quasis[last].value.raw + str;
  template.quasis[last].value.cooked = template.quasis[last].value.cooked + str;
}

function addQuasiToTemplate(template, quasi) {
  template.quasis.push(quasi);
}

function addExpressionToTemplate(template, expression) {
  template.expressions.push(expression);
}

function renameTag(node) {
  var tagName = 'div';

  if (node.openingElement.attributes != null) {
    var name = node.openingElement.attributes.find(function (prop) {
      return prop.name.name === 'as';
    });

    if (name !== undefined) {
      var val = name.value.value || name.value.expression.value;

      if (val != null) {
        tagName = val;
      } else {
        console.log('invalid `as` value. No variables allowed.');
      }
    }
  }

  node.openingElement.name.name = tagName;

  if (node.closingElement) {
    node.closingElement.name.name = tagName;
  }
}

// function looksLike(a, b) {
//   return (
//     a &&
//     b &&
//     Object.keys(b).every(bKey => {
//       const bVal = b[bKey]
//       const aVal = a[bKey]
//       if (typeof bVal === 'function') {
//         return bVal(aVal)
//       }
//       return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
//     })
//   )
// }
//
// function isPrimitive(val) {
//   return val == null || /^[sbn]/.test(typeof val)
// }
