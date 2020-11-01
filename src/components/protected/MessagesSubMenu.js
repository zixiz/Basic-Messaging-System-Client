import React from 'react';
import {Menu,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class MessagesSubMenu extends React.Component {

  render() {
    const {path} = this.props
    return (
      <Menu fluid vertical>
        <Menu.Item
          name='inbox'
          active={path === '/inbox'}
          as={Link} to="/inbox"
        >
        <Icon name='mail' />
          Inbox
        </Menu.Item>
        <Menu.Item
          name='Sent'
          active={path === '/inbox/sent'}
          as={Link} to="/inbox/sent"
        >
        <Icon name='send' />
          Sent
        </Menu.Item>
        <Menu.Item
          name='compose'
          as={Link} to="/compose"
        >
        <Icon name="pencil"/>
          Compose
        </Menu.Item>
      </Menu>
    )
  }
}

export default MessagesSubMenu;