import {useState,useEffect,useRef,memo} from "react";
import serv from '@/start/services/subCategory.json';
import style from "@/styles/constructor/index.module.css";
import Link from "next/link";
import Image from "next/image";

const SubAppStore = ({lang,category,service,ux}) =>{
    const text = (req,res) => req.find(e=>e.name===res)[lang];
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
    const group = (items, n) => category===undefined?items.reverse().reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
      }, []):items.reverse().reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
      }, []);
    return(<>
        <h1>{serv.find(e=>e.name===category).title}</h1>
        <div className={style.main__module}>
        {lazy===true && offset<=10?"":
        <div className={`${style.left} arrow-left arrow anim_hover`} onClick={toLeftScroll}><Image width={32} height={32} src="/img/arrow_left.svg" alt="arrow-left"/></div>}
        <div className={`${style.right} arrow-right arrow anim_hover`} onClick={toRightScroll}><Image width={32} height={32} src="/img/arrow_right.svg" alt="arrow-right"/></div>
        <div className={`${style.main__module_row} apps_list`} ref={content}>
        {serv&&group(serv, 3).map((children,index)=>
        <div key={index} className={style.main__module_row_panel}>
          {children.filter(e=>e.name===category).map((result) =>
            
            service['list'].filter(req=>result.value.includes(req.name)).map((e,index)=>
              <Link title={text(service['translate'],e.name)} href={e.location} prefetch={false} key={index+1}>
            <div className={`${style.main__module_row_block}`}>
                <div>
                    <div className={`${style.main__module_row_block_img}`}>
                        <Image priority={true} title={text(service['translate'],e.name)} alt="service" width={60} height={60} className={style.main__module_row_block_pic} src={`${e.image}`} />
                    </div>
                </div>
                <div className={style.main__module_row_block_f}>
                    <span className="head_1">{text(service['translate'],e.name)}</span>
                    <p className={style.main__module_row_block_f_p}>{text(ux,'rating')} 5.0 ★</p>
                </div>
                <div className={`${style.main__module_row_block_action} anim_hover`}>
                    {text(ux,'open')}
                </div>
            </div>
            </Link>
            )
          )}
        </div>
      )}
      </div>
      </div>
      </>)
};
export default memo(SubAppStore);