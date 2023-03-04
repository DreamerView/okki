/*jshint esversion: 6 */

import Link from "next/link";
import Image from "next/image";
import ux from "/translate/ux/action";
import useTranslateText from "/start/translate";
import ClientJsonFetchReq from "/start/ClientJsonFetchReq";
import { useState,useEffect,useRef } from "react";
const AesEncryption = require('aes-encryption');

const UserIndex = () => {
    const lazy = useRef(false);
    const [res,setRes] = useState(null);
    const lang = useTranslateText();
    const aes = new AesEncryption();
    aes.setSecretKey(process.env.aesKey);
    useEffect(() => {
      if (typeof window !== "undefined"&&lazy.current) return;
      lazy.current = true;
      ClientJsonFetchReq({method:"GET",path:'/get-data',cookie:document.cookie}).then(e=>setRes(prev=>prev=e));
      return () => {
        return;
      };
    }, [ClientJsonFetchReq]);
    return(<>
    {res!==undefined?
    <Link href={`/user`} prefetch={false}>
                <div className={`header__action_image anim_hover ${JSON.stringify(res) === '{}'&&" skeleton"}`}>
                  {res !== null&&res!==undefined&&<Image title={`Avatar`} width={46} height={46} className={"header__action_avatar"} src={res !== null&&aes.decrypt(res.avatar)} alt="avatar" />}
                </div>
            </Link>:<Link href="/signin" prefetch={false}><div className="header__action_login_button anim_hover">{ux['login'][lang]}</div></Link>
    }
    </>)
};

export default UserIndex;