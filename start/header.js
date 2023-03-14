/*jshint esversion: 6 */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import translate from "/translate/header_translate";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const Search = dynamic(()=>import("/start/header_action/search"),{ssr:false});
const UserIndex = dynamic(()=>import('/start/user/index'),{ssr:false});

const Header = () => {
    const send = useDispatch(),
    router = useRouter(),
    {locale} = router,
    SetLanguage = () => send({type:"SetAction",set:{type:'language',name:translate.translate_title[locale],content:translate.translate_content[locale]}});
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
          <div className="header__logo">
            <div onClick={()=>router.push("/")} className='header__logo_p'>
              <div className="header__logo_pic anim_hover"></div>
            </div>
          </div>
          <div className="header__action">
            <UserIndex lang={locale}/>
            <div onClick={()=>SetLanguage()} className="header__action_block anim_hover">
            <span className="header__action_block_text">{locale}</span>
            <div className="header__search_menu_pic"></div>
          </div>
          </div>
          <div className="header__search">
            <Search lang={locale} text={translate['search'][locale]}/>
          </div>
        </header>
      </>
    );
}

export default Header;