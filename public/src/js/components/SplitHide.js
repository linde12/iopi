import React, {Component} from 'react';
import Split from 'grommet/components/Split';

const CLASS_ROOT = "split";

export default class SplitHide extends Split {
  render () {
    var classes = [CLASS_ROOT];
    if (this.props.flex) {
      classes.push(CLASS_ROOT + "--flex-" + this.props.flex);
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.props.separator) {
      classes.push(CLASS_ROOT + "--separator");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var left, right;
    var showRight = true;
    var showLeft = true;
    var children = React.Children.toArray(this.props.children);
    var firstChild = children[0];

    if (children.length > 0) {
      right = children[children.length - 1];
    }

    if ('single' === this.state.responsive) {
      left = firstChild;
      if ('left' === this.props.priority) {
        // Not showing right
        showRight = false;
      } else {
        // Not showing left
        showLeft = false;
      }
    } else {
      // Showing left & right
      if (children.length > 0) {
        left = children.slice(0, -1);
      }
    }

    return (
      <div ref="split" className={classes.join(' ')}>
        <div style={{display: showLeft ? '' : 'none'}}>{left}</div>
        <div style={{display: showRight ? '' : 'none'}}>{right}</div>
      </div>
    );
  }
}
