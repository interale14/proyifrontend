import Page from "../../Page"
import TextBox from '../../UI/TextBox';
import Content from '../../UI/Content';
import { PrimaryButton } from '../../UI/Button';
import { useState } from 'react'
import { privateAxios } from '../../../store/utils/Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';

const RecPass2 = () => {
    
    const [txtCodigo, setTxtCodigo] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onBtnClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if(txtCodigo != "" || txtCodigo.length() < 8){
          dispatch(
            {
              type:"CODE_START_FETCH",
              payload:null
            }
          )
          privateAxios.post(
            '/api/sec/passrecoveryverify',
            {
              code: txtCodigo
            }
          )
          .then(({data})=>{
            console.log(data);
            dispatch(
              {
                type:"CODE_FETCH_SUCCESS",
                payload: data
              }
            )
            setTxtCodigo("");
            navigate('/nuevacontrasena',{replace:true});
          })
          .catch((err)=>{
            console.log(err);
            dispatch(
              {
                type:"CODE_FETCH_ERROR",
                payload: ["Error al guardar el mensaje."]
              }
            )
          });
        }
        else{
          alert("Ingrese el código correcto.")
          setTxtCodigo("");
        }
    }    

    const onChangeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.name === "txtCodigo") {
          setTxtCodigo(e.target.value);
        }
    }

    return (
        <Page showNavBar showHeader title="Verificación">
          <Content>
            <TextBox
              label="Ingrese el código que fue enviado al correco electrónico que ingresó."
              value={txtCodigo}
              placeholder="Código de verificación"
              onChange={onChangeHandler}
              name="txtCodigo"
            />
            <div style={{ width: "100%", padding: '0.5em', marginTop: '1em' }}>
              <PrimaryButton onClick={onBtnClick}>Verificar</PrimaryButton>
            </div>
          </Content>
        </Page>
      );
}

export default RecPass2;