import {useState,useEffect,useRef,memo} from "react";
import ux from "/translate/ux/action";
import serv from '/start/services/all.json';
import style from "/styles/constructor/index.module.css";
import nav_translate from "/translate/services/all_translate";
import Link from "next/link";
import Image from "next/image";

const AppStore = ({lang,category}) =>{
    const content = useRef();
    const [lazy,setLazy] = useState(false);
    const [offset, setOffset] = useState(0);
    const onScroll = () => setOffset(prev=>prev=content.current.scrollLeft);
    const toRightScroll = () => content.current.scrollBy({left:364,behavior: 'smooth'});
    const toLeftScroll = () => content.current.scrollBy({left:-364,behavior: 'smooth'});
    useEffect(()=>{
        let result = undefined;
        if(typeof Window !== 'undefined') {
          result=content.current;
          setLazy(prev=>prev=true);
          result!==undefined&&result!==null&&result.removeEventListener('scroll', onScroll),result.addEventListener('scroll', onScroll, { passive: true });
        }
        return () =>{
        setLazy(prev=>prev=false);
        result!==undefined&&result!==null&&result.removeEventListener('scroll', onScroll);
        };
    },[]);
    const group = (items, n) => category===undefined?items.filter(e=>e.type === 'services').reverse().reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
      }, []):items.filter(e=>e.type === 'services'&&e.category.includes(category)).reverse().reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
      }, []);
    return(
        <div className={style.main__module}>
        {lazy===true && offset<=10?"":
        <div className={`${style.left} arrow-left arrow anim_hover`} onClick={toLeftScroll}><Image width={32} height={32} src="/img/arrow_left.svg" alt="arrow-left"/></div>}
        <div className={`${style.right} arrow-right arrow anim_hover`} onClick={toRightScroll}><Image width={32} height={32} src="/img/arrow_right.svg" alt="arrow-right"/></div>
        <div className={`${style.main__module_row} apps_list`} ref={content}>
        {serv&&group(serv, 3).map((children,index)=>
        <div key={index} className={style.main__module_row_panel}>
          {children.map((e,index) =>
            <Link title={nav_translate!==undefined&&nav_translate[e.name][lang]} href={e.location} prefetch={false} key={index+1}>
            <div className={`${style.main__module_row_block}`}>
                <div>
                    <div className={`${style.main__module_row_block_img}`}>
                        <Image priority={true} title={nav_translate!==undefined&&nav_translate[e.name][lang]} alt="service" width={60} height={60} className={style.main__module_row_block_pic} src={`${e.image}`} />
                    </div>
                </div>
                <div className={style.main__module_row_block_f}>
                    <span className="head_1">{nav_translate!==undefined&&nav_translate[e.name][lang]}</span>
                    <p className={style.main__module_row_block_f_p}>{ux['rating'][lang]} 5.0 ★</p>
                </div>
                <div className={`${style.main__module_row_block_action} anim_hover`}>
                    {ux['open'][lang]}
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
export default memo(AppStore);