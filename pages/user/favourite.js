/*jshint esversion: 6 */
/*jshint esversion: 9 */
import ServerJsonFetchReq from '/start/ServerJsonFetchReq';
import dynamic from 'next/dynamic';
import NavbarApp from '/pages/navbar_app/nav';
import style from "/styles/user/index.module.css";
import SearchResult from "/start/services/all.json";
import { useMediaQuery } from 'react-responsive';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ux from "/translate/user/index_translate";
import services from "/translate/services/all_translate";
import Head from 'next/head';
const HeaderUser = dynamic(()=>import('/pages/user/headerModule'));

export const config = {
    runtime: 'nodejs',
};

export const getServerSideProps = async (context) => {
    if(process.env.production===true) {
        context.res.setHeader(
            'Cache-Control',
            'public, s-maxage=10, stale-while-revalidate=59'
        );
    }
    const locale = context.locale;
    const data = await ServerJsonFetchReq({
        method:"GET",
        path:"/get-data",
        cookie:context.req.headers.cookie,
        server:context,
        auth:"yes"
    });
    console.log(data)
    if(data!==undefined && data.result==='redirect') {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            }
        }; 
    }
    return {
        props: {locale:locale}
    }; 
};

const UserInterface = ({locale}) => {
    const [lazy,setLazy] = useState(false);
    const lang = locale;
    const isTabletOrMobile = useMediaQuery({ query: '(min-width:1px) and (max-width:750px)' });
    const [prev,setPrev] = useState([{}]);
    const [sortItem,setSortItem] = useState('new');
    const [sortItemRes,setSortItemRes] = useState('all');
    const response = SearchResult;
    useEffect(()=>{
        setLazy((lazy)=>lazy=true);
        return()=>{
            return false;
        }
    },[]);
    const historyAction = (service) => {
        const history = JSON.parse(localStorage.getItem('favouriteAction'));
        const action = history?history:[];
        const checkExp = [...action,{name:service,time:Date.now()}];
        const key = 'name';
        const historyResult = [...new Map(checkExp.map(item =>[item[key], item])).values()];
        return localStorage.setItem('favouriteAction',JSON.stringify(historyResult));
    };
    useEffect(() => {
        if(typeof window !== "undefined") {
            const mergeByTime = (a1, a2) =>{
                return a1.map(itm => ({
                    ...a2.find((item) => (item.name === itm.name) && item),
                    ...itm
                    
            }))};
            const filterCategory = (result, resp) => {
                return JSON.stringify(result)!=='[{}]'?result.filter(res => res.category.includes(resp)):[{}];
            };
            const history = JSON.parse(localStorage.getItem('favouriteAction'));
            let action = history?history:[{}];
            if(sortItem==="new") action=JSON.stringify(action)!=="[{}]"?action.sort((a,b)=>b.time-a.time):[{}];
            else if (sortItem==="old") action=JSON.stringify(action)!=="[{}]"?action.sort((a,b)=>a.time-b.time):[{}];
            let result;
            const res = mergeByTime(action,response);
            if(sortItemRes==='all') result = res;
            else result = filterCategory(res,sortItemRes);
            setPrev(pre=>pre=result);
        }
        return () => {
            return false;
        };
    }, [sortItem,sortItemRes,response]);
    const ConvertTime = (unix_timestamp) => {
        const date = new Date(unix_timestamp);
        const day = String(date.getDate()).length===1?"0"+String(date.getDate()):date.getDate();
        const month = String(date.getMonth()+1).length===1?"0"+String(date.getMonth()+1):String(date.getMonth()+1);
        const year = date.getFullYear();
        const hours = String(date.getHours()).length===1?"0"+String(date.getHours()):date.getHours();
        const minutes = String(date.getMinutes()).length===1?"0"+String(date.getMinutes()):date.getMinutes();
        return day+"."+month+"."+year+" "+hours+":"+minutes;
    };
    const titleHead = `${ux['favorites'][lang]} | Okki.kz`;
    return(
    <>
        <Head>
                <title>{titleHead}</title>
        </Head>
        <NavbarApp lang={lang} to={{href:"/user"}} choice="alone" mode="standalone"/>
        <div className="main_app">
            <div className={style.user__main}>
                {lazy===true&&isTabletOrMobile?"":<HeaderUser lang={lang}/>}
                <div className={style.main__user_action}>
                    <h1>{ux['favorites'][lang]}</h1>
                    <p className='sub_content'>{ux['favorites_text'][lang]}</p>
                    <div className={style.main__sort_menu}>
                        <div className={style.sort_item}>{ux['sort_by'][lang]} 
                            <select onChange={e=>setSortItem(prev=>prev=e.target.value)} className={`${style.sort} anim_hover`}>
                                <option value="new">{ux['new_sort'][lang]}</option>
                                <option value="old">{ux['old_sort'][lang]}</option>
                            </select>
                        </div>
                        <div className={style.sort_item}>{ux['category'][lang]} 
                            <select onChange={e=>setSortItemRes(prev=>prev=e.target.value)} className={`${style.sort} anim_hover`}>
                                <option value="all">{ux['all'][lang]}</option>
                                {response.filter(res=>res.type==='category').map((result,index)=>{return <option id={index+1} key={index} value={result.name}>{services[result.name][lang]}</option>})}
                            </select>
                        </div>
                    </div>
                        <div className={style.main__user_action_prev}>
                            {prev.map((result,index)=>{return JSON.stringify(result)!=="{}"?
                            <Link onClick={()=>historyAction(result.name)} key={index} href={result.location}>
                                    <div className={`${style.main__user_action_prev_row} anim_hover`}>
                                        <div className={style.main__user_action_prev_row_block}>
                                            <Image priority width={90} height={90} className={style.main__user_action_prev_row_block_img} alt="services" src={result.image}/>
                                        </div>
                                        <span><b>{services[result.name][lang].split(' ').slice(0,2).join(" ")}</b></span>
                                        <p className={style.main__user_action_prev_row_block_text}>{ConvertTime(result.time)}</p>
                                    </div>
                            </Link>:""
                                }
                            )}
                        </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default UserInterface;