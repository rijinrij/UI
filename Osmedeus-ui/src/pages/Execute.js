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
import { AkCodeBlock } from '@atlaskit/code';
import { AkCode } from '@atlaskit/code';
import { colors, gridSize } from '@atlaskit/theme';
import CodeIcon from '@atlaskit/icon/glyph/code';

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
    currentCmd: "python3 osmedeus.py ",
    isSubmited: false,
    isOpen: false,
  }

  ChangedHandler = (e) => {
    // console.log(e.target.value);
    this.setState({
      currentCmd: `${e.target.value}`,
    });
  };

 

  handleSubmit = () => {
    const cmd = this.state.currentCmd;
    console.log(cmd);

    const json_body = {
      "cmd": cmd,
      "nolog": "True"
    }

    // really sending commannd
    this.props.axiosStore.instance.post('/cmd', json_body)
      .then(response => {
        if (!response.data.hasOwnProperty('status')) {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));

    this.setState({ isSubmited: true })
  };


  render() {
    // console.log(this.state);
    let flag = null;
    let cmd = this.state.currentCmd;
    if (this.state.isSubmited) {
      flag = (
        <FlagGroup>
          <Flag
            appearance="info"
            icon={<InfoIcon label="Info" secondaryColor={colors.N500} />}
            id="info"
            key="info"
            title="Command is submitted"
          />
        </FlagGroup>);
    }

    const helper_block = `
[*] Visit this page for complete usage: https://github.com/j3ssie/Osmedeus/wiki

Basic Usage
===========
python3 osmedeus.py -t <your_target>
python3 osmedeus.py -T <list_of_targets>

Advanced Usage
==============
[*] List all module
python3 osmedeus.py -M

[*] Running with specific module
python3 osmedeus.py -t <result_folder> -m <module_name> -i <your_target>

[*] Example command
python3 osmedeus.py -t sample2 -m vuln -i hosts.txt
python3 osmedeus.py -t sample2 -m dirb -i /tmp/list_of_hosts.txt
python3 osmedeus.py -t sample2 -m git -i https://github.com/do_not/try_my_repo
    `;
    // console.log(this.props.axiosStore.instance.defaults.baseURL);
    return (
      <ContentWrapper>

        <EmptyState
          header={"Execute"}
          imageUrl={"https://image.flaticon.com/icons/svg/1590/1590014.svg"}
          size={"medium"}
          maxImageWidth={100}
        />

        <AkCodeBlock
          language="text"
          text={helper_block}
          showLineNumbers={false}
        />
        <br />

        <Textfield
          id="before-input"
          defaultValue={this.state.currentCmd}
          onChange={this.ChangedHandler}
          
          elemBeforeInput={
            <div style={{ paddingLeft: '6px', lineHeight: '100%' }}>
              <CodeIcon label="command" size="medium" />
            </div>
          }
        />

        {/* <br /> */}
        <Button
          appearance="primary"
          onClick={this.handleSubmit}
          shouldFitContainer>
          Send Command
        </Button>
        
        {flag}

      </ContentWrapper>
    );
  }
}
