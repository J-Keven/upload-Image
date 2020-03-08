import styled, { css } from "styled-components"

const dragActive = css`
    border-color: #78e5d5;
`;

const dragReject = css`
    border-color: #e57878;
`;
export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;

    transition: 0.5s ease;
    
    ${props => props.isDragActive && dragActive}
    ${props => props.isDragReject && dragReject}

`;

const MessageColor = {
    default: "#fff",
    error: "#e57878", 
    success: "#78e5d5",
}
export const UploadMessage = styled.p`
    display: flex;
    background-color: ${props => MessageColor[props.type || "default"]};
    justify-content: center;    
    text-align: center;
    padding: 15px 0;
`;