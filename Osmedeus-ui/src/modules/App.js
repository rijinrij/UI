import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Modal from '@atlaskit/modal-dialog';
import Page from '@atlaskit/page';
import '@atlaskit/css-reset';
import Nav, {
  AkContainerTitle,
  AkNavigationItem,
  AkSearchDrawer,
  AkNavigationItemGroup,
} from '@atlaskit/navigation';
import Button, { ButtonGroup } from '@atlaskit/button';
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import GearIcon from '@atlaskit/icon/glyph/settings';
import PreferencesIcon from '@atlaskit/icon/glyph/preferences';
import ArrowleftIcon from '@atlaskit/icon/glyph/arrow-left';
import Avatar, { AvatarItem } from '@atlaskit/avatar';
import LightbulbIcon from '@atlaskit/icon/glyph/lightbulb';
import AddonIcon from '@atlaskit/icon/glyph/addon';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import _ from 'lodash';
import weapons from '../images/weapons.json';
import InfoDrawer from '../components/InfoDrawer';
import NavLinks from './NavLinks';

export default class App extends Component {
  state = {
    flags: [],
    isModalOpen: false,
    themeMode: 'dark',
    navLinks: [
      ['/', 'Home', DashboardIcon],
      ['/settings', 'Settings', GearIcon],
      ['/testing1', 'Testing1', AddonIcon],
      ['/testing2', 'Testing2', AddonIcon],
      ['/testing3', 'Testing3', GearIcon],
      ['/payloads', 'Payloads', BacklogIcon],
    ]
  };


  switchTheme = () => {
    const newthemeMode  = this.state.themeMode;
    console.log(newthemeMode);
    this.setState({
      themeMode: newthemeMode === 'light' ? 'dark' : 'light',
    });
  };

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  openDrawer = (openDrawer) => {
    this.setState({ openDrawer });
  };

  shouldComponentUpdate(nextProps, nextContext) {
    return true;
  };

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  static propTypes = {
    navOpenState: PropTypes.object,
    onNavResize: PropTypes.func,
  };

  static childContextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
  }

  getChildContext() {
    return {
      showModal: this.showModal,
      addFlag: this.addFlag,
    };
  }

  showModal = () => {
    this.setState({ isModalOpen: true });
  }

  hideModal = () => {
    this.setState({ isModalOpen: false });
  }

  addFlag = () => {
    this.setState({ flags: [{ id: Date.now() }].concat(this.state.flags) });
  }

  onFlagDismissed = (dismissedFlagId) => {
    this.setState({
      flags: this.state.flags.filter(flag => flag.id !== dismissedFlagId),
    })
  }

  render() {
    const backIcon = <ArrowleftIcon label="Back icon" size="medium" />;
    const globalPrimaryIcon = <Avatar name="Home" size="medium" src={"https://image.flaticon.com/icons/svg/108/108669.svg"} />;

    const NavBar = (
      <Nav
        isOpen={this.context.navOpenState.isOpen}
        width={this.context.navOpenState.width}
        onResize={this.props.onNavResize}
        containerHeaderComponent={() => (
          <AkContainerTitle
            href="/"
            icon={
              <img alt="Home" src={_.sample(weapons).src} />
            }
            text="Osmedeus UI"
          />
        )}
        globalPrimaryIcon={globalPrimaryIcon}
        globalPrimaryItemHref="/"
        globalSearchIcon={<EditorPanelIcon label="Info icon" />}
        hasBlanket
        drawers={[
          <AkSearchDrawer
            backIcon={backIcon}
            isOpen={this.state.openDrawer === 'info'}
            key="info"
            onBackButton={() => this.openDrawer(null)}
            primaryIcon={globalPrimaryIcon}
          >
            <InfoDrawer
              onResultClicked={() => this.openDrawer(null)}
              onSearchInputRef={(ref) => {
                this.searchInputRef = ref;
              }}
            />
          </AkSearchDrawer>
        ]}
        globalCreateIcon={<LightbulbIcon label="Setting icon" />}
        onSearchDrawerOpen={() => this.openDrawer('info')}
        onCreateDrawerOpen={this.switchTheme}
      >
        {/* Nav Item here */}
        <NavLinks context={this.context} />

      </Nav>
    );
    
    return (
      <AtlaskitThemeProvider mode={this.state.themeMode}>
        
        <div>
          <Page
            navigationWidth={this.context.navOpenState.width}
            navigation={NavBar}
          >
            
            {this.props.children}
          </Page>

          <div>
            <FlagGroup onDismissed={this.onFlagDismissed}>
              {
                this.state.flags.map(flag => (
                  <Flag
                    id={flag.id}
                    key={flag.id}
                    title="Flag Title"
                    description="Flag description"
                  />
                ))
              }
            </FlagGroup>

            {
              this.state.isModalOpen && (
                <Modal
                  heading="Candy bar"
                  actions={[{ text: 'Exit candy bar', onClick: this.hideModal }]}
                  onClose={this.hideModal}
                >
                  <p style={{ textAlign: 'center' }}>
                    <img src="http://i.giphy.com/yidUztgRB2w2gtDwL6.gif" alt="Moar cupcakes" />
                  </p>
                </Modal>
              )
            }
          </div>

        </div>
      </AtlaskitThemeProvider>
    );
  }
}
