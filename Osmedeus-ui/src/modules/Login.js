import React, { Component, Fragment } from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import TextField from '@atlaskit/textfield';
import RadioGroup, { AkRadio } from '@atlaskit/field-radio-group';
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';
import ModalDialog, { ModalFooter, ModalTransition } from '@atlaskit/modal-dialog';
import _ from 'lodash';
import { inject, observer } from "mobx-react";
import EmptyState from '@atlaskit/empty-state';
import InlineMessage from '@atlaskit/inline-message';
import weapons from '../images/weapons.json';
import Wrapper from '../components/ContentWrapper';
import { colors } from '@atlaskit/theme';
import InfoIcon from '@atlaskit/icon/glyph/info';
import Flag, { FlagGroup } from '@atlaskit/flag';
import HomePage from '../pages/HomePage';


@inject("sessStore", "axiosStore")
@observer
class LoginPage extends Component {

  state = {
    isLogged: this.props.sessStore.isLogged,
    error: false
  }

  componentDidMount() {
    const jwt = window.localStorage.getItem('jwt');
    if (jwt){
      this.props.axiosStore.setJWT(jwt);
      this.props.sessStore.setisLogged();
      console.log(this.props.sessStore.isLogged);
      this.setState({ isLogged: this.props.sessStore.isLogged })
    }
  }

  submitHandler = (data) => {
    console.log(data);
    let json_body = JSON.stringify({
      username: data.username,
      password: data.password
    })
    this.props.axiosStore.instance.post('/auth', json_body)
      .then(response => {
        if(response.data.hasOwnProperty('access_token')) {
          const token = response.data.access_token;
          this.props.axiosStore.setJWT(token);
          this.props.sessStore.setisLogged();
          console.log(this.props.sessStore.isLogged);
          this.setState({ isLogged: this.props.sessStore.isLogged})
        }
        else {
          this.setState({ error: true});
        }

            
      })
      .catch(error => this.setState({ error: true}));
  }

  render() {

    // console.log(this.props.Stores.isLogged);
    let flag = (          
          <FlagGroup>
            <Flag
              appearance="info"
              icon={<InfoIcon label="Info" secondaryColor={colors.N500} />}
              id="info"
              key="info"
              title="Please fill your credentials to continue"
            />
          </FlagGroup>);
    
    if (this.state.error){
      flag = (          
          <FlagGroup>
            <Flag
              appearance="error"
              icon={<InfoIcon label="Info" secondaryColor={colors.N500} />}
              id="info"
              key="info"
              title="Incorrect Credentials !!!"
            />
          </FlagGroup>);
    }

    if (!this.state.isLogged) {
      return (
        <Wrapper>
          
          <EmptyState
            header={"Login Page"}
            imageUrl={_.sample(weapons).src}
            size={"medium"}
            maxImageWidth={100}
            primaryAction={
              <InlineMessage position="bottom middle" title="Where to find credentials" type="info">
                <p>Check your config.conf file (or maybe core/config.conf)</p>
              </InlineMessage>
            }
          />

          {flag}
          
        

          <Form
            onSubmit={data => this.submitHandler(data)}
          >
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <Field name="username" defaultValue="Osmedeus" label="Username" >
                  {({ fieldProps }) => <TextField {...fieldProps} />}
                </Field>

                <Field name="password" defaultValue="" label="Password" >
                  {({ fieldProps }) => <TextField type="password"  {...fieldProps} />}
                </Field>

                <FormFooter>
                  <ButtonGroup>
                    {/* <Button appearance="subtle">Cancel</Button> */}
                    <Button type="submit" appearance="primary" isLoading={submitting}>
                      Login
                    </Button>
                  </ButtonGroup>
                </FormFooter>
              </form>
            )}
          </Form>
        </Wrapper>
      )
    }
    else {
      if (this.props.children) {
        return (
          this.props.children
        )
      }
      else{
        return (
          <HomePage />
        )
      }

      
    }

  }
}

export default LoginPage;