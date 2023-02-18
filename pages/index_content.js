/*jshint esversion: 6 */
import { useEffect,useState } from "react";
import type_translate from "/translate/services/type_translate";

const IndexContent = ({lang,service,styles,translate,nav_translate,Link,Image,style}) => {
  const [lazy,setLazy] = useState(false);
  const [offset, setOffset] = useState(0);
  const onScroll = () => setOffset(prev=>prev=document.querySelector(".box-inner").scrollLeft);
  const locale = lang,serv = service!==undefined?service:[{}];
  const historyAction = (service) => {
    const history = JSON.parse(localStorage.getItem('historyAction')),action = history?history:[],checkExp = [...action,{name:service,time:Date.now()}],key = 'name',historyResult = [...new Map(checkExp.map(item =>[item[key], item])).values()];
    return localStorage.historyAction=JSON.stringify(historyResult);
  };
  const toRightScroll = () => document.querySelector(".box-inner").scrollBy({left:324,behavior: 'smooth'});
  const toLeftScroll = () => document.querySelector(".box-inner").scrollBy({left:-324,behavior: 'smooth'});
  useEffect(()=>{
    if(typeof Window !== 'undefined') {
      const result = document.querySelector(".box-inner");
      setLazy(prev=>prev=true);
      result!==null&&result.removeEventListener('scroll', onScroll),result.addEventListener('scroll', onScroll, { passive: true });
    }
    return () =>{
      setLazy(prev=>prev=false);
      document.querySelector(".box-inner")!==null&&document.querySelector(".box-inner").removeEventListener('scroll', onScroll);
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
              <div className={`${styles.main__index_block_row} box-inner`}>
                {serv&&serv.filter(e=>e.type === 'services').map((e,index)=>
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
            <div className={style.main__module_row}>
                {/*  */}
                {serv&&serv.filter(e=>e.type === 'services').map((e,index)=>
                    <Link title={nav_translate[e.name][lang]} href={e.location} prefetch={false} key={index+1}>
                    <div className={`${style.main__module_row_block} anim_hover`}>
                        <div>
                            <div className={`${style.main__module_row_block_img}`}>
                                <Image loading='lazy' title={nav_translate[e.name][lang]} alt="service" width={60} height={60} className={style.main__module_row_block_pic} src={e.image} />
                            </div>
                        </div>
                        <div className={style.main__module_row_block_f}>
                            <span className="head_1">{nav_translate[e.name][lang]}</span>
                            <p className={style.main__module_row_block_f_p}>{type_translate['services'][lang]}</p>
                        </div>
                    </div>
                    </Link>
                    )}
                {/*  */}
            </div>
          </div>
      </div>
        </>
  )
};
export default IndexContent;