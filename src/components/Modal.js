import React  from 'react';
import ReactDOM from 'react-dom';
import history from '../Helpers/History';
import { Header, Modal} from 'semantic-ui-react';

const CustomeModal = ({title,actions,content,closeModalPath,icon}) =>{
    
    return ReactDOM.createPortal(
            <Modal
            closeIcon
            open={true}
            centered={true}
            onClose={()=>history.push(closeModalPath)}
            >
                <Header icon={icon} content={title} />
                <Modal.Content>
                    <p>
                    {content}
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    {actions}
                </Modal.Actions>
            </Modal>
        
      ,document.querySelector('#modal')
    )
}

export default CustomeModal;