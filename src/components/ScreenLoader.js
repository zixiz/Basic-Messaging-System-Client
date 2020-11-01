import React  from 'react';
import { Loader ,Dimmer} from 'semantic-ui-react';

const ScreenLoader = ({active}) =>{
    return (
        <Dimmer active={active} inverted>
            <Loader />
        </Dimmer>
    )
}

export default ScreenLoader;