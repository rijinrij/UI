import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import MainSection from '../components/MainSection';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import EmptyState from '@atlaskit/empty-state';
import { colors } from '@atlaskit/theme';
import styled from 'styled-components';
import {
  AtlaskitThemeProvider,
  elevation as AkElevations,
  themed,
} from '@atlaskit/theme';

const Container = styled.div`
  ${({ elevation }) => AkElevations[elevation]}
  background-color: ${() => themed({ light: '#F4F5F7', dark: '#DFE1E5' })};
  border-radius: 3px;
  margin-bottom: 2em;
  min-width: 240px;
  padding: 16px 24px;
  text-align: center;
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
      <ContentWrapper>
        <Container>
          <EmptyState
            header={'Osmedeus UI'}
            imageUrl={'https://image.flaticon.com/icons/svg/108/108669.svg'}
            imageWidth={300}
            imageHeight={300}
            description="Fully automated offensive security tool for reconnaissance and vulnerability scanning"
            primaryAction={
              <a href="https://github.com/j3ssie/Osmedeus" target="_blank">
                <Button
                  appearance="primary"
                >
                  README
                </Button>
              </a>
            }
            secondaryAction={
              <a href="https://twitter.com/j3ssiejjj" target="_blank">
                <Button
                  appearance="default"
                >
                  Contact me
                </Button>
              </a>
            }
          />
        </Container>
      </ContentWrapper>
    );
  }
}
