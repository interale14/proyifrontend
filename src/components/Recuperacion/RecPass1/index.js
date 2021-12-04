import Page from "../../Page"
import TextBox from '../../UI/TextBox';
import Content from '../../UI/Content';
import { PrimaryButton } from '../../UI/Button';
import { useState } from 'react'
import { privateAxios } from '../../../store/utils/Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';

const RecPass1 = () => {
    
    const [txtCorreo, setTxtCorreo] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mailvalid = (mail) => {
      return RegExp(/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/).test(mail);
    }

    const onBtnClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if(mailvalid(txtCorreo)){
          dispatch(
            {
              type:"EMAIL_START_FETCH",
              payload:null
            }
          )
          privateAxios.post(
            '/api/sec/passrecovery',
            {
              email: txtCorreo
            }
          )
          .then(({data})=>{
            console.log(data);
            dispatch(
              {
                type:"EMAIL_FETCH_SUCCESS",
                payload: data
              }
            )
            navigate('/verificacion',{replace:true});
          })
          .catch((err)=>{
            console.log(err);
            dispatch(
              {
                type:"EMAIL_FETCH_ERROR",
                payload: ["Error al guardar el mensaje."]
              }
            )
          });
          setTxtCorreo("");
        }
        else{
          alert("Ingrese un correo con una sintaxis válida.");
          setTxtCorreo("");
        }
    }    

    const onChangeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.name === "txtCorreo") {
          setTxtCorreo(e.target.value);
        }
    }

    return (
        <Page showNavBar showHeader title="Recuperación">
          <Content>
            <TextBox
              label="Ingrese el correo de la cuenta que desea recuperar. Se le enviará un código que deberá ingresar."
              value={txtCorreo}
              placeholder="Correo electrónico válido"
              onChange={onChangeHandler}
              name="txtCorreo"
            />
            <div style={{ width: "100%", padding: '0.5em', marginTop: '1em' }}>
              <PrimaryButton onClick={onBtnClick}>Enviar</PrimaryButton>
            </div>
          </Content>
        </Page>
      );
}

export default RecPass1;