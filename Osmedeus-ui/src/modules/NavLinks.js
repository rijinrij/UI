import React, { Component } from 'react';
import { Link } from 'react-router';

import '@atlaskit/css-reset';
import {
  AkNavigationItem,
  AkNavigationItemGroup,
} from '@atlaskit/navigation';
import styled from 'styled-components';
import { inject, observer } from "mobx-react";
import WorldIcon from '@atlaskit/icon/glyph/world';
import AddonIcon from '@atlaskit/icon/glyph/addon';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import Tooltip from '@atlaskit/tooltip';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import DocumentFilledIcon from '@atlaskit/icon/glyph/document-filled';
import SignOutIcon from '@atlaskit/icon/glyph/sign-out';
import CodeIcon from '@atlaskit/icon/glyph/code';

// export default class NavLinks extends Component {

// const Wrapper = styled.div`
//   text-decoration: none
// `;

@inject("sessStore", "axiosStore")
@observer
class NavLinks extends Component {


  render() {
    return (
      <div style={{ textDecoration: 'none' }}>
        <AkNavigationItemGroup title="Core" key="core-nav">
          <Tooltip position="right" content="Home">
            <Link key="http-traffic" to="/home" alt="HTTP">
              <AkNavigationItem
                icon={<HomeFilledIcon label="Traffic" size="medium" />}
                text="Home"
                key="list-traffic"
                isSelected={this.props.context.router.isActive("/home", true)}
              />
            </Link>
          </Tooltip>

          <Tooltip position="right" content="Summary">
            <Link key="summary" to="/summary" alt="Summary">
              <AkNavigationItem
                icon={<DashboardIcon label="summary" size="medium" />}
                text="Summary"
                key="list-summary"
                isSelected={this.props.context.router.isActive("/summary", true)}
              />
            </Link>
          </Tooltip>

          <Tooltip position="right" content="Logs">
            <Link key="logs" to="/logs" alt="Logs">
              <AkNavigationItem
                icon={<DocumentFilledIcon label="logs" size="medium" />}
                text="Logs"
                key="list-logs"
                isSelected={this.props.context.router.isActive("/logs", true)}
              />
            </Link>
          </Tooltip>

          <Tooltip position="right" content="Report">
            <Link key="report" to="/report" alt="Report">
              <AkNavigationItem
                icon={<AddonIcon label="report" size="medium" />}
                text="Report"
                key="list-report"
                isSelected={this.props.context.router.isActive("/report", true)}
              />
            </Link>
          </Tooltip>

        </AkNavigationItemGroup>

        <AkNavigationItemGroup title="Execute" key="exec-nav">
          <Tooltip position="right" content="Execute">
            <Link key="exec" to="/execute" alt="Execute">
              <AkNavigationItem
                icon={<CodeIcon label="configurations" size="medium" />}
                text="Execute"
                key="list-execute"
                isSelected={this.props.context.router.isActive("/execute", true)}
              />
            </Link>
          </Tooltip>


        </AkNavigationItemGroup>


        <AkNavigationItemGroup title="Configurations" key="config-nav">
          <Tooltip position="right" content="Configuration">
            <Link key="config" to="/configurations" alt="Configurations">
              <AkNavigationItem
                icon={<SettingsIcon label="configurations" size="medium" />}
                text="Configurations"
                key="list-configurations"
                isSelected={this.props.context.router.isActive("/configurations", true)}
              />
            </Link>
          </Tooltip>


          <Tooltip position="right" content="Log Out">
            <AkNavigationItem
              onClick={() => {
                console.log('logout');
                window.localStorage.clear();
                this.props.sessStore.setLogout();
                window.location.reload();

              }}
              icon={<SignOutIcon label="logout" size="medium" />}
              text="Log Out"
              key="list-logout"
              isSelected={this.props.context.router.isActive("/logout", true)}
            />
          </Tooltip>
        </AkNavigationItemGroup>

      </div>

    )
  }
}


export default NavLinks;