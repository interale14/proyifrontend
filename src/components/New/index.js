import Page from "../Page"
import TextBox from '../UI/TextBox';
import Content from '../UI/Content';
import { PrimaryButton } from '../UI/Button';
import { useState } from 'react'
import { privateAxios } from '../../store/utils/Axios';

import "./index.css";
const New = ()=>{

  const [txtTitle, setTxtTitle] = useState("");
  const [txtMessage, setTxtMessage] = useState("");
  const [txtCorreo, setTxtCorreo] = useState("");

  const onBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    privateAxios.post(
      '/api/swot/new',
      {
        title: txtTitle,
        message: txtMessage,
        to: txtCorreo,
      }
    )
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.name === "txtCorreo") {
      setTxtCorreo(e.target.value);
    } else if (e.target.name === "txtMessage") {
      setTxtMessage(e.target.value);
    } else {
      setTxtTitle(e.target.value);
    }
  }

  return (
    <Page className="page-center" showHeader title="Nuevo">
      <Content>
        <TextBox
          label="Título"
          value={txtTitle}
          placeholder="Título del correo"
          onChange={onChangeHandler}
          name="txtTitle"
        />
        <TextBox
          label="Mensaje"
          value={txtMessage}
          placeholder="Mensaje deseado"
          onChange={onChangeHandler}
          name="txtMessage"
        />
        <TextBox
          label="Hacia"
          value={txtCorreo}
          placeholder="Correo electrónico válido"
          onChange={onChangeHandler}
          name="txtCorreo"
        />
        <div style={{ width: "100%", padding: '0.5em', marginTop: '1em' }}>
          <PrimaryButton onClick={onBtnClick}>Guardar</PrimaryButton>
        </div>
      </Content>
    </Page>
  );
}

export default New;