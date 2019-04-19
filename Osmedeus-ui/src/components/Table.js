import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import DynamicTable from '@atlaskit/dynamic-table';
import { caption, head, rows } from './content/sample-data';
import SearchIcon from '@atlaskit/icon/glyph/search';
import Textfield from '@atlaskit/textfield';


const Wrapper = styled.div`
  min-width: 600px;
`;


export default class ExampleTable extends Component{

  state = {
    rows: rows
  }


  searchChangedHandler = (event) => {
    if (event.target.value) {

      const grep = _.lowerCase(event.target.value);
      let tamperRow = [];
      
      _.map(rows, function (item) {
        _.map(item, function(element){
          if (_.isArray(element)){
            _.filter(element, function(o){
              if (_.includes(_.lowerCase(o.content), grep)){
                // console.log(o.content)
                tamperRow.push(item);
              }
            });
          }
          else {
            if (_.includes(_.lowerCase(element), grep)){
              // console.log(element)
              tamperRow.push(item)
            }
          }
        })
      });

      this.setState({ rows: _.uniq(tamperRow) })
    }
    else {
      this.setState({ rows: rows })
    }

  }


  render() {
    let tamperRow = this.state.rows;

    

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
          
          caption={caption}
          head={head}
          rows={tamperRow}
          rowsPerPage={20}
          defaultPage={1}
          loadingSpinnerSize="large"
          isLoading={false}
          // isFixedSize
          defaultSortKey="term"
          defaultSortOrder="ASC"
          onSort={() => console.log('onSort')}
          onSetPage={() => console.log('onSetPage')}
        />
      </Wrapper>
    );
  }
}