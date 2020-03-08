import React, { Component } from 'react';

import GlobalStyle from './style/global';
import { Conteiner, Content } from './style'

import Upload from './components/Upload' // Nao precisa infomar o nome do arquivo, pois o react sempre busca plo index
import FileList from "./components/FileList"

class App extends Component{
  render() {
    return (
      <>
        <GlobalStyle />
        <Conteiner>
          <Content>
            <Upload />
            <FileList />
          </Content>
        </Conteiner>
      </>
    )
  }

}

export default App