/*jshint esversion: 6 */
import { useEffect,useState,useRef } from "react";
import dynamic from "next/dynamic";
const AppStore =  dynamic(()=>import("/pages/modules/apps"),{loading: () => '<div className="app_show_preloader">Loading</div>',});

const IndexContent = ({lang,service,styles,translate,nav_translate,Link,Image,style}) => {
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
            <h1 className="flex_text">{translate['popular'][locale]} <div className="emoji_h1"><Image title={`Microsoft fire emoji (Used for informational purposes only)`} priority src={"/emoji-small/fire.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate['popular_subtext'][locale]}</p>
            <div className={styles.main__index_b}>
              {lazy===true && offset<=10?"":
              <div className={`${styles.left} arrow-left arrow anim_hover`} onClick={toLeftScroll}><Image width={32} height={32} src="/img/arrow_left.svg" alt="arrow-left"/></div>}
              <div className={`${styles.right} arrow-right arrow anim_hover`} onClick={toRightScroll}><Image width={32} height={32} src="/img/arrow_right.svg" alt="arrow-right"/></div>
              <div className={`${styles.main__index_block_row} box-inner`} ref={banner}>
                {serv&&serv.filter(e=>e.type === 'services').reverse().map((e,index)=>
                <Link onClick={()=>historyAction(e.name)} title={nav_translate[e.name][locale]} href={e.location} prefetch={false} key={index+1}>
                  <div className={`${styles.main__index_block_row_b}`}>
                    <div className={styles.main__index_block}>
                      <div className={styles.main__index_block_pic_info}>
                        <Image priority title={nav_translate[e.name][locale]} alt={`Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`} width={60} className={styles.main__index_block_pic_info_img} height={60} src={e.image}/>
                        <div className={styles.main__index_block_pic_info_block}>
                          <h6>{nav_translate[e.name][locale]}</h6>
                          <span className="head">{nav_translate[e.category][locale]}</span>
                        </div>
                        <div className={styles.main__index_block_pic_info_block_action}>
                          Open
                        </div>
                      </div>
                      <div className={styles.main__index_block_pic_back}></div>
                      <div className={styles.main__index_block_pic}>
                        <Image priority title={nav_translate[e.name][locale]} alt={`Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`} width={160} height={160} className={styles.main__index_block_img} src={e.image}/>
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