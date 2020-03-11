import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from "react-icons/md"

import { Container, FileInfo, Preview, } from './style'

const FileList = ({ file, handleDelete , }) => (
    <Container>
        { file.map( uploadfiles => (
            <li key={uploadfiles.id}>
                <FileInfo>
                    <Preview src={uploadfiles.preview}/>
                    <div>
                        <strong>{uploadfiles.name}</strong>
                        <span>{uploadfiles.readebleSize}{}
                        {uploadfiles.url && (
                            <button onClick={ handleDelete() }>Excluir</button>
                        )}</span>
                    </div>
                </FileInfo>

                <div>
                    { !uploadfiles.uploaded && !uploadfiles.error && (
                        <CircularProgressbar
                            styles={{
                                root: {width: 24},
                                path: {stroke: "#1759c1"}
                            }}
                            strokeWidth={12}
                            value={uploadfiles.progress}
                        />
                        )
                    }
                    {/* {console.log(uploadfiles.url)} */}
                    {uploadfiles.url && (
                        <a href={uploadfiles.url} 
                            rel="noopener noreferrer"
                            target="_blank">

                            <MdLink style={{marginRight: 8}} size={24} color="#222"/>
                        </a>
                    )}
                    { uploadfiles.uploaded && (<MdCheckCircle size={24} color="#78e5d5"/>)}
                    { uploadfiles.error && (<MdError size={24} color="#e57878"/>)}

                </div>
            </li>
        ))}
    </Container>
)

export default FileList;