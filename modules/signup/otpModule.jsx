import style from "/styles/signin/index.module.css";
import {useState,useEffect,useCallback} from 'react';
import { useRouter } from "next/router";
import AesEncryption from "aes-encryption";
import text from "/translate/signup/index_translate.json";

const OtpModule = ({lang}) => {
    const [name,setName] = useState("");
    const router = useRouter();
    const [OTP, setOTP] = useState(new Array(4).fill(""));
    const [OtpContinue,setOtpContinue] = useState(false);
    const checkOTP = useCallback((res) => {
        const aes = new AesEncryption();
        aes.setSecretKey(process.env.aesKey);
        const otpKey = aes.decrypt(localStorage.getItem("RegistrationOTP"));
        if(otpKey===res) return setOtpContinue(prev=>prev=true);
        else setOtpContinue(prev=>prev=false);
    },[]);
    useEffect(()=>{
        const res = OTP.join("");
        if(res.length===4) checkOTP(res);
        else setOtpContinue(prev=>prev=false);
        return () => {
            return false;
        };
    },[OTP,checkOTP]);
    useEffect(()=>{
        const nameUser = localStorage.getItem("RegistrationName");
        const surnameUser = localStorage.getItem("RegistrationSurname");
        const emailUser = localStorage.getItem("RegistrationEmail");
        const otpUser = localStorage.getItem("RegistrationOTP");
        if(!nameUser) router.push('/signup');
        else if(!surnameUser) router.push('/signup/surname');
        else if(!emailUser) router.push('/signup/email');
        else if(!otpUser) router.push('/signup/email');
        if(emailUser&&otpUser) setName(prev=>prev=emailUser);
        return () => {
            return false;
        };
    },[router]);
    const OTPChange = (element,index) => {
        if (isNaN(element.value)) return false;

        setOTP([...OTP.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    const OTPVerified = () => {
        const otpUser = localStorage.getItem("RegistrationOTP");
        const aes = new AesEncryption();
        aes.setSecretKey(process.env.aesKey);
        const OTPDectrypt = aes.decrypt(otpUser);
        const verified = "verified-"+OTPDectrypt;
        const verifiedOTP = aes.encrypt(verified);
        localStorage.setItem("RegistrationOTPVerified",verifiedOTP);
        router.push("/signup/password");
    };
    return(<div className="main_app_full ">
    <div className={style.login_form}>
        <h1 className={style.head_center}>{text.step4[lang]}</h1>
        <p className={style.text_center}>{text.step4_text_1[lang]} <b className="green_font">{name}</b> {text.step4_text_2[lang]}</p>
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
                <button type={OtpContinue===false?"button":"submit"} onClick={()=>OtpContinue===false?"":OTPVerified()} className={`${style.login_button} ${OtpContinue===false?style.disable:""}`}>{text.continue[lang]}</button>
            </div>
    </div>
</div>)
};

export default OtpModule;