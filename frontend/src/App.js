import React, { Component } from 'react';

import GlobalStyle from './style/global';
import { Conteiner, Content } from './style'
import { uniqueId } from "lodash"
import filesize from 'filesize'

import api from "./services/api"

import Upload from './components/Upload' // Nao precisa infomar o nome do arquivo, pois o react sempre busca plo index
import FileList from "./components/FileList"

class App extends Component{
  state = {
    uploadfiles: [],
  }

  handleUpload = files => {
    // this.state.uploadFileList.push(files)
    // console.log(this.state.uploadFileList)
    const uploadfiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readebleSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))

    this.setState({
      uploadfiles: this.state.uploadfiles.concat(uploadfiles)
    })

    uploadfiles.forEach(this.procesUpload);
  }

  updateFile = (id, data) => {
    this.setState({
      uploadfiles: this.state.uploadfiles.map(uploadFile => {
        return id === uploadFile.id ? {...uploadFile, ...data} : uploadFile;
      })
    })
  }

  procesUpload = (uploadfile) => {
    const data = new FormData()

    data.append('file', uploadfile.file, uploadfile.name)

    api.post('/posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round(e.loaded * 100 / e.total))
        // console.log(progress)
        this.updateFile(uploadfile.id, { progress, })
      }
    }).then((respose) => {
      this.updateFile(uploadfile.id, {
        uploaded: true,
        id: respose.data._id,
        url: respose.data.url,
      })
    }).catch(() => {
      this.updateFile(uploadfile.id, {
        error: true,
      })
    })
  }

  handleDelete = async id => {
    await api.delete(`/posts/${id}`)
    this.setState({
      uploadfiles: this.state.uploadfiles.id !== id
    })
  }

  render() {
    const { uploadfiles } = this.state
    return (
      <>
        <GlobalStyle />
        <Conteiner>
          <Content>
            <Upload onUpload={this.handleUpload}/>
            { !! uploadfiles && (
              <FileList file={ uploadfiles } handleDelete={ this.handleDelete }/>
            ) }
          </Content>
        </Conteiner>
      </>
    )
  }

}

export default App