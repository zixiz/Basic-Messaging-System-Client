import React from 'react';
import {Menu,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import {PATH} from '../../helpers/Constants';

class MessagesSubMenu extends React.Component {

  render() {
    const {path} = this.props
    return (
      <Menu fluid vertical >
        <Menu.Item
          name='inbox'
          active={path === PATH.INBOX}
          as={Link} to={PATH.INBOX}
        >
        <Icon name='mail' />
          Inbox
        </Menu.Item>
        <Menu.Item
          name='Sent'
          active={path === PATH.SENT}
          as={Link} to={PATH.SENT}
        >
        <Icon name='send' />
          Sent
        </Menu.Item>
        <Menu.Item
          name='compose'
          as={Link} to={PATH.COMPOSE}
        >
        <Icon name="pencil"/>
          Compose
        </Menu.Item>
      </Menu>
    )
  }
}

export default MessagesSubMenu;