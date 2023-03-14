/*jshint esversion: 6 */
import Head from 'next/head';
import Image from 'next/image';
import translate from "/translate/health/bmi_calculator/index_translate";
import nav_text from "/translate/services/all_translate";
import style from "/styles/calculator/index.module.css";
import {useEffect,useState,useRef} from "react";
import setBmiApi from '/pages/health/bmi-calculator/api';
import dynamic from "next/dynamic";
import AppPreloader from "/modules/app_store/app_preloader";
const AppShow =  dynamic(()=>import("/modules/app_store/app"),{loading: AppPreloader});
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const BMICalc = ({lang}) => {
    const [anim,setAnim] = useState(false);
    const [n1,setN1] = useState('');
    const [n2,setN2] = useState('');
    const [age,setAge] = useState('');
    const [male,setMale] = useState('other');
    const [show,setShow] = useState({});
    const i1 = useRef();
    const i2 = useRef();
    const i3 = useRef();
    const s = setBmiApi(male,age,n1,n2,lang);
    useEffect(()=>{
        if(anim===true) {
            setTimeout(()=>{
                setAnim((prev)=>prev=false);
            },[1500])
        }
        return () =>{ 
            return 0;
        }
    },[anim]);
    useEffect(()=>{
        setShow((prev)=>prev=JSON.parse(s));
        setAnim((prev)=>prev=true);
        return () =>{ 
            console.log("Result saved!");
            console.clear();
        }
    },[s]);
    useEffect(()=>{
        setN1((prev)=>prev='');
        setN2((prev)=>prev='');
        i1.current.value='';
        i2.current.value='';
        return () =>{ 
            console.log("Result saved!");
            console.clear();
        }
    },[male,age,lang]);
    useEffect(()=>{
        setAge((prev)=>prev='');
        i3.current.value='';
        return () =>{ 
            return 0;
        }
    },[male]);
    // useEffect(() => {
    //     var ads = document.getElementsByClassName("adsbygoogle").length;
    //     for (var i = 0; i < ads; i++) {
    //       try {
    //         (adsbygoogle = window.adsbygoogle || []).push({});
    //       } catch (e) { }
    //     }
    // }, []);
    const titleText = `${translate['step1'][lang]} | Okki.kz`;
    return(
        <>
            <Head>
                <title>{titleText}</title>
                <meta property="og:title" content={titleText} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/health"}} choice="alone"/>
            <div className="main_app block_animation">
            <div className="main_block_row">
                <AppShow lang={lang} Image={Image} name={"bmi_calc"} translate={nav_text['bmi_calc'][lang]}/>
                <div className='more_information_app'><Image width={36} height={36} alt="icon" src="/img/info.svg" /><p>{translate['desctiption'][lang]}</p></div>
                <div className={style.main__calc}>
                    
                    <div className={style.main__result}>
                        <h2>{translate['results'][lang]}</h2>
                        <div className={style.module_result_row}>
                            <div className={male==='other'?style.module_result_block:anim===true?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={male==='other'?"/emoji/restroom.webp":male==='male'?"/emoji/man_raising_hand.webp":"/emoji/woman_raising_hand.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{translate['male_text'][lang]}</p>
                                    <h4>{show.maleText}</h4>
                                </div>
                            </div>
                            <div className={age===0?style.module_result_block:anim===true && show.age!==0?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={"/emoji/thought_balloon.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{translate['age'][lang]}</p>
                                    <h4>{show.age}</h4>
                                </div>
                            </div>
                            <div className={show.res_status!=='res'?style.module_result_block:anim===true && show.age!==0?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={"/emoji/magnifying_glass_tilted_right_3d.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{translate['bmi_result'][lang]}</p>
                                    <h4>{show.res}</h4>
                                </div>
                            </div>
                            <div className={show.check_status!=='check'?style.module_result_block:anim===true && show.age!==0?style.module_result_block_loader:style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={show.color===undefined?"/emoji/white_question_mark.webp":show.color==='green'?"/emoji/check_mark_button.webp":"/emoji/double_exclamation_mark.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div className={style.module_result_block_d}>
                                    <p className={style.module_result_block_desc}>{translate['result'][lang]}</p>
                                    <h4 className={`${show.color}_font`}>{show.check}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className={style.main__calculator}>
                        <h2>{translate['calc'][lang]}</h2>
                        <div className={style.module_result_row}>
                            <div className={style.main__calculator_m}>
                                <p className={style.description}>{translate['male_choose'][lang]}</p>
                                <div className={`${male==="other"&&"glow"} ${style.main__calculator_module}`}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={male==='other'?"/emoji/restroom.webp":male==='male'?"/emoji/man_raising_hand.webp":"/emoji/woman_raising_hand.webp"} width={40} height={40} alt="emoji"/>
                                    </div>
                                    <select onChange={(e)=>{setMale(e.target.value)}} className={`${style.main__calculator_module_select}`}>
                                        <option value="other">{translate['male_result_other'][lang]}</option>
                                        <option value="male">{translate['male_result_male'][lang]}</option>
                                        <option value="female">{translate['male_result_female'][lang]}</option>
                                    </select>
                                </div>
                            </div>
                            <div className={style.main__calculator_m} style={male==='other'?{opacity:'0.5'}:{opacity:'1'}}>
                                <p className={style.description}>{translate['age'][lang]}</p>
                                <div className={`${male!=='other'&&age===""&&"glow"} ${style.main__calculator_module}`}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={"/emoji/thought_balloon.webp"} width={40} height={40} alt="emoji"/>
                                    </div>
                                    <input ref={i3} type="tel" pattern="[0-9,.]*" onChange={(e)=>{setAge((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} value={age} className={`${style.main__calculator_module_input}`} placeholder={translate['age'][lang]} disabled={male==='other'?true:false}/>
                                    {age!==''?
                                    <div className={style.main__calculator_module_close} onClick={()=>{setAge('')}}>
                                        <div className={style.main__calculator_module_close_img}>
                                            <Image width={22.5} height={22.5} alt="icon" src="/img/close.svg"/>
                                        </div>
                                    </div>:""}
                                </div>
                            </div>
                            <div className={style.main__calculator_m} style={male==='other'&&age===""?{opacity:'0.5'}:{opacity:'1'}}>
                                <p className={style.description}>{translate['h_text'][lang]}</p>
                                <div className={`${male!=='other'&&n2===""&&"glow"} ${style.main__calculator_module}`}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={male==='other'?"/emoji/restroom.webp":male==='male'?"/emoji/man_standing.webp":"/emoji/woman_standing.webp"} width={40} height={40} alt="emoji"/>
                                    </div>
                                    <input ref={i2} type="tel" pattern="[0-9,.]*" onChange={(e)=>{setN2((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} value={n2} className={`${style.main__calculator_module_input}`} placeholder={translate['h_text'][lang]} disabled={male==='other'&&age===""?true:false}/>
                                    {n2!==''?
                                    <div className={style.main__calculator_module_close} onClick={()=>{setN2('')}}>
                                        <div className={style.main__calculator_module_close_img}>
                                            <Image width={22.5} height={22.5} alt="icon" src="/img/close.svg"/>
                                        </div>
                                    </div>:""}
                                </div>
                            </div>
                            <div className={style.main__calculator_m} style={male==='other'?{opacity:'0.5'}:{opacity:'1'}}>
                                <p className={style.description}>{translate['m_text'][lang]}</p>
                                <div className={`${male!=='other'&&n1===""&&"glow"} ${style.main__calculator_module}`}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={male==='other'?"/emoji/restroom.webp":male==='male'?"/emoji/man_gesturing_ok.webp":"/emoji/woman_gesturing_ok.webp"} width={40} height={40} alt="emoji"/>
                                    </div>
                                    <input ref={i1} type="tel" pattern="[0-9,.]*" onChange={(e)=>{setN1((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} value={n1} className={`${style.main__calculator_module_input}`} placeholder={translate['m_text'][lang]} disabled={male==='other'?true:false}/>
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
                {/* <ins className="adsbygoogle" style={{display: 'block'}} data-ad-client="ca-pub-5806636427537486" data-ad-slot={7444555459} data-ad-format="auto" data-full-width-responsive="true" /> */}
                {/* <AdsContent/> */}
                </div>
            </div>
        </>
    );
};

export default BMICalc;