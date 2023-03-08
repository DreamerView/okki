/*jshint esversion: 6 */
/*jshint sub:true*/
import dynamic from "next/dynamic";
import style from "/styles/constructor/acc/index.module.css";
import { useState,useEffect } from 'react';
import Link from 'next/link';
import Head from "next/head";
const InfoBlock = dynamic(()=>import('./info_block'));
import Image from "next/image";
import useConfirm from "/start/conf";
import { useDispatch } from 'react-redux';
import ux from "/translate/ux/action";
import translate from "/translate/constructor/acc/navbar_translate";
import text from "/translate/constructor/acc/info_translate";
import NavbarApp from "/pages/navbar_app/nav";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const InfoAcc = ({lang}) => {
    const remove = useDispatch();
    const [confirm,setConfirm] = useState(null);
    const [con,setCon] = useState(false);
    const [conf] = useConfirm(confirm);
    const [ready,setReady] = useState(false);
    const [results,setResults] = useState([]);
    const [action,setAction] = useState('');
    useEffect(()=>{
        if(localStorage.getItem('check_massive')) return setResults(JSON.parse(localStorage.getItem('check_massive')));
    },[]);
    useEffect(()=>{
        return results[0]?setReady(true):setReady(false);
    },[results]);
    const AddNewPerson = () => {
        const setId = Date.now();
        setResults([...results,{id:setId}]);
        localStorage.setItem('check_massive',JSON.stringify([...results,{id:setId}]));
        setReady(true);
        setAction('block_animation');
    };
    const RemovePerson = (res) => {
        let name,surname;
        if(res) {
            if(res.name === undefined) name=""; else name=" "+res.name;
            if(res.surname === undefined) surname=""; else surname=" "+res.surname;
        }
        setConfirm({type:"delete",name:text['alert_name'][lang],content:`${text['alert_content'][lang]}${name}${surname}?`,cancel:ux['cancel'][lang],accept_color:"red_background",accept:ux['delete'][lang]});
        setCon(res);
    };
    useEffect(()=>{
        if(conf===true) {
            setAction('remove_animation');
            setTimeout(()=>{
                setResults(results.filter(info=>info.id !== con.id));
                localStorage.setItem('check_massive',JSON.stringify(results.filter(info=>info.id !== con.id)));
                setAction('');
            },[200]);
            remove({type:"SetConfirm",set:false});
        }
        return () => {
            return 0;
        };
    },[conf,con,remove,results]);
    const SaveResult = (res) => {
        let s = JSON.parse(localStorage.getItem('check_massive'));
        let i = s.findIndex(x => x.id === res.info.id);
        s[i] = res.info;
        setResults(s);
        localStorage.setItem('check_massive',JSON.stringify(s));
    };
    return(
        <>
            <Head>
                <title>{text['name'][lang]}</title>
            </Head>
            <NavbarApp lang={lang} to={[{key:'constructor',location:'/construct'},{key:'acc_const',location:'/construct/badge'},{text:translate['step2'][lang],location:'/construct/badge/logo'},{text:translate['step3'][lang],location:'/construct/badge/size'},{text:translate['step4'][lang],path:'last'}]}/>
            <div className="main">
                <h1>{text['name'][lang]}</h1>
                <p className="sub_content">{text['content'][lang]}</p>
                {results.map(result=> result == [{}]?"":<InfoBlock change={SaveResult} remove={RemovePerson} action={action} item={result} key={result.id} lang={lang} />)}
                <div className={`${style.main__block_interface_menu} block_animation c-m click`} onClick={()=>AddNewPerson()}>
                    <div className={style.main__block_interface_menu_c_end}>
                        <div className={style.main__block_interface_menu_background}>
                            <Image width={46} height={46} className={style.main__block_interface_menu_logo_icon_img_back} src={"/img/person_add.svg" } alt="icon" />
                        </div>
                        <p className="sub_content">{text['add_user'][lang]}</p>
                    </div>
                </div>
            </div>
            <div className={style.main__block_fixed_confirm}>
                <div className={`${style.main__block_interface_menu_c_end} flex`}>
                            <Link href="/construct/badge/size" prefetch={false} className={style.main__block_interface_btn_back}>{ux['back'][lang]}</Link>
                            {!ready ? <button className={style.main__block_interface_btn_forward}>{ux['finish'][lang]}</button>: <Link href="/construct/badge/result" prefetch={false} className={style.main__block_interface_btn_forward}>{ux['finish'][lang]}</Link>}    
                </div>
            </div>
        </>
    );
};

export default InfoAcc;