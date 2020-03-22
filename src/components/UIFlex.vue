<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script>
import { flexContainerValidators } from '@/validators/flex';

export default {
  props: {
    //  Display
    flexDisplay: {
      type: String
    },

    inline: {
      type: Boolean
    },

    //  Direction
    flexDirection: {
      type: String
    },
    row: {
      type: Boolean
    },
    rowReverse: {
      type: Boolean
    },
    column: {
      type: Boolean
    },
    columnReverse: {
      type: Boolean
    },

    //  Wrap
    flexWrap: {
      type: String
    },
    noWrap: {
      type: Boolean,
      default() {
        return !this.wrap && !this.wrapReverse;
      }
    },
    wrap: {
      type: Boolean
    },
    wrapReverse: {
      type: Boolean
    },

    justifyContent: {
      type: String,
      default: 'flex-start',
      validator: flexContainerValidators.justifyContent
    },
    alignItems: {
      type: String,
      default: 'stretch',
      validator: flexContainerValidators.alignItems
    },
    alignContent: {
      type: String,
      default: 'stretch',
      validator: flexContainerValidators.alignContent
    }
  },
  computed: {
    style() {
      // prettier-ignore
      const {
        flexDisplay, inline,
        flexDirection, rowReverse, column, columnReverse,
        flexWrap, wrap, wrapReverse,
        justifyContent,
        alignItems,
        alignContent
      } = this;

      //  Default style rules
      const styleRules = {
        display: 'flex',
        flexDirection: 'row'
      };

      //  Display
      if (flexDisplay) {
        styleRules.display = flexDisplay;
      } else if (inline) {
        styleRules.display = 'flex-inline';
      }

      //  Direction
      if (flexDirection) {
        styleRules.flexDirection = flexDirection;
      } else if (rowReverse) {
        styleRules.flexDirection = 'row-reverse';
      } else if (column) {
        styleRules.flexDirection = 'column';
      } else if (columnReverse) {
        styleRules.flexDirection = 'column-reverse';
      }

      //  Wrap
      if (flexWrap) {
        styleRules.flexWrap = flexWrap;
      } else if (wrap) {
        styleRules.flexWrap = 'wrap';
      } else if (wrapReverse) {
        styleRules.flexWrap = 'wrap-reverse';
      }

      styleRules.justifyContent = justifyContent;
      styleRules.alignItems = alignItems;
      styleRules.alignContent = alignContent;

      return styleRules;
    }
  }
};
</script>

<style></style>
