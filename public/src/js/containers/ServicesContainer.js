import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as DiscoveryActions from '../actions/DiscoveryActions';
import ServiceList from '../components/ServiceList';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';


class ServicesContainer extends Component {
  render () {
    let meter;
    if (this.props.discovery.loading) {
      meter = (
        <Box align='center'>
            Finding services...
            <Meter legend={{placement: 'inline'}} value={this.props.discovery.progress} />
        </Box>
      );
    }
    return (
      <div>
        {this._renderServiceList()}
        {meter}
      </div>
    );
  }

  _renderServiceList () {
    return <ServiceList services={this.props.discovery.data} />;
  }

  componentDidMount () {
    this.abort = this.props.DiscoveryActions.discoverServices();
  }

  componentWillUnmount () {
    this.abort();
  }
}

export default connect(
  state => state,
  dispatch => {
    return {
      DiscoveryActions: bindActionCreators(DiscoveryActions, dispatch)
    };
  }
)(ServicesContainer);
