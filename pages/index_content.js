/*jshint esversion: 6 */
import { useEffect,useState,useRef } from "react";
import dynamic from "next/dynamic";
import AppStorePreloader from "/pages/modules/apps_preloader";
const AppStore =  dynamic(()=>import("/pages/modules/apps"),{loading: AppStorePreloader});

const IndexContent = ({lang,service,styles,translate,nav_translate,Link,Image,style}) => {
  const translateText = translate!==undefined&&translate,stylesResult=styles!==undefined&&styles,navTranslate = nav_translate!==undefined&&nav_translate;
  const banner = useRef(),
  [lazy,setLazy] = useState(false),
  [offset, setOffset] = useState(0),
  locale = lang,serv = service!==undefined?service:[{}],
  historyAction = (service) => {
    const history = JSON.parse(localStorage.getItem('historyAction')),action = history?history:[],checkExp = [...action,{name:service,time:Date.now()}],key = 'name',historyResult = [...new Map(checkExp.map(item =>[item[key], item])).values()];
    return localStorage.historyAction=JSON.stringify(historyResult);
  },
  onScroll = () => setOffset(prev=>prev=banner.current.scrollLeft),
  toRightScroll = () => banner.current.scrollBy({left:364,behavior: 'smooth'}),
  toLeftScroll = () => banner.current.scrollBy({left:-364,behavior: 'smooth'});
  useEffect(()=>{
    if(typeof Window !== 'undefined') {
      const result = banner.current;
      setLazy(prev=>prev=true);
      result!==undefined&&result!==null&&result.removeEventListener('scroll', onScroll),result.addEventListener('scroll', onScroll, { passive: true });
    }
    return () =>{
      setLazy(prev=>prev=false);
      banner.current!==undefined&&banner.current!==null&&banner.current.removeEventListener('scroll', onScroll);
    };
  },[]);
  return(
        <>
        <div className="main block_animation">
          <div className="main_block_row">
            <h1 className="flex_text">{translateText['popular'][locale]} <div className="emoji_h1"><Image title={`Microsoft fire emoji (Used for informational purposes only)`} priority src={"/emoji-small/fire.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translateText['popular_subtext'][locale]}</p>
            <div className={stylesResult.main__index_b}>
              {lazy===true && offset<=10?"":
              <div className={`${stylesResult.left} arrow-left arrow anim_hover`} onClick={toLeftScroll}><Image width={32} height={32} src="/img/arrow_left.svg" alt="arrow-left"/></div>}
              <div className={`${stylesResult.right} arrow-right arrow anim_hover`} onClick={toRightScroll}><Image width={32} height={32} src="/img/arrow_right.svg" alt="arrow-right"/></div>
              <div className={`${stylesResult.main__index_block_row} box-inner`} ref={banner}>
                {serv&&serv.filter(e=>e.type === 'services').reverse().map((e,index)=>
                <Link onClick={()=>historyAction(e.name)} title={navTranslate[e.name][locale]} href={e.location} prefetch={false} key={index+1}>
                  <div className={`${stylesResult.main__index_block_row_b}`}>
                    <div className={stylesResult.main__index_block}>
                      <div className={stylesResult.main__index_block_pic_info}>
                        <Image priority title={navTranslate[e.name][locale]} alt={`Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`} width={60} className={stylesResult.main__index_block_pic_info_img} height={60} src={e.image}/>
                        <div className={stylesResult.main__index_block_pic_info_block}>
                          <h6>{navTranslate[e.name][locale]}</h6>
                          <span className="head">{navTranslate[e.category][locale]}</span>
                        </div>
                        <div className={stylesResult.main__index_block_pic_info_block_action}>
                          Open
                        </div>
                      </div>
                      <div className={stylesResult.main__index_block_pic_back}></div>
                      <div className={stylesResult.main__index_block_pic}>
                        <Image priority title={navTranslate[e.name][locale]} alt={`Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`} width={160} height={160} className={stylesResult.main__index_block_img} src={e.image}/>
                      </div>
                    </div>
                  </div>
              </Link>)}
              </div>
            </div>
            {/* <hr/> */}
            <h1>Просто попробуйте</h1>
              <AppStore serv={serv} style={style} Link={Link} nav_translate={nav_translate} lang={lang} Image={Image}/>
          </div>
      </div>
        </>
  )
};
export default IndexContent;