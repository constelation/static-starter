'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (babel) {
  var t = babel.types;


  // console.log(babel);

  return {
    name: "ast-transform", // not required
    visitor: {
      JSXElement: function JSXElement(path) {
        // console.log(path);

        var isView = looksLike(path, {
          node: {
            openingElement: {
              name: {
                name: 'view'
              }
            }
          }
        });

        if (!isView) {
          return;
        }

        renameTag(path.node);
        var props = buildProps(path.node);

        path.node.openingElement.attributes = props;
      }
    }
  };
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var propsToOmit = {
  as: true
};

var propsToUse = {
  width: true,
  height: true
};

var defaultCss = 'display: flex;flex-direction: column;position: relative;';

function buildDefaultCssProp() {
  return {
    type: 'JSXAttribute',
    name: {
      type: 'JSXIdentifier',
      name: 'css'
    },
    value: {
      type: "JSXExpressionContainer",
      expression: {
        type: "TemplateLiteral",
        expressions: [],
        quasis: [{
          type: 'TemplateElement',
          value: {
            raw: defaultCss,
            cooked: defaultCss
          }
          //            tail: true
        }]
      }
    }
  };
}

function buildCssProp(attribute) {
  var name = attribute.name.name;
  var value = void 0;
  switch (attribute.value.type) {
    case 'JSXExpressionContainer':
      {
        if (attribute.value.expression.type === 'NumericLiteral') {
          value = attribute.value.expression.extra.raw + 'px';
        } else if (attribute.value.expression.type === 'StringLiteral') {
          value = attribute.value.expression.value;
        }
        break;
      }
    case 'StringLiteral':
      {
        value = attribute.value.value;
        break;
      }
  }
  //  if (attribute.value.type
  //  const value = attribute.value.value

  return name + ': ' + value + ';'

  // return {
  //   type: 'TemplateElement',
  //   value: {
  //     raw: name + ': ' + value + ';',
  //     cooked: name + ': ' + value + ';'
  //   }
  // };
}

function buildProps(node) {
  var css = buildDefaultCssProp();
  var props = [css];

  if (node.openingElement.attributes == null) {
    return props;
  }

  node.openingElement.attributes.forEach(function (attribute) {
    var name = attribute.name.name;

    if (name in propsToOmit) {
      return;
    } else if (name === 'css') {
      var _props$0$value$expres;

      props[0].value.expression.quasis[0].value.raw = props[0].value.expression.quasis[0].value.raw + attribute.value.expression.quasis[0].value.raw;
      props[0].value.expression.quasis[0].value.cooked = props[0].value.expression.quasis[0].value.cooked + attribute.value.expression.quasis[0].value.cooked;
      // props[0].value.expression.quasis[0].value.cooked = props[0].value.expression.quasis[0].value.cooked + buildCssProp(attribute);
      //      props[0].value.expression.quasis[0].tail = false
      // (_props$0$value$expres = props[0].value.expression.quasis).push.apply(_props$0$value$expres, _toConsumableArray(attribute.value.expression.quasis));
    } else if (name in propsToUse) {
      // console.log(attribute)
      //      props[0].value.expression.quasis[0].tail = false
      // props[0].value.expression.quasis.push(buildCssProp(attribute));
      props[0].value.expression.quasis[0].value.raw = props[0].value.expression.quasis[0].value.raw + buildCssProp(attribute);
      props[0].value.expression.quasis[0].value.cooked = props[0].value.expression.quasis[0].value.cooked + buildCssProp(attribute);
    } else {
      props.push(attribute);
    }
  });

  console.log(props)

  return props;
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

function looksLike(a, b) {
  return a && b && Object.keys(b).every(function (bKey) {
    var bVal = b[bKey];
    var aVal = a[bKey];
    if (typeof bVal === 'function') {
      return bVal(aVal);
    }
    return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
  });
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val === 'undefined' ? 'undefined' : _typeof(val));
}