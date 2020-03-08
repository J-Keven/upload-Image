import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import { DropContainer, UploadMessage } from './style'

export default class Upload extends Component {
    renderUploadImage = (isDragActive, isDragReject) => {
        let respose = <UploadMessage type="success">Solte o arquivo aqui...</UploadMessage>
        if(!isDragActive){
            respose = <UploadMessage>Arraste arquivos para cá...</UploadMessage>
        }
        else if(isDragReject){
            respose = <UploadMessage type="error">Arquivo não suportado...</UploadMessage>
        }

        return respose
    }
    render() {
        return ( 
            <Dropzone accept="image/*" onDropAccepted={() => {}}>
                {
                    ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                        <DropContainer 
                        {... getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                        >
                            <input {...getInputProps()}/>
                            {this.renderUploadImage(isDragActive, isDragReject)}
                        </DropContainer>
                    )
                }
            </Dropzone>
        )
    }
}

