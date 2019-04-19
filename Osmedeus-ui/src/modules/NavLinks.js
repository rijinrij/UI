import React, { Component } from 'react';
import { Link } from 'react-router';

import '@atlaskit/css-reset';
import {
  AkNavigationItem,
  AkNavigationItemGroup,
} from '@atlaskit/navigation';
import styled from 'styled-components';
import WorldIcon from '@atlaskit/icon/glyph/world';
import AddonIcon from '@atlaskit/icon/glyph/addon';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import Tooltip from '@atlaskit/tooltip';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import DocumentFilledIcon from '@atlaskit/icon/glyph/document-filled';
// export default class NavLinks extends Component {

// const Wrapper = styled.div`
//   text-decoration: none
// `;

const NavLinks = (props) => (
  <div style={{ textDecoration: 'none' }}>
    <AkNavigationItemGroup title="Core" key="core-nav">
      <Tooltip position="right" content="Home">
        <Link key="http-traffic" to="/home" alt="HTTP">
          <AkNavigationItem
            icon={<HomeFilledIcon label="Traffic" size="medium" />}
            text="Home"
            key="list-traffic"
            isSelected={props.context.router.isActive("/home", true)}
          />
        </Link>
      </Tooltip>

      <Tooltip position="right" content="Summary">
        <Link key="summary" to="/summary" alt="Summary">
          <AkNavigationItem
            icon={<DashboardIcon label="summary" size="medium" />}
            text="Summary"
            key="list-summary"
            isSelected={props.context.router.isActive("/summary", true)}
          />
        </Link>
      </Tooltip>

      <Tooltip position="right" content="Logs">
        <Link key="logs" to="/logs" alt="Logs">
          <AkNavigationItem
            icon={<DocumentFilledIcon label="logs" size="medium" />}
            text="Logs"
            key="list-logs"
            isSelected={props.context.router.isActive("/logs", true)}
          />
        </Link>
      </Tooltip>

      <Tooltip position="right" content="Report">
        <Link key="report" to="/report" alt="Report">
          <AkNavigationItem
            icon={<AddonIcon label="report" size="medium" />}
            text="Report"
            key="list-report"
            isSelected={props.context.router.isActive("/report", true)}
          />
        </Link>
      </Tooltip>

    </AkNavigationItemGroup>


    {/* <AkNavigationItemGroup title="Testing" key="testing-nav"> */}
      {/* <Link key="login-link" to="/login">
        <AkNavigationItem
          icon={<SignInIcon label="Login" size="medium" />}
          text="Login"
          key="login"
          isSelected={props.context.router.isActive("/login", true)}
        />
      </Link>     
      <Link key="testing-1-link" to="/testing1">
        <AkNavigationItem
          icon={<AddonIcon label="Payloads" size="medium" />}
          text="Testing 1"
          key="testing-1"
          isSelected={props.context.router.isActive("/testing1", true)}
        />
      </Link>     

      <Link key="testing-2-link" to="/testing2">
        <AkNavigationItem
          icon={<AddonIcon label="Payloads" size="medium" />}
          text="Testing 2"
          key="testing-2"
          isSelected={props.context.router.isActive("/testing2", true)}
        />
      </Link> */}

      {/* <Link key="testing-3-link" to="/testing3">
        <AkNavigationItem
          icon={<AddonIcon label="Payloads" size="medium" />}
          text="Testing 3"
          key="testing-3"
          isSelected={props.context.router.isActive("/testing3", true)}
        />
      </Link> */}
    {/* </AkNavigationItemGroup> */}
  </div>
)

export default NavLinks;