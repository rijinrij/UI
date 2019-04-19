import React, { Component } from 'react';
import { Fragment } from 'react';
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
import axios from 'axios';
import Spinner from '@atlaskit/spinner';
import { AkCode } from '@atlaskit/code';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { Status, Color } from '@atlaskit/status/element';
import Badge from '@atlaskit/badge';

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
        content: 'Analyze ID',
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'description',
        content: 'Description',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 10 : undefined,
      },
      {
        key: 'Component',
        content: 'Component',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'analyze-string',
        content: 'Analyze String',
        shouldTruncate: true,
        // isSortable: true,
        width: withWidth ? 30 : undefined,
      },
      {
        key: 'analyze-actions',
        shouldTruncate: true,
      },
    ],
  };
};

const head = createHead(true);

export default class ActivesTable extends Component {

  state = {
    // rows: rows
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/rest/api/activeAnalyze/')
      .then(response => {
        this.setState({ rows: response.data.actives });
        this.setState({ tamperRow: response.data.actives });
        console.log(this.state);
        

      })
      .catch(error => {
        // console.log(error);
        this.setState({ error: true });
      });
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
    if (_.isEmpty(this.state)) {
      return (
        
        <Wrapper><EmptyState header={<Spinner size="xlarge" />} /></Wrapper>
      )
      
    }
    else {
      let tamperRow = this.state.rows.map((item, index) => ({
        key: `row-${index}-${item.payload_id}`,
        cells: [
          {
            key: item.payload_id,
            content: (
              <NameWrapper>
                <AvatarWrapper>
                  <Avatar
                    name={item.payload_name}
                    size="medium"
                    src={`https://api.adorable.io/avatars/24/${encodeURIComponent(
                      item.payload_type,
                    )}.png`}
                  />
                </AvatarWrapper>
                <a href={window.location.pathname + "/" + item.payload_id}>
                  <Status text={item.payload_name} color={"purple"} />
                </a>
              </NameWrapper>
            ),
          },
          {
            key: item.analyze_type,
            content: (<h5>{item.analyze_type}</h5>),
          },
          {
            key: item.component,
            content: (<Status text={item.component} color={"purple"} />)
          },
          {
            content: (
              <span><AkCode language="javascript" text={item.analyze_string} /></span>
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