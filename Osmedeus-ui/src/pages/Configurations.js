import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import MainSection from '../components/MainSection';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import EmptyState from '@atlaskit/empty-state';
import styled from 'styled-components';
import { inject, observer } from "mobx-react";
import _ from 'lodash';
import weapons from '../images/weapons.json';
import { Status, Color } from '@atlaskit/status/element';
import InfoIcon from '@atlaskit/icon/glyph/info';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Form, {
  Field,
  FormFooter,
  FormHeader,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { InlineEditableTextfield } from '@atlaskit/inline-edit';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Lozenge from '@atlaskit/lozenge';
import LinkIcon from '@atlaskit/icon/glyph/link';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';

import { colors, gridSize } from '@atlaskit/theme';


import {
  AtlaskitThemeProvider,
  elevation as AkElevations,
  themed,
} from '@atlaskit/theme';




const Container = styled.div`
  ${({ elevation }) => AkElevations[elevation]}
  border-radius: 3px;
  margin-bottom: 2em;
  min-width: 240px;
  padding: 16px 24px;
  text-align: center;
`;



@inject("sessStore", "axiosStore")
@observer
export default class Configurations extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  state = {
    currentURL: this.props.axiosStore.url,
    isSubmited: false,
    isOpen: false,
  }

  handleOnChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      currentURL: `${e.target.value}`,
    });
  };

  handleSubmit = () => {
    const url = this.state.currentURL;
    // console.log(url);
    this.props.axiosStore.setURL(url);
    this.setState({ isSubmited: true})
  };


  render() {
    // console.log(this.state);

    let flag = null;
    if (this.state.isSubmited) {
      flag = (
        <FlagGroup>
          <Flag
            appearance="info"
            icon={<InfoIcon label="Info" secondaryColor={colors.N500} />}
            id="info"
            key="info"
            title="Data is submitted"
          />
        </FlagGroup>);
    }
    // console.log(this.props.axiosStore.instance.defaults.baseURL);
    return (
      <ContentWrapper>

        <EmptyState
          header={"Configurations"}
          imageUrl={_.sample(weapons).src}
          size={"medium"}
          maxImageWidth={100}

        />
        {flag}
        <FormHeader title="Remote URL" />
        <Textfield
          id="before-input"
          value={this.state.currentURL}
          onChange={this.handleOnChange}

          elemAfterInput={
            <div style={{ lineHeight: '100%' }}>
              <Button iconBefore={<CheckCircleIcon />} appearance="default" onClick={this.handleSubmit}>
              </Button>
            </div>
          }

        />
        

        
      





      </ContentWrapper>
    );
  }
}
