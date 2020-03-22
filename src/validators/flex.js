//  https://css-tricks.com/snippets/css/a-guide-to-flexbox/

const flexContainerValues = {
  direction: ['row', 'row-reverse', 'column', 'column-reverse'],
  wrap: ['wrap', 'nowrap', 'wrap-reverse'],
  justifyContent: [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
    'start',
    'end',
    'left',
    'right'
  ],
  alignItems: [
    'stretch',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'first baseline',
    'last baseline',
    'start',
    'end',
    'self-start',
    'self-end'
  ],
  alignContent: [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
    'stretch',
    'start',
    'end',
    'baseline',
    'first baseline',
    'last baseline'
  ]
};

const flexItemValues = {
  alignSelf: []
};

function safeUnsafeValidator(valueArray, propValue) {
  const propValueParts = propValue.split(' ');

  if (
    propValueParts.length > 1 &&
    ['safe', 'unsafe'].includes(propValueParts[propValueParts.length - 1])
  ) {
    return valueArray.includes(propValueParts.pop().join(' '));
  }

  return valueArray.includes(propValue);
}

export function flexContainerDirectionValidator(propValue) {
  return flexContainerValues.direction.includes(propValue);
}

export function flexContainerWrapValidator(propValue) {
  return flexContainerValues.wrap.includes(propValue);
}

export function flexContainerFlowValidator(propValue) {
  const propValueParts = propValue.split(' ');
  return (
    flexContainerDirectionValidator(propValueParts[0]) &&
    flexContainerWrapValidator(propValueParts[1])
  );
}

export function flexContainerJustifyContentValidator(propValue) {
  return safeUnsafeValidator(flexContainerValues.justifyContent, propValue);
}

export function flexContainerAlignItemsValidator(propValue) {
  return safeUnsafeValidator(flexContainerValues.alignItems, propValue);
}

export function flexContainerAlignContentValidator(propValue) {
  return safeUnsafeValidator(flexContainerValues.alignContent, propValue);
}

export function flexItemAlignSelfValidator(propValue) {
  return flexItemValues.alignSelf.includes(propValue);
}

export const flexContainerValidators = {
  direction: flexContainerDirectionValidator,
  wrap: flexContainerWrapValidator,
  flow: flexContainerFlowValidator,
  justifyContent: flexContainerJustifyContentValidator,
  alignItems: flexContainerAlignItemsValidator,
  alignContent: flexContainerAlignContentValidator
};

export const flexItemValidators = {
  alignSelf: flexItemAlignSelfValidator
};
