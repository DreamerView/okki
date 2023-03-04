/*jshint esversion: 6 */
import dynamic from 'next/dynamic';
import {useState,useEffect} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import translate from "/translate/header_translate";
import text from "/translate/seo_index";
import {useDispatch,useSelector } from 'react-redux';
import Search from "/start/header_action/search";
const UserIndex = dynamic(()=>import('/start/user/index'),{ssr:true});

const Header = ({action}) => {
    const send = useDispatch(),
    auth = useSelector(state=>state.auth),
    {locale} = action,
    [login,setLogin] = useState(false),
    SetLanguage = () => send({type:"SetAction",set:{type:'language',name:translate.translate_title[locale],content:translate.translate_content[locale]}});
    useEffect(()=>{
      const getCookie = (cookieName) => {
        let cookies = {};
        document.cookie.split(';').forEach((el)=> {
          let [key,value] = el.split('=');
          cookies[key.trim()] = value;
        });
        return cookies[cookieName];
      };
      const cookie = getCookie("accessToken");
      setLogin((prev)=>cookie!==undefined?prev=true:prev=false);
      if(auth) setLogin((prev)=>prev=auth);
      return () => false;
    },[auth]);
    useEffect(()=>{
        let box = document.querySelector('header'),height = box.clientHeight;
        send({type:"setHeaderHeight",set:height});
        return () => false;
    });
    return(
      <>
        <Head>
          <meta name="author" content={process.env.authorName}/>
          <meta name="publisher" content={process.env.authorName}/>
          <meta name="robots" content="index,follow"/>
        </Head>
        <header>
          <>
          <div className="header__logo">
            <Link title={text['title'][locale]} href='/' prefetch={false}>
                <div className='header__logo_p'>
                  <div className="header__logo_pic anim_hover"></div>
                </div>
            </Link>
          </div>
          <div className="header__action">
            <UserIndex item={{login:login}}/>
            <div onClick={()=>SetLanguage()} className="header__action_block anim_hover">
            <span className="header__action_block_text">{locale}</span>
            <div className="header__search_menu_pic"></div>
          </div>
          </div></>
          <div className="header__search">
            <Search lang={locale} text={translate['search'][locale]}/>
          </div>
        </header>
      </>
    );
}

export default Header;