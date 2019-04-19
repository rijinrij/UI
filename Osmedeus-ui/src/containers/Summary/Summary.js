import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import ContentWrapper from '../../components/ContentWrapper';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import _ from 'lodash';
import EmptyState from '@atlaskit/empty-state';
import weapons from '../../images/weapons.json';
import Avatar from '@atlaskit/avatar';
import Select from '@atlaskit/select';
import { inject, observer } from "mobx-react";
import SummaryTable from './SummaryTable';
import Tooltip from '@atlaskit/tooltip';

const Padding = styled.div`
  alignItems: 'center';
  margin: ${gridSize() * 4}px ${gridSize() * 8}px;
  padding-bottom: ${gridSize() * 3}px;
`;

@inject("sessStore", "axiosStore")
@observer
export default class Summary extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  state = {
    workspaces: [],
    isSelected: false,
    current_workspace: false,
    table_data: false,
  }

  componentDidMount() {
    this.props.axiosStore.instance.get('/workspace')
      .then(response => {
        if (response.data.hasOwnProperty('workspaces')) {
          let workspaces = [];
          _.map(response.data.workspaces, function (item, index) {
            workspaces.push({ label: item, value: item });
          })
          console.log(workspaces);
          this.setState({ workspaces: workspaces })
          // this.setState({ isSelected: true })
        }
        else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));
  }

  // handleSubmit

  toggleSelect = () => this.setState({ isSelected: !this.state.isSelected });

  handleSelect = (value) => {
    const ws = value.value.label;
    this.setState({ current_workspace: ws });
    this.setState({ isSelected: !this.state.isSelected })
  };


  render() {
    // console.log(this.state);
    let table = null;
    let ws_data = this.state.workspaces;
    let current_ws = this.state.current_workspace;
    let isSelected = this.state.isSelected;
    // // let table_data = this.state.table_data;
    if (isSelected) {
      table = <SummaryTable ws={current_ws} />
    }
    else{
      table = <EmptyState header={"Pick a workspace"} />
    }


    return (
      <Padding>
        <Tooltip position="bottom" content="Pick a Workspace">
          <EmptyState
            header={
              <div>
                <Avatar 
                  src={_.sample(weapons).src} 
                  onClick={() => { this.toggleSelect() }} 
                  size={"xlarge"} 
                />
                
              </div>
            }
            primaryAction={<h2>{current_ws}</h2>}
            size={"medium"}
            maxImageWidth={100}
          />
        </Tooltip>

        {!isSelected &&
          <Select
            className="single-select"
            classNamePrefix="react-select"
            options={ws_data}
            onChange={value => this.handleSelect({ value })}
            placeholder="Choose a Workspace"
          />
        }

        <hr />

        {table}
        

      </Padding>
    );
  }
}
