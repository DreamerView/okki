/*jshint esversion: 6 */
import dynamic from 'next/dynamic';
import { useState,useEffect} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import translate from "/translate/header_translate";
import text from "/translate/seo_index";
import { useDispatch,useSelector } from 'react-redux';
import Search from "/start/header_action/search";
const SearchBlocks = dynamic(()=>import('/start/header_action/searchblocks'),{ssr:false});
const UserIndex = dynamic(()=>import('/start/user/index'),{ssr:true});

export const getStaticPaths = async ({locale}) => {
  return {props:{lang:locale}};
};

const Header = () => {
    const send = useDispatch();
    const router = useRouter();
    const auth = useSelector(state=>state.auth);
    const {locale} = router;
    const [search,setSearch] = useState([]);
    const [list,setList] = useState('');
    const [res,setRes] = useState(false);
    const [timeOut,setTime] = useState(false);
    const [login,setLogin] = useState(false);
    const SetLanguage = () => {
        return send({type:"SetAction",set:{type:'language',name:translate.translate_title[locale],content:translate.translate_content[locale]}});
    };
    const GetResult = e => {
      return setSearch((prev)=>prev=e);
    };
    const GetList = e => {
      return setList((prev)=>prev=e);
    };
    const RefRes = s => {
      return setRes((prev)=>prev=s);
    };
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
      if(cookie!==undefined) setLogin((prev)=>prev=true);
      else setLogin((prev)=>prev=false);
      if(auth) setLogin((prev)=>prev=auth);
      return () =>{
        return false;
      };
    },[auth]);
    useEffect(()=>{
      let timer;
      if(res===false) {
        timer = setTimeout(()=>{
          setTime((prev)=>prev=false);
          send({type:"actionMain",set:false});
        },[150]);
      } else if (res===true) {
          setTime((prev)=>prev=true);
          send({type:"actionMain",set:true});
      }
      return () => {
        clearInterval(timer);
      };
    },[res]);
    useEffect(()=>{
        let box = document.querySelector('header');
        let height = box.clientHeight;
        send({type:"setHeaderHeight",set:height});
        return () => {
          return false;
        };
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
          </div>
          <div className="header__search">
          {res?"":
            // <Link title={text['title'][locale]} href="/" prefetch={false}>
            //     <div className="header__search_menu anim_hover">
            //       <div className="header__search_menu_pic1" id="search_menu"></div>
            //       <span className="header__search_menu_text">{translate['menu'][locale]}</span>
            //     </div>
            // </Link>
            <></>
            }
            <>
            <Search accept={RefRes} text={translate['search'][locale]} list={list} change={GetResult}/>
            {timeOut?
            <div className='header__search_blocks'>
              {search.length===0?
                <p>{translate['search_not'][locale]}</p>:
              <>
                <p>{translate['search_found'][locale]}</p>
                <div>{search.slice(0,5).map((v,i)=><SearchBlocks item={v} key={i+1} send={GetList}/>)}</div>
              </>}
            </div>
            :""}
            </>
            
          </div>
        </header>
      </>
    );
}

export default Header;