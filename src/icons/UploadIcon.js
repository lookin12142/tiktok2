import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons'


function UploadIcon() {
    return (
        <div>
            <FontAwesomeIcon icon={faCloudUploadAlt} color="rgba(221,222,223,1)" size="5x"/> 
        </div>
    )
}


export default UploadIcon;