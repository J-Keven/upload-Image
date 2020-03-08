import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from "react-icons/md"

import { Container, FileInfo, Preview } from './style'

const FileList = () => (
    <Container>
        <li>
            <FileInfo>
                <Preview src="https://oploadimagens.s3.amazonaws.com/8b3bd9ed90acabb6833a2139003c8754-Captura%20de%20tela%20de%202020-01-08%2011-06-07.png"/>
                <div>
                    <strong>file.png</strong>
                    <span>64kb <button onClick={ () => {} }>Excluir</button></span>
                </div>
            </FileInfo>

            <div>
                <CircularProgressbar
                    styles={{
                        root: {width: 24},
                        path: {stroke: "#1759c1"}
                    }}
                    strokeWidth={10}
                    percentage={60}
                />
                <a 
                    href="https://oploadimagens.s3.amazonaws.com/8b3bd9ed90acabb6833a2139003c8754-Captura%20de%20tela%20de%202020-01-08%2011-06-07.png" 
                    target="_blank"
                    rel="noopener noreferrer"
                     
                >
                    <MdLink style={{marginRight: 8}} size={24} color="#222"/>
                </a>

                <MdCheckCircle size={24} color="#78e5d5"/>
                <MdError size={24} color="#e57878"/>

            </div>
        </li>
    </Container>
)

export default FileList;