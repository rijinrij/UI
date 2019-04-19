import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import MainSection from '../components/MainSection';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import _ from 'lodash';
import DynamicTable from '@atlaskit/dynamic-table';
import axios from 'axios';
import EmptyState from '@atlaskit/empty-state';
import CodeSnippet from '../components/CodeSnippet';
import Table3 from '../containers/testing3/Table3';
import weapons from '../images/weapons.json';
import Portal from '@atlaskit/portal';
// import Lorem from 'react-lorem-component';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

const Padding = styled.div`
  margin: ${gridSize() * 4}px ${gridSize() * 8}px;
  padding-bottom: ${gridSize() * 3}px;
`;

export default class HomePage extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  state = { isOpen: false };

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });



  componentDidMount(){

  }

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
    ];

    return (
      <Padding>

        <div>
          <Button onClick={this.open}>Open Modal</Button>

          <ModalTransition>
            {isOpen && (
              <Modal actions={actions} onClose={this.close} heading="Modal Title">
                <EmptyState
                  header={"Payloads"}
                  imageUrl={_.sample(weapons).src}
                  size={"medium"}
                  maxImageWidth={100}
                />
              </Modal>
            )}
          </ModalTransition>
        </div>

        {/* <PageTitle>Testing 33</PageTitle> */}
        <EmptyState 
          header={"Payloads"} 
          imageUrl={ _.sample(weapons).src }
          size={"medium"}
          maxImageWidth={100}
        />
        <Table3 />

      </Padding>
    );
  }
}
