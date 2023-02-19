import type_translate from "/translate/services/type_translate";
import style from "/styles/constructor/index.module.css";
import {useState,useEffect} from "react";

const AppStore = ({serv,Link,nav_translate,lang,Image}) =>{
    const [lazy,setLazy] = useState(false);
    const [offset, setOffset] = useState(0);
    const onScroll = () => setOffset(prev=>prev=document.querySelector(".apps_list").scrollLeft);
    const toRightScroll = () => document.querySelector(".apps_list").scrollBy({left:364,behavior: 'smooth'});
    const toLeftScroll = () => document.querySelector(".apps_list").scrollBy({left:-364,behavior: 'smooth'});
    useEffect(()=>{
        if(typeof Window !== 'undefined') {
        const result = document.querySelector(".apps_list");
        setLazy(prev=>prev=true);
        result!==null&&result.removeEventListener('scroll', onScroll),result.addEventListener('scroll', onScroll, { passive: true });
        }
        return () =>{
        setLazy(prev=>prev=false);
        document.querySelector(".apps_list")!==null&&document.querySelector(".apps_list").removeEventListener('scroll', onScroll);
        };
    },[]);
    const group = (items, n) => items.filter(e=>e.type === 'services').reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
      }, []);
    return(
        <div className={style.main__module}>
        {lazy===true && offset<=10?"":
        <div className={`${style.left} arrow-left arrow anim_hover`} onClick={toLeftScroll}><Image width={32} height={32} src="/img/arrow_left.svg" alt="arrow-left"/></div>}
        <div className={`${style.right} arrow-right arrow anim_hover`} onClick={toRightScroll}><Image width={32} height={32} src="/img/arrow_right.svg" alt="arrow-right"/></div>
        <div className={`${style.main__module_row} apps_list`} >
        {serv&&group(serv, 3).map((children,index)=>
        <div key={index} className={style.main__module_row_panel}>
          {children.map((e,index) =>
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
        </div>
      )}
      </div>
      </div>
    )
};
export default AppStore;