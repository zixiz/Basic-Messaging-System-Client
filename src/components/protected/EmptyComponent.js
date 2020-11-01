import React from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react';

const EmptyComponent = ({icon,content,actions}) => (
  <Segment placeholder>
    <Header icon>
      <Icon name={icon} />
      {content}
    </Header>
    <Segment.Inline>
      {actions}
    </Segment.Inline>
  </Segment>
)

export default EmptyComponent;