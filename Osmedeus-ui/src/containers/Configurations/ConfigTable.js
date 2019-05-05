/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Avatar from '@atlaskit/avatar';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu'; import styled from 'styled-components';
import EmptyState from '@atlaskit/empty-state';
import DynamicTable from '@atlaskit/dynamic-table';
import SearchIcon from '@atlaskit/icon/glyph/search';
import _ from 'lodash';
import Spinner from '@atlaskit/spinner';
import { AkCode } from '@atlaskit/code';
import { inject, observer } from "mobx-react";
import Textfield from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Status, Color } from '@atlaskit/status/element';
import Badge from '@atlaskit/badge';
import Tag from '@atlaskit/tag';
import { AkCodeBlock } from '@atlaskit/code';
// import { AkCode } from '@atlaskit/code';
import WatchIcon from '@atlaskit/icon/glyph/watch';



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
        content: 'Command',
        isSortable: true,
        shouldTruncate: true,
        width: withWidth ? 40 : undefined,
      },

      {
        key: 'module',
        content: 'Modules',
        isSortable: true,
        width: withWidth ? 10 : undefined,
      },

    ],
  };
};

const head = createHead(false);
@inject("sessStore", "axiosStore")
@observer
export default class ConfigTable extends Component {


  state = {
    rows: null,
    tamperRow: null,
  }

  componentDidMount() {
    const content = this.props;
    const ws = content.ws;
    console.log(ws);

    // get data 
    this.props.axiosStore.instance.get('/config')
      .then(response => {
        if (response.data) {
          let rows = [];
          _.forEach(response.data, function (value, key) {
            rows.push({ 'name' :key, 'value': value });
          });
          this.setState({ rows: rows });
          this.setState({ tamperRow: rows });
          
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
        key: `row-${index}-${item.cmd}`,
        cells: [
          {
            key: item.cmd,
            content: (
              <AkCode
                language="javascript"
                text={item.cmd}
                showLineNumbers={false}
              />
            ),
          },
          {
            key: item.module,
            content: <Tag text={item.module} color="greenLight"></Tag>
          },
          {
            key: item.output_path,
            content: (
              <ButtonGroup>
                <a href={"http://127.0.0.1:5000/stdout/" + item.std_path} target="_blank">
                  <Button appearance="primary">Std Path</Button>
                </a>

                <a href={"http://127.0.0.1:5000/stdout/" + item.output_path} target="_blank">
                  <Button appearance="help">Output Path</Button>
                </a>
              </ButtonGroup>

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
            isFixedSize
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