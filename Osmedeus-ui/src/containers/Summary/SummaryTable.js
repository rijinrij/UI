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



const Wrapper = styled.div`
  min-width: 600px;
`;

const NameWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  margin-right: 8px;
`;


const createHead = (withWidth) => {
  return {
    cells: [
      {
        key: 'id',
        content: 'Domain',
        isSortable: true,
        width: withWidth ? 30 : undefined,
      },
      {
        key: 'ip',
        content: 'IP Addresss',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 10 : undefined,
      },
      {
        key: 'technology',
        content: 'Technology',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 30 : undefined,
      },
      {
        key: 'port',
        content: 'Ports',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 20 : undefined,
      },
      {
        key: 'payload-actions',
        shouldTruncate: true,
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
  }

  componentDidMount() {
    const content = this.props;
    const ws = content.ws;
    console.log(ws);
    
    // get data 
    this.props.axiosStore.instance.get('/workspace/' + ws)
      .then(response => {
        if (response.data.hasOwnProperty('Subdomains')) {
          this.setState({ rows: response.data.Subdomains })
          this.setState({ tamperRow: response.data.Subdomains })
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


  render() {

    if (_.isEmpty(this.state.rows)) {
      return (
        <Wrapper>
          <EmptyState header={"Nothing to show"} />
        </Wrapper>
      )
      
    }
    else {
      let tamperRow = this.state.rows.map((item, index) => ({
        key: `row-${index}-${item.Domain}`,
        cells: [
          {
            key: item.Domain,
            content: (
              <a href={"//"+item.Domain} target="_blank">
                {item.Domain}
              </a>
            ),
          },
          {
            key: item.IP,
            content: (<Status text={item.IP} color={"blue"} />)
          },
          {
            key: item.Technology,
            content: (
              <div>{
                _.map(item.Technology, function(value,key){
                  return(
                    <Tag key={value+key} text={value} color="greenLight" />
                  )
                })}
              </div>
            ),
          },
          {
            key: item.Ports,
            content: (
              <div>{
                _.map(item.Ports, function (value, key) {
                  return (
                    <Tag key={value + key} text={value} color="blueLight" />
                  )
                })}
              </div>
            ),
          },
          {
            content: (
              <DropdownMenu trigger="Action" triggerType="button">
                <DropdownItemGroup>
                  <DropdownItem>
                    <Button shouldFitContainer appearance="help">Details</Button>
                  </DropdownItem>
                  <DropdownItem>
                    <Button shouldFitContainer appearance="help">Edit</Button>
                  </DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            ),
          },
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
            defaultSortKey="id"
            defaultSortOrder="ASC"
            onSort={() => console.log('onSort')}
            onSetPage={() => console.log('onSetPage')}
          />
        </Wrapper>
      );

    }
    
  }

}