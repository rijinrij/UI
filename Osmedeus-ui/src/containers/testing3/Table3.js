// @flow
import React, { Component } from 'react';
import FieldText from '@atlaskit/field-text';
import SearchIcon from '@atlaskit/icon/glyph/search';
import Textfield from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';


const formTestUrl = '//httpbin.org/get';

export default class FormExample extends Component<void, void> {
  render() {
    return (
      <div>
        <form
          action={formTestUrl}
          method="get"
          target="submitFrame"
        >
          <ButtonGroup>
            <Button>Execute</Button>
          </ButtonGroup>

          <Textfield
            
            label="Required with default value"
            required
            value="A default value"
            name="example-text"
            elemBeforeInput={
              <div style={{ paddingLeft: '6px', lineHeight: '100%' }}>
                <SearchIcon label="search" size="medium" />
              </div>
            }
          />


          <p>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
          </p>
        </form>
        <p>The data submitted by the form will appear below:</p>
        <iframe
          
          src=""
          title="Checkbox Resopnse Frame"
          id="submitFrame"
          name="submitFrame"
        />
      </div>
    );
  }
}