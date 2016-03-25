import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PortActions from '../actions/PortActions';
import PortList from '../components/PortList';

class PortsContainer extends Component {
  render () {
    return <PortList ports={this.props.ports.data}/>;
  }

  componentDidMount () {
    console.log('Mounting PortsContainer');
    this.props.PortActions.getPorts();
  }
}

export default connect(
  state => state,
  dispatch => {
    return {
      PortActions: bindActionCreators(PortActions, dispatch)
    };
  }
)(PortsContainer);
