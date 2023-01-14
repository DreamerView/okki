/*jshint esversion: 6 */
import Head from "next/head";
import Image from "next/image";
import {useState,useEffect} from 'react';
import style from "/styles/health/rh-factor-in-pregnancy-planning/index.module.css";
import nav_text from "/translate/services/all_translate";
import text from "/translate/health/rh-factor-in-family-planning/index_translate";
import NavbarApp from '/pages/navbar_app/nav';

const RhFactorInPregnancyPlanning = ({lang}) => {
    const [manRh,setManRh] = useState(`I`);
    const [womanRh,setWomanRh] = useState(`I`); 
    const [result,setResult] = useState({con:'',child:'',color:'block'});
    const [manSymbol,setManSymbol] = useState('+');
    const [womanSymbol,setWomanSymbol] = useState('+');
    const [symbol,setSymbol] = useState({child:'',con:'',color:'block'});
    useEffect(()=>{
        switch(true) {
            case manSymbol==='+'&&womanSymbol==='+': setSymbol({child:'+',con:text.no[lang],color:'block'});break;
            case manSymbol==='+'&&womanSymbol==='-': setSymbol({child:'50% +',con:text.maybe[lang],color:'red'});break;
            case manSymbol==='-'&&womanSymbol==='+': setSymbol({child:'50% -',con:text.no[lang],color:'block'});break;
            case manSymbol==='-'&&womanSymbol==='-': setSymbol({child:'-',con:text.no[lang],color:'block'});break;
        }
        switch(true) {
            case manRh===`I`&&womanRh===`I`:setResult({con:text.no[lang],child:`I`,color:'block'});break;
            case manRh===`I`&&womanRh===`II`:setResult({con:text.no[lang],child:`I ${text.or[lang]} II`,color:'block'});break;
            case manRh===`I`&&womanRh===`III`:setResult({con:text.no[lang],child:`I ${text.or[lang]} III`,color:'block'});break;
            case manRh===`I`&&womanRh===`IV`:setResult({con:text.no[lang],child:`II ${text.or[lang]} III`,color:'block'});break;
            case manRh===`II`&&womanRh===`I`:setResult({con:'50%  '+text.conflict_txt[lang],child:`I ${text.or[lang]} II`,color:'orange'});break;
            case manRh===`II`&&womanRh===`II`:setResult({con:text.no[lang],child:`I ${text.or[lang]} II`,color:'block'});break;
            case manRh===`II`&&womanRh===`III`:setResult({con:'25% '+text.conflict_txt[lang],child:text.any[lang],color:'blue'});break;
            case manRh===`II`&&womanRh===`IV`:setResult({con:text.no[lang],child:`I ${text.or[lang]} II ${text.or[lang]} IV`,color:'block'});break;
            case manRh===`III`&&womanRh===`I`:setResult({con:'50% '+text.conflict_txt[lang],child:`I ${text.or[lang]} III`,color:'orange'});break;
            case manRh===`III`&&womanRh===`II`:setResult({con:'50% '+text.conflict_txt[lang],child:text.any[lang],color:'orange'});break;
            case manRh===`III`&&womanRh===`III`:setResult({con:text.no[lang],child:`I ${text.or[lang]} III`,color:'block'});break;
            case manRh===`III`&&womanRh===`IV`:setResult({con:text.no[lang],child:`I ${text.or[lang]} III ${text.or[lang]} IV`,color:'block'});break;
            case manRh===`IV`&&womanRh===`I`:setResult({con:'100% '+text.conflict_txt[lang],child:`II ${text.or[lang]} III`,color:'red'});break;
            case manRh===`IV`&&womanRh===`II`:setResult({con:'66% '+text.conflict_txt[lang],child:`I ${text.or[lang]} II ${text.or[lang]} IV`,color:'orange'});break;
            case manRh===`IV`&&womanRh===`III`:setResult({con:'66% '+text.conflict_txt[lang],child:`I ${text.or[lang]} III ${text.or[lang]} IV`,color:'orange'});break;
            case manRh===`IV`&&womanRh===`IV`:setResult({con:text.no[lang],child:`II ${text.or[lang]} III ${text.or[lang]} IV`,color:'block'});break;
        }
        return () =>{ 
            return 0;
        }
    },[manRh,womanRh,manSymbol,womanSymbol,lang]);
    return(
        <>
            <Head>
                <title>{nav_text['rh_factor_in_family_planning'][lang]} | Okki.kz</title>
                <meta property="og:title" content={`${nav_text['rh_factor_in_family_planning'][lang]} | Okki.kz`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/health"}} choice="alone"/>
            <div className="main_app block_animation">
                <h1>{nav_text['rh_factor_in_family_planning'][lang]}</h1>
                <p className="sub_content">{text['content'][lang]}</p>
                <div>
                    <div className={style.comparitive__block}>
                        <div className={style.comparitive__block_row}>
                            <h1>{text['father'][lang]}</h1>
                            <div className={style.comparitive__block_row_image}>
                                <Image src="/emoji-small/man_raising_hand.webp" width={120} height={120} alt="emoji"/>
                            </div>
                            <div className={style.comparitive__block_row_flex}>
                                <h1>Rh</h1>
                                <select onChange={e=>setManRh(e.target.value)} className={style.comparitive__block_row_select}>
                                    <option value="I">I</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                </select>
                                <select onChange={e=>setManSymbol(e.target.value)} className={style.comparitive__block_row_select}>
                                    <option value="+">+</option>
                                    <option value="-">-</option>
                                </select>
                            </div>
                        </div>
                        <div className={style.comparitive__block_row}>
                            <h1>{text['mother'][lang]}</h1>
                            <div className={style.comparitive__block_row_image}>
                                <Image src="/emoji-small/woman_raising_hand.webp" width={120} height={120} alt="emoji"/>
                            </div>
                            <div className={style.comparitive__block_row_flex}>
                                <h1>Rh</h1>
                                <select onChange={e=>setWomanRh(e.target.value)} className={style.comparitive__block_row_select}>
                                    <option value="I">I</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                </select>
                                <select onChange={e=>setWomanSymbol(e.target.value)} className={style.comparitive__block_row_select}>
                                    <option value="+">+</option>
                                    <option value="-">-</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className={style.head}>{text['result'][lang]}</h1>
                <p className={style.headers}>{text['conflict_text'][lang]}</p>
                <div className={style.compare_row}>
                    <div className={`${style.compare_block} ${symbol.color}_background`}>
                        <div className={style.compare_block_emoji}>
                            <Image priority width={48} height={48} alt="emoji" src="/emoji-small/dna.webp"/>
                        </div>
                        <div>
                            <p>{text['con'][lang]} - {text['rh'][lang]}</p>
                            <h4>{symbol.con}</h4>
                        </div>
                    </div>
                    <div className={`${style.compare_block} ${result.color}_background`}>
                        <div className={style.compare_block_emoji}>
                            <Image priority width={48} height={48} alt="emoji" src="/emoji-small/drop_of_blood.webp"/>
                        </div>
                        <div>
                            <p>{text['con'][lang]} - {text['gb'][lang]}</p>
                            <h4>{result.con}</h4>
                        </div>
                    </div>
                    <div className={`${style.compare_block} block_background`}>
                        <div className={style.compare_block_emoji}>
                            <Image priority width={48} height={48} alt="emoji" src="/emoji-small/baby.webp"/>
                        </div>
                        <div>
                            <p>{text['group_blood_child'][lang]}</p>
                            <h4>{result.child} ({symbol.child})</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

RhFactorInPregnancyPlanning.getInitialProps = async ({locale}) => {
    return { lang:locale };
  };

export default RhFactorInPregnancyPlanning;