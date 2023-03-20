import style from "/styles/signin/index.module.css";
import {useState,useEffect} from 'react';
import { useRouter } from "next/router";
import AesEncryption from "aes-encryption";
import { useDispatch } from "react-redux";
import text from "/translate/signup/index_translate.json";

const EmailModule = ({lang}) => {
    const send = useDispatch();
    const [name,setName] = useState("");
    const router = useRouter();
    const [wait,setWait] = useState(false);
    const [change,setChange] = useState(false);
    useEffect(()=>{
        const nameUser = localStorage.getItem("RegistrationName");
        const surnameUser = localStorage.getItem("RegistrationSurname");
        if(!nameUser) router.push('/signup');
        else if(!surnameUser) router.push('/signup/surname');
        const emailUser = localStorage.getItem("RegistrationEmail");
        if(emailUser) setName(prev=>prev=emailUser);
        return () =>{
            return false;
        };
    },[router]);
    const Notification = ({user,content,title,image}) => {
        send({
            type:"setNotification",
            set:{
                user:user,
                title:title,
                content:content,
                image:image
            }
        });
    };
    const actionState = (e) => {
        setName(prev=>prev=e);
    };
    const handleEmail = async() => {
        if(wait===false) {
            const aes = new AesEncryption();
            aes.setSecretKey(process.env.aesKey);
            const email = aes.encrypt(name);
            const client = aes.encrypt('okki');
            // setWait(true);
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        "WWW-Authenticate": process.env.authHeader,
                        "Accept":"application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({email:email,client:client})
                };
                const login = await fetch(process.env.backend+"/verify-email", requestOptions);
                if (login.status ===404) {
                    Notification({user:"admin",content:text.step3_notification[lang]});
                    setChange(prev=>prev=false);
                    setTimeout(()=>setWait(prev=>prev=false),[1000]);
                } else if(login.status ===500) {
                    Notification({user:"admin",content:"Something going wrong"});
                    setTimeout(()=>setWait(prev=>prev=false),[1000]);
                    setChange(prev=>prev=false);
                }
                setTimeout(()=>setWait(prev=>prev=false),[1000]);
                setChange(prev=>prev=true);
                sendOTP();
            } catch(e) {
                console.log(e);
            }
        }
    };
    const sendOTP = async() => {
        const aes = new AesEncryption();
        aes.setSecretKey(process.env.aesKey);
        const email = aes.encrypt(name);
        const client = aes.encrypt('okki');
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "WWW-Authenticate": process.env.authHeader,
                    "Accept":"application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({email:email,client:client})
            };
            const login = await fetch(process.env.backend+"/verify-email-otp", requestOptions);
            if (login.status ===404) {
                Notification({user:"admin",content:text.step3_notification[lang]});
                setChange(prev=>prev=false);
                setTimeout(()=>setWait(prev=>prev=false),[1000]);
            } else if(login.status ===500) {
                Notification({user:"admin",content:"Something going wrong"});
                setTimeout(()=>setWait(prev=>prev=false),[1000]);
                setChange(prev=>prev=false);
            }
            const result = await login.json();
            if(result.success===true) {
                const otpKey = result.otp;
                localStorage.setItem("RegistrationOTP",otpKey);
                setTimeout(()=>setWait(prev=>prev=false),[1000]);
                setChange(prev=>prev=true);
                localStorage.setItem("RegistrationEmail",name);
                router.push("/signup/otp");
            }
        } catch(e) {
            console.log(e);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          if(name!=="") return handleEmail();
        }
    };
    return(<div className="main_app_full ">
    <div className={style.login_form}>
        <h1 className={style.head_center}>{text.step3[lang]}</h1>
        <p className={style.text_center}>{text.step3_text[lang]} <b className="green_font">andrey.alekseev@okki.kz</b></p>
            <div className={style.login_row}>
                <input onKeyDown={handleKeyDown} type="text" name="text" value={name} onChange={(e)=>actionState(e.target.value)} className={`${style.login_input} ${style.email}`} placeholder={text.step3_input[lang]} required />
                <button type="button" onClick={()=>change===false?handleEmail():""} className={style.login_button}>{text.continue[lang]}</button>
            </div>
    </div>
</div>)
};

export default EmailModule;