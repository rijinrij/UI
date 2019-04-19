import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import MainSection from '../components/MainSection';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import ExampleTable from '../components/Table';


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

  render() {
    return (
      <Padding>

        <PageTitle>Testing1</PageTitle>

        <ExampleTable />
      </Padding>
    );
  }
}
