/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Avatar from '@atlaskit/avatar';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';
import styled from 'styled-components';
import EmptyState from '@atlaskit/empty-state';
import DynamicTable from '@atlaskit/dynamic-table';
import SearchIcon from '@atlaskit/icon/glyph/search';
import _ from 'lodash';
import Spinner from '@atlaskit/spinner';
import { AkCode } from '@atlaskit/code';
import { inject, observer } from "mobx-react";
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { Status, Color } from '@atlaskit/status/element';
import Badge from '@atlaskit/badge';
import Tag from '@atlaskit/tag';
import weapons from '../../images/weapons.json';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { colors } from '@atlaskit/theme';

const Wrapper = styled.div`
  min-width: 600px;
`;

const Container = styled.div`
  min-width: 600px;
  width: 1000px;
  background-color: ${colors.N20};
`;

const AvatarWrapper = styled.div`
  margin-right: 8px;
`;


const createHead = (withWidth) => {
  return {
    cells: [
      {
        key: 'id',
        content: 'Modules',
        isSortable: true,
        width: withWidth ? 30 : undefined,
      },
      {
        key: 'report',
        content: 'Report',
        shouldTruncate: true,
        // isSortable: true,
        width: withWidth ? 20 : undefined,
      },
      
    ],
  };
};

const head = createHead(false);
@inject("sessStore", "axiosStore")
@observer
export default class SummaryTable extends Component {


  state = {
    rows: null,
    tamperRow : null,
    isOpen: false,
  }

  componentDidMount() {
    const content = this.props;
    const ws = content.ws;
    console.log(ws);
    
    // get data 
    this.props.axiosStore.instance.get('/module/' + ws)
      .then(response => {
        if (response.data.hasOwnProperty('reports')) {
          this.setState({ rows: response.data.reports })
          this.setState({ tamperRow: response.data.reports })
        }
        else {
          this.setState({ error: true });
        }
      })
      .catch(error => this.setState({ error: true }));

  }


  searchChangedHandler = (event) => {
    if (event.target.value) {
      const grep = _.lowerCase(event.target.value);
      let tamperRow = [];

      _.map(this.state.tamperRow, function (item) {
        _.map(item, function (element) {
          if (_.isArray(element)) {
            _.filter(element, function (o) {
              if (_.includes(_.lowerCase(o.content), grep)) {
                // console.log(o.content)
                tamperRow.push(item);
              }
            });
          }
          else {
            if (_.includes(_.lowerCase(element), grep)) {
              // console.log(element)
              tamperRow.push(item)
            }
          }
        })
      });

      this.setState({ rows: _.uniq(tamperRow) })
    }
    else {
      this.setState({ rows: this.state.rows })
    }

  }


  open = (rp) => {
    // console.log(rp);
    this.props.axiosStore.instance.get('../wscdn/' + rp)
      .then(response => {
          this.setState({ html: response.data })
      })
      .catch(error => this.setState({ error: true }));

    this.setState({ isOpen: true })
  };

  close = () => this.setState({ isOpen: false });

  render() {
    const isOpen = this.state.isOpen;
    const html = this.state.html;
    const actions = [
      { text: 'Close', onClick: this.close },
    ];
    console.log(this.state)

    console.log(isOpen);

    if (_.isEmpty(this.state.rows)) {
      return (
        <Wrapper>
          <EmptyState header={"Nothing to show"} />
        </Wrapper>
      )
      
    }
    else {
      let tamperRow = this.state.rows.map((item, index) => ({
        key: `row-${index}-${item.module}`,
        cells: [
          {
            key: item.module,
            content: (
              <Tag text={item.module} color="greenLight"></Tag>
            ),
          },
          {
            key: item.report,
            content: (
              <a href={this.props.axiosStore.instance.defaults.baseURL + "/../wscdn/" + item.report} target="_blank">
                <Button appearance="primary">Open Report</Button>
              </a>
            )
          }
          
        ],
      }));

      return (
        <Wrapper>
          <Textfield
            id="before-input"
            onChange={this.searchChangedHandler}
            elemBeforeInput={
              <div style={{ paddingLeft: '6px', lineHeight: '100%' }}>
                <SearchIcon label="search" size="medium" />
              </div>
            }

          />


          <DynamicTable
            caption={"\n"}
            head={head}
            rows={tamperRow}
            rowsPerPage={20}
            defaultPage={1}
            loadingSpinnerSize="large"
            isLoading={false}
            // isFixedSize
            // defaultSortKey="id"
            // defaultSortOrder="ASC"
            onSort={() => console.log('onSort')}
            onSetPage={() => console.log('onSetPage')}
          />
        </Wrapper>
      );

    }
    
  }

}