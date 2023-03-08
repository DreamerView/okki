/*jshint esversion: 6 */
import Image from 'next/image';
import Head from 'next/head';
import {useState,useEffect} from 'react';
import style from "/styles/calculator/index.module.css";
import nav_translate from "/translate/services/all_translate";
import text from "/translate/health/index-of-the-smoking-person/index_translate";
import dynamic from "next/dynamic";
import AppPreloader from "/pages/modules/app_preloader";
const AppShow =  dynamic(()=>import("/pages/modules/app"),{loading: AppPreloader});
import NavPreloader from "/pages/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/pages/navbar_app/nav'),{ssr:false,loading:NavPreloader});

const Deposit = ({lang}) => {
    const [num,setNum] = useState('');
    const [exp,setExp] = useState('');
    const [result,setResult] = useState(0);
    const [alert,setAlert] = useState({text:'',color:''});
    // Начало анимации
    const [anim1,setAnim1] = useState(false);
    const [anim2,setAnim2] = useState(false);
    const [anim3,setAnim3] = useState(false);
    useEffect(()=>{
        let timer;
        if(anim1!==false) timer = setTimeout(()=>setAnim1(false),[2000]);
        if(anim2!==false) timer = setTimeout(()=>setAnim2(false),[2000]);
        if(anim3!==false) timer = setTimeout(()=>setAnim3(false),[2000]);
        return () => clearTimeout(timer);
    },[anim1,anim2,anim3]);
    useEffect(()=>{
        if(exp!=='') setAnim1('exp');
        if(result!==0) setAnim2('result');
        if(alert.text!==text.unknown[lang]) setAnim3('alert');
        return () =>{ 
            return 0;
        }
    },[exp,result,alert,lang]);
    // Завершение анимации
    useEffect(()=>{
        num !=='' && exp !==''?setResult((num*exp)/20):setResult(0);
        let s = result.toFixed(0);
        switch(true) {
            case s>=1&&s<=9: setAlert({text:text.normal[lang],color:'green_font'});break;
            case s>=10: setAlert({text:text.copd[lang],color:'red_font'});break;
            default: setAlert({text:text.unknown[lang],color:''});
        }
        return () =>{ 
            return 0;
        }
    },[num,exp,result,lang]);
    return(
        <>
            <Head>
                <title>{nav_translate['index_of_the_smoking_person'][lang]} | Okki.kz</title>
                <meta property="og:title" content={`${nav_translate['index_of_the_smoking_person'][lang]} | Okki.kz`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/health"}} choice="alone"/>
            <div className="main_app block_animation">
                
                <AppShow lang={lang} Image={Image} name={"index_of_the_smoking_person"} translate={nav_translate["index_of_the_smoking_person"][lang]}/>
                <div className='more_information_app_small'><Image width={36} height={36} alt="icon" src="/img/info.svg" /><p>{text["content"][lang]}</p></div>
                {/* New added */}
                <div className={style.main__calc}>
                    
                    <div className={style.main__result}>
                        <h2>{text['result'][lang]}</h2>
                        <div className={style.module_result_row}>
                            <div className={anim1==='exp'?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={"/emoji-small/calendar.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{text['result1'][lang]}</p>
                                    <h4>{exp===''?0:exp}</h4>
                                </div>
                            </div>
                            <div className={anim2==='result'?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={"/emoji-small/bookmark.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{text['result2'][lang]}</p>
                                    <h4>{result}</h4>
                                </div>
                            </div>
                            <div className={anim3==='alert'?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={"/emoji-small/microscope.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{text['res'][lang]}</p>
                                    <h4 className={alert?alert.color:''}>{alert?alert.text:''}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className={style.main__calculator}>
                        <h2>{nav_translate['calculator'][lang]}</h2>
                        <div className={style.module_result_row}>
                            <div className={style.main__calculator_m}>
                                <p className={style.description}>{text['first_question'][lang]}</p>
                                <div className={style.main__calculator_module}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={"/emoji-small/cigarette.webp"} width={35} height={35} alt="emoji"/>
                                    </div>
                                    <input type="tel" pattern="[0-9,.]*" onChange={(e)=>{setNum((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} placeholder={text['enter_value'][lang]} className={`${style.main__calculator_module_input}`} value={num}/>
                                    {num!==''?
                                    <div className={style.main__calculator_module_close} onClick={()=>{setNum('')}}>
                                        <div className={style.main__calculator_module_close_img}>
                                            <Image width={22.5} height={22.5} alt="icon" src="/img/close.svg"/>
                                        </div>
                                    </div>:""}
                                </div>
                            </div>
                            <div className={style.main__calculator_m}>
                                <p className={style.description}>{text['second_question'][lang]}</p>
                                <div className={style.main__calculator_module}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={"/emoji-small/calendar.webp"} width={35} height={35} alt="emoji"/>
                                    </div>
                                    <input type="tel" pattern="[0-9,.]*" onChange={(e)=>{setExp((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} placeholder={text['enter_value'][lang]} className={`${style.main__calculator_module_input}`} value={exp}/>
                                    {exp!==''?
                                    <div className={style.main__calculator_module_close} onClick={()=>{setExp('')}}>
                                        <div className={style.main__calculator_module_close_img}>
                                            <Image width={22.5} height={22.5} alt="icon" src="/img/close.svg"/>
                                        </div>
                                    </div>:""}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
        </>
    );
};
Deposit.getInitialProps = async ({locale}) => {
    return { lang:locale };
  };

export default Deposit;