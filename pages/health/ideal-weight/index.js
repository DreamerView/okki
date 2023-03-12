/*jshint esversion: 6 */
import { useState,useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import text from "/translate/health/ideal-weight/index_translate";
import style from "/styles/calculator/index.module.css";
import nav_text from "/translate/services/all_translate";
import dynamic from "next/dynamic";
import AppPreloader from "/modules/app_store/app_preloader";
const AppShow =  dynamic(()=>import("/modules/app_store/app"),{loading: AppPreloader});
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});

const IdealWeight = ({lang}) => {
    const [male,setMale] = useState('other');
    const [maleText,setMaleText] = useState(text.other[lang]);
    const [n1,setN1] = useState('');
    const [n1text,setN1text] = useState('');
    const [result,setResult] = useState(0);
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
        if(male!=='other') setAnim1('male');
        if(n1!=='') setAnim2('n1');
        if(result!==0) setAnim3('result');
        return () =>{ 
            return 0;
        }
    },[male,n1,result]);
    // Завершение анимации
    
    useEffect(()=>{
        switch(male) {
            case 'male': setMaleText(text.male[lang]);break;
            case 'female': setMaleText(text.female[lang]);break;
            case 'other': setMaleText(text.other[lang]);break;
        }
        if(male==='male') return n1!='0'&&n1!=''?setResult(Math.round((n1-100))):setResult(text.loading[lang]);
        else if(male==='female') return n1!='0'&&n1!=''?setResult(Math.round((n1-110))):setResult(text.loading[lang]);
        else return setResult(text.loading[lang]);
    },[n1,male,lang]);
    useEffect(()=>{
       return n1==='' ? setN1text(0): setN1text(n1);
    },[n1]);
    return(
        <>
            <Head>
                <title>{nav_text['ideal_weight_calc'][lang]} | Okki.kz</title>
                <meta property="og:title" content={`${nav_text['ideal_weight_calc'][lang]} | Okki.kz`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/health"}} choice="alone" with_save="yes" save_name="ideal_weight_calc"/>
            <div className="main_app block_animation">
                {/* New added */}
                <AppShow lang={lang} Image={Image} name={"ideal_weight_calc"} translate={nav_text['ideal_weight_calc'][lang]}/>
                <div className='more_information_app'><Image width={36} height={36} alt="icon" src="/img/info.svg" /><p>{text['desc'][lang]}</p></div>
                <div className={style.main__calc}>
                    
                    <div className={style.main__result}>
                        <h2>{text['results'][lang]}</h2>
                        <div className={style.module_result_row}>
                            <div className={anim1==='male'?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={male==='other'?"/emoji-small/restroom.webp":male==='male'?"/emoji-small/man_raising_hand.webp":"/emoji-small/woman_raising_hand.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{text['male_selected'][lang]}</p>
                                    <h4>{maleText}</h4>
                                </div>
                            </div>
                            <div className={anim2==='n1'?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={male==='other'?"/emoji-small/restroom.webp":male==='male'?"/emoji-small/man_standing.webp":"/emoji-small/woman_standing.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{text['h_selected'][lang]}</p>
                                    <h4>{n1text}</h4>
                                </div>
                            </div>
                            <div className={anim3==='result'?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={male==='other'?"/emoji-small/restroom.webp":male==='male'?"/emoji-small/man_gesturing_ok.webp":"/emoji-small/woman_gesturing_ok.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{text['result'][lang]}</p>
                                    <h4>{result}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className={style.main__calculator}>
                        <h2>{nav_text['calculator'][lang]}</h2>
                        <div className={style.module_result_row}>
                            <div className={style.main__calculator_m}>
                                <p className={style.description}>{text['male_selected'][lang]}</p>
                                <div className={style.main__calculator_module}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={male==='other'?"/emoji-small/restroom.webp":male==='male'?"/emoji-small/man_raising_hand.webp":"/emoji-small/woman_raising_hand.webp"} width={40} height={40} alt="emoji"/>
                                    </div>
                                    <select onChange={(e)=>{setMale(e.target.value);setN1('');}} className={`${style.main__calculator_module_select}`}>
                                        <option value="other">{text['other'][lang]}</option>
                                        <option value="male">{text['male'][lang]}</option>
                                        <option value="female">{text['female'][lang]}</option>
                                    </select>
                                </div>
                            </div>
                            <div className={style.main__calculator_m} style={male==='other'?{opacity:'0.5'}:{opacity:'1'}}>
                                <p className={style.description}>{text['h_text'][lang]}</p>
                                <div className={style.main__calculator_module}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={male==='other'?"/emoji-small/restroom.webp":male==='male'?"/emoji-small/man_standing.webp":"/emoji-small/woman_standing.webp"} width={40} height={40} alt="emoji"/>
                                    </div>
                                    <input type="tel" pattern="[0-9,.]*" onChange={(e)=>{setN1((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} value={n1} placeholder={text['enter'][lang]} className={`${style.main__calculator_module_input}`} disabled={male==='other'?true:false}/>
                                    <div className={style.show}>sd</div>
                                    {n1!==''?
                                    <div className={style.main__calculator_module_close} onClick={()=>{setN1('')}}>
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

IdealWeight.getInitialProps = async ({locale}) => {
    return { lang:locale };
  };

export default IdealWeight;