import ux from "/translate/ux/action";
import styles from "@/styles/apps.module.css";
import {useState,useEffect,useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import nav_translate from "/translate/services/all_translate";

const AppList = ({list,lang}) => {
    const banner = useRef(),
    [lazy,setLazy] = useState(false),
    [offset, setOffset] = useState(0),
    serv = list!==undefined?list:[{}],
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
        <div className={styles!==undefined&&styles.main__index_b}>
              {lazy===true && offset<=10?"":
              <div className={`${styles!==undefined&&styles.left} arrow-left arrow anim_hover`} onClick={toLeftScroll}><Image width={32} height={32} src="/img/arrow_left.svg" alt="arrow-left"/></div>}
              <div className={`${styles!==undefined&&styles.right} arrow-right arrow anim_hover`} onClick={toRightScroll}><Image width={32} height={32} src="/img/arrow_right.svg" alt="arrow-right"/></div>
              <div className={`${styles!==undefined&&styles.main__index_block_row} box-inner apps_list`} ref={banner}>
                {list&&list.filter(e=>e.type === 'services').reverse().map((e,index)=>
                <Link onClick={()=>historyAction(e.name)} title={nav_translate!==undefined&&nav_translate[e.name][lang]} href={e.location} prefetch={false} key={index+1}>
                  <div className={`${styles!==undefined&&styles.main__index_block_row_b}`}>
                    <div className={styles!==undefined&&styles.main__index_block}>
                      <div className={styles!==undefined&&styles.main__index_block_pic_info}>
                        <Image priority title={nav_translate!==undefined&&nav_translate[e.name][lang]} alt={`Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`} width={60} className={styles!==undefined&&styles.main__index_block_pic_info_img} height={60} src={e.image}/>
                        <div className={styles!==undefined&&styles.main__index_block_pic_info_block}>
                          <h6>{nav_translate!==undefined&&nav_translate[e.name][lang]}</h6>
                          <span className="head">{nav_translate!==undefined&&nav_translate[e.category[0]][lang]}</span>
                        </div>
                        <div className={`${styles!==undefined&&styles.main__index_block_pic_info_block_action} anim_hover`}>
                          {ux!==undefined&&ux['open'][lang]}
                        </div>
                      </div>
                      <div className={styles!==undefined&&styles.main__index_block_pic_back}></div>
                      <div className={styles!==undefined&&styles.main__index_block_pic}>
                        <Image priority title={nav_translate!==undefined&&nav_translate[e.name][lang]} alt={`Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`} width={160} height={160} className={styles!==undefined&&styles.main__index_block_img} src={e.image}/>
                      </div>
                    </div>
                  </div>
              </Link>)}
              </div>
            </div>
    )
};

export default AppList;