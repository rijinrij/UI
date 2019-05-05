import PropTypes from 'prop-types';
import React, { Component } from "react";

import { AkNavigationItemGroup, AkNavigationItem } from "@atlaskit/navigation";
import Button from '@atlaskit/button';
import BitbucketBranchesIcon from "@atlaskit/icon/glyph/bitbucket/branches";
import PageIcon from "@atlaskit/icon/glyph/page";
import CalendarIcon from "@atlaskit/icon/glyph/calendar";
import EmojiObjectsIcon from "@atlaskit/icon/glyph/emoji/objects";
import EmojiNatureIcon from "@atlaskit/icon/glyph/emoji/nature";
import EmojiTravelIcon from "@atlaskit/icon/glyph/emoji/travel";
import EmptyState from '@atlaskit/empty-state';

const createItems = [
  {
    title: null,
    items: [
      ['/#event', 'Create Event', 'Create Event', CalendarIcon],
      ['/#nature', 'Create Nature', 'Create Nature', EmojiNatureIcon],
      ['/#idea', 'Create Idea', 'Create Idea', EmojiObjectsIcon],
      ['/#travel', 'Create Travel Plans', 'Create Travel Plans', EmojiTravelIcon],
    ],
  },
  {
    title: 'Group with title',
    items: [
      ['/#branch', <span>Create a <strong>Bitbucket branch</strong></span>, 'Bitbucket branch', BitbucketBranchesIcon],
      ['/#page', <span>Create a <strong>Confluence page</strong></span>, 'Confluence page', PageIcon],
    ],
  },
];

export default class CreateDrawer extends Component {
  static propTypes = {
    onItemClicked: PropTypes.func,
  };

  render() {
    return (
      <div>
        <EmptyState 
          header={'Osmedeus UI'}
          imageUrl={'https://image.flaticon.com/icons/svg/108/108669.svg'}
          imageWidth={200}
          imageHeight={200}
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

        

      </div>
    )
  };
}
