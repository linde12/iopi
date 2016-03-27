import React, {Component} from 'react';
import {Link} from 'react-router';

import Split from 'grommet/components/Split';
import SplitHide from '../components/SplitHide';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import CloseIcon from 'grommet/components/icons/base/Close';

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      showMenu: true
    };
  }

  render () {
    let mobileMenu;
    if (this.state.responsive === 'single' && this.state.showMenu) {
      mobileMenu = (
        <Layer closer={true} flush={true} hidden={this.state.responsive === 'multiple' ||
        !this.state.showMenu}>
        {this._renderMenu()}
        </Layer>
      );
    }

    return (
      <div>
        {mobileMenu}
        <SplitHide
            justify='between'
            flex='right'
            priority='right'
            fixed={true}
            onResponsive={this._onResponsive.bind(this)}>
          {this._renderMenu()}
          {this._renderContent()}
        </SplitHide>
      </div>
    );
  }

  _renderMenu () {
    let closer;

    if (this.state.responsive === 'single') {
      closer = (
        <Button icon={<CloseIcon />} onClick={this._onMenuClick.bind(this)} />
      );
    }

    return (
      <Sidebar primary={true} size='small' separator='right'>
        <Header justify='between' pad={{horizontal: 'medium'}}>
          iobox
          {closer}
        </Header>
        <Menu primary={true} justify='between' onClick={this._onMenuClick.bind(this)}>
          {this._renderLinks()}
        </Menu>
      </Sidebar>
    );
  }

  _renderContent () {
    let tab = this._getSelectedTab();
    let mobileMenuBtn;

    if (this.state.responsive === 'single') {
      mobileMenuBtn = (
        <Menu direction="row" responsive={false}>
          <a onClick={this._onMenuOpen.bind(this)}>Menu</a>
        </Menu>
      );
    }

    return (
      <Article>
        <Header justify='between' pad={{horizontal: 'medium'}}>
          {tab.name}
          {mobileMenuBtn}
        </Header>
        <Section pad="medium">
          {this.props.children}
        </Section>
      </Article>
    );
  }

  _renderLinks () {
    return this._getLinks().map((l, i) => {
      return (
        <Link activeClassName='active' key={i} to={l.path}>{l.name}</Link>
      );
    });
  }

  _getSelectedTab (path) {
    for (let route of this._getLinks()) {
      if (this.context.router.isActive(route.path)) {
        return route;
      }
    }
  }

  _getLinks () {
    return [
      {name: 'Home', path: '/'},
      {name: 'Ports', path: 'ports'},
      {name: 'Services', path: 'services'}
    ];
  }

  _onResponsive (responsive) {
    if (responsive === 'single') {
      this.setState({showMenu: false});
    } else {
      this.setState({showMenu: true});
    }
    this.setState({responsive: responsive});
  }

  _onMenuOpen () {
    this.setState({showMenu: true});
  }

  _onMenuClick () {
    if (this.state.responsive === 'single') {
      this.setState({showMenu: false});
    }
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}
