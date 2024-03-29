/*jshint esversion: 6 */

import Image from "next/image";
// import ux from "/translate/ux/action";
import ClientJsonFetchReq from "/start/ClientJsonFetchReq";
import { useState,useEffect,useRef } from "react";
const AesEncryption = require('aes-encryption');
import Link from "next/link";

const UserIndex = ({lang}) => {
    const text = (req,res) => req.find(e=>e.name===res)[lang];
    const lazy = useRef(false),
    [res,setRes] = useState(null),
    [ux,setUx] = useState(null),
    aes = new AesEncryption();
    aes.setSecretKey(process.env.aesKey);
    useEffect(() => {
      if (typeof window !== "undefined"&&lazy.current) return;
      lazy.current = true;
      ClientJsonFetchReq({method:"GET",path:'/get-data',cookie:document.cookie}).then(e=>setRes(prev=>prev=e));
      fetch("http://localhost:3000/api/translate/ux").then(e=>e.json()).then(e=>setUx(e));
      return () => {
        return;
      };
    }, [ClientJsonFetchReq]);
    console.log(ux)
    return(<>
    {res!==undefined?
    <Link href={`/user`} prefetch={false}>
                <div className={`header__action_image anim_hover ${JSON.stringify(res) === '{}'&&" skeleton"}`}>
                  {res !== null&&res!==undefined&&<Image title={`Avatar`} width={46} height={46} className={"header__action_avatar"} src={res !== null&&aes.decrypt(res.avatar)} alt="avatar" />}
                </div>
            </Link>:
            <Link href="/signin" prefetch={false}><div className="header__action_login_button anim_hover">{ux!==null&&text(ux,"login")}</div></Link>
    }
    </>)
};

export default UserIndex;