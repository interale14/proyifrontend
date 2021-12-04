import Page from "../../Page"
import Password from "../../UI/Password";
import Content from '../../UI/Content';
import { PrimaryButton } from '../../UI/Button';
import { useState } from 'react'
import { privateAxios } from '../../../store/utils/Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';

const RecPass3 = () => {
    
    const [txtPassword, setTxtPassword] = useState("");
    const [txtConfirm, setTxtConfirm] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onBtnClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if(txtPassword == txtConfirm){
          dispatch(
            {
              type:"PASS_START_FETCH",
              payload:null
            }
          )
          privateAxios.post(
            '/api/sec/newpassword',
            {
              pswd: txtPassword,
              confirm: txtConfirm
            }
          )
          .then(({data})=>{
            console.log(data);
            dispatch(
              {
                type:"PASS_FETCH_SUCCESS",
                payload: data
              }
            )
            setTxtPassword("");
            setTxtConfirm("");
            navigate('/login',{replace:true});
          })
          .catch((err)=>{
            console.log(err);
            dispatch(
              {
                type:"PASS_FETCH_ERROR",
                payload: ["Error al cambiar la contraseña."]
              }
            )
          });
        }
        else{
          alert("Las contraseña no coincide.")
          setTxtConfirm("");
        }
    }    

    const onChangeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.name === "txtConfirm") {
          setTxtConfirm(e.target.value);
        }
        else{
            setTxtPassword(e.target.value);
        }
    }

    return (
        <Page showNavBar showHeader title="Nueva Contraseña">
          <Content>
            <Password
                label="Ingrese la nueva contraseña."
                value={txtPassword}
                placeholder="Contraseña"
                onChange={onChangeHandler}
                name="txtPassword"
            />
            <Password
                label="Confirme la nueva contraseña."
                value={txtConfirm}
                placeholder="Verificación"
                onChange={onChangeHandler}
                name="txtConfirm"
            />
            <div style={{ width: "100%", padding: '0.5em', marginTop: '1em' }}>
              <PrimaryButton onClick={onBtnClick}>Confirmar</PrimaryButton>
            </div>
          </Content>
        </Page>
      );
}

export default RecPass3;