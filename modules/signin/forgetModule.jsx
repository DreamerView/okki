import style from "/styles/signin/index.module.css";
import { useDispatch } from 'react-redux';
import { useState,useEffect,useCallback } from 'react';
import AesEncryption from "aes-encryption";

const ForgetModule = ({lang}) => {
    const send = useDispatch();
    const [wait,setWait] = useState(false);
    const [change,setChange] = useState(false);
    const [OTP, setOTP] = useState(new Array(4).fill(""));
    const [OtpContinue,setOtpContinue] = useState(false);
    const Notification = useCallback(({user,content,title,image}) => {
        send({
            type:"setNotification",
            set:{
                user:user,
                title:title,
                content:content,
                image:image
            }
        });
    },[send]);
    const checkOTP = useCallback(async(res) => {
        const email = localStorage.getItem("email");
        const requestOptions = {
            method: 'POST',
            headers: {
                "WWW-Authenticate": process.env.authHeader,
                "Accept":"application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
            },
            cache: "no-store",
            body: JSON.stringify({otp:res,email:email})
        };
        const login = await fetch(process.env.backend+"/reset-password-otp", requestOptions);
        if(login.status ===500) {
            Notification({user:"admin",content:"Something going wrong"});
            setTimeout(()=>setWait(false),[1000]);
            setOtpContinue(false);
        }
        const result = await login.json();
            if(result.success===true) {
                setTimeout(()=>setWait(false),[1000]);
                setOtpContinue(true);
            }
    },[Notification]);
    useEffect(()=>{
        const res = OTP.join("");
        if(res.length===4) checkOTP(res);
        else setOtpContinue(false);
        return () => {
            return false;
        };
    },[OTP,checkOTP]);
    const handlerLogin = async(e) =>{
        e.preventDefault();
        if(wait===false) {
            const aes = new AesEncryption();
            aes.setSecretKey(process.env.aesKey);
            const email = aes.encrypt(e.target[0].value);
            setWait(true);
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        "WWW-Authenticate": process.env.authHeader,
                        "Accept":"application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    cache: "no-store",
                    body: JSON.stringify({email:email})
                };
                const login = await fetch(process.env.backend+"/forget", requestOptions);
                if (login.status ===404) {
                    Notification({user:"admin",content:"User email not found"});
                    setTimeout(()=>setWait(false),[1000]);
                } else if(login.status ===500) {
                    Notification({user:"admin",content:"Something going wrong"});
                    setTimeout(()=>setWait(false),[1000]);
                }
                const result = await login.json();
                if(result.success===true) {
                    Notification({user:"admin",content:"User found"});
                    setTimeout(()=>setWait(false),[1000]);
                    setChange(true);
                    localStorage.setItem("email",email);
                }
            } catch {
                
            }
        }
    };
    const OTPChange = (element,index) => {
        if (isNaN(element.value)) return false;

        setOTP([...OTP.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    return(<div className="main_app block_animation">
    <div className={style.login_form}>
        {change===false?
        <><h1 className={style.head_center}>Forget password?</h1>
        <p className={style.text_center}>Please enter your log in details below</p>
        <form onSubmit={(e) => handlerLogin(e)}>
            <div className={style.login_row}>
                <input type="email" name="email" className={`${style.login_input} ${style.email}`} placeholder="Email" required />
                <button type="submit" className={style.login_button}>Submit</button>
            </div>
        </form></>:
        <><h1 className={style.head_center}>Enter OTP {OTP.join("")}</h1>
        <p className={style.text_center}>Please enter your log in details below</p>
        <form onSubmit={(e) => handlerLogin(e)}>
            <div className={style.login_row}>
                <div className={style.otp}>
                    {OTP.map((result,index)=>{
                        return(
                            <input
                                className={style.otp_keys}
                                type="tel"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={result}
                                onChange={e=>OTPChange(e.target,index)}
                                onFocus={e=>e.target.select()}
                            />
                        )
                    })}
                </div>
                <button type={OtpContinue===false?"button":"submit"} className={`${style.login_button} ${OtpContinue===false?style.disable:"block_animation"}`}>Submit</button>
            </div>
        </form></>
        }
    </div>
</div>)
};

export default ForgetModule;