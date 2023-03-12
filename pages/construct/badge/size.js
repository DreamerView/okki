/*jshint esversion: 6 */
/*jshint sub:true*/
import style from "../../../styles/constructor/acc/index.module.css";
import { useState,useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import translate from "/translate/constructor/acc/navbar_translate";
import ux from "/translate/ux/action";
import text from "/translate/constructor/acc/size_translate";
import NavbarApp from "/modules/navbar_app/nav";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const SizeAcc = ({lang}) => {
    const [select,setSelect] = useState(false);
    const [checked,setChecked] = useState('');
    const [result,setResult] = useState('Choose-origin');
    const [ss,setSS] = useState('Choose-origin');
    const [ss_ready,setSSReady] = useState('Choose-origin');
    const [cc,setCC] = useState(false);
    const [orient,setOrient] = useState();
    const [ready,setReady] = useState(false);
    const [width,setWidth] = useState('');
    const [height,setHeight] = useState('');
    const Check = (e) => {
        localStorage.setItem('orient_acc',e);
        setChecked(true);
        setOrient(e);
    };
    const Check1 = (e) => {
        localStorage.setItem('template_acc',e);
        if(e==='ready' || e==='selectable') {
            setCC(false);
            localStorage.removeItem('get_ss_acc');
            localStorage.removeItem('width_acc');
            localStorage.removeItem('height_acc');
            setWidth("");
            setHeight("");
            setReady(false);
            setSS('Choose-origin');
        }
    };
    const Check2 = (e) => {
        localStorage.setItem('get_ss_acc',e);
    };
    const Check3 = (e) => {
        localStorage.setItem('get_ss_acc','sm');
        switch(e){
            // Portrait
            case "6х9":localStorage.setItem('width_acc',6);localStorage.setItem('height_acc',9);break;
            case "7,4х10,5":localStorage.setItem('width_acc',7.4);localStorage.setItem('height_acc',10.5);break;
            case "8х10,6":localStorage.setItem('width_acc',8);localStorage.setItem('height_acc',10.6);break;
            case "8,1х12":localStorage.setItem('width_acc',8.1);localStorage.setItem('height_acc',12);break;
            case "9,7х14":localStorage.setItem('width_acc',9.7);localStorage.setItem('height_acc',14);break;
            case "10,5x15,1":localStorage.setItem('width_acc',10.5);localStorage.setItem('height_acc',15.1);break;
            case "11x15":localStorage.setItem('width_acc',11);localStorage.setItem('height_acc',15);break;
            case "11,1х12,7":localStorage.setItem('width_acc',11.1);localStorage.setItem('height_acc',12.7);break;
            // Album
            case "9х6":localStorage.setItem('width_acc',9);localStorage.setItem('height_acc',6);break;
            case "9х6,5":localStorage.setItem('width_acc',9);localStorage.setItem('height_acc',6.5);break;
            case "10х7,5":localStorage.setItem('width_acc',10);localStorage.setItem('height_acc',7.5);break;
            case "11,9х7,7":localStorage.setItem('width_acc',11.9);localStorage.setItem('height_acc',7.7);break;
            case "11,2х9,3":localStorage.setItem('width_acc',11.2);localStorage.setItem('height_acc',9.3);break;
            case "12х8,5":localStorage.setItem('width_acc',12);localStorage.setItem('height_acc',8.5);break;
            default: return 0;
        }
        localStorage.setItem('get_ss_ready_acc',e);
    };
    useEffect(() => {
        if(localStorage.getItem('orient_acc')) {
            setChecked(true);
            setOrient(localStorage.getItem('orient_acc'));
        }
        return () => {
            return 0;
        };
    }, []);
    useEffect(()=>{
        if(result==="selectable") {
            if(width>height) {
                localStorage.setItem('orient_acc','album');
                setOrient('album');
            } else if(width<height||width===height) {
                localStorage.setItem('orient_acc','book');
                setOrient('book');
            }
        }
        return () => {
            return 0;
        };
    },[width,height,result]);
    useEffect(()=>{
        if(localStorage.getItem('template_acc')) {
            setResult(localStorage.getItem('template_acc'));
            setCC(false);
        }
        if(localStorage.getItem('get_ss_acc')&&localStorage.getItem('template_acc')==='selectable') {
            setSS(localStorage.getItem('get_ss_acc'));
            setCC(true);
        }
        if(localStorage.getItem('get_ss_ready_acc')&&localStorage.getItem('template_acc')==='ready') {
            setSSReady(localStorage.getItem('get_ss_ready_acc'));
        }
        if(localStorage.getItem('width_acc')) {
            setWidth(localStorage.getItem('width_acc'));
        }
        if(localStorage.getItem('height_acc')) {
            setHeight(localStorage.getItem('height_acc'));
            setReady(true);
        }
        return () => {
            return 0;
        };
    },[]);
    useEffect(()=>{
        if(width!=='') localStorage.setItem('width_acc',width.replace(/,/g, "."));
        if(height!=='') localStorage.setItem('height_acc',height.replace(/,/g, "."));
        return () => {
            return 0;
        };
    },[width,height]);
    return(
    <>
            <Head>
                <title>{text['name'][lang]}</title>
            </Head>
            <NavbarApp lang={lang} to={[{key:'constructor',location:'/construct'},{key:'acc_const',location:'/construct/badge'},{text:translate['step2'][lang],location:'/construct/badge/logo'},{text:translate['step3'][lang],path:'last'}]}/>
            <div className="main">
                <h1>{text['name'][lang]}</h1>
                <p className="sub_content">{text['content'][lang]}</p>
                <div className={`${style.main__block_interface_menu} c-m block_animation`}>
                    <div className={style.main__block_interface_menu_c}>
                        <h1>{text['title'][lang]}</h1>
                    </div>

                    <div className={`${style.main__block_interface_menu_c} flex`} onChange={(event)=>Check(event.target.value)}>
                        <label className={style.main__block_i_l}>
                            <input type="radio" name="choice" value="book" id="bookChoice" defaultChecked={'book'===orient} />
                            <div className={`${style.main__block_interface_menu_c_book} ${style.choice_land}`}>
                                <div className={style.main__block_interface_menu_c_book_block}/>
                                <span>{text['book'][lang]}</span>
                            </div>
                        </label>
                        
                        <label className={style.main__block_i_l}>
                            <input type="radio" name="choice" value="album" id="albumChoice" defaultChecked={'album'===orient}  />
                            <div className={`${style.main__block_interface_menu_c_album} ${style.choice_land}`}>
                                <div className={style.main__block_interface_menu_c_album_block}/>
                                <span>{text['album'][lang]}</span>
                            </div>
                        </label>
                        
                    </div>
                    <div className={style.main__block_interface_menu_c}>
                    <div>
                    {checked?
                        <select defaultValue={result} onChange={(e)=>{setResult(e.target.value);Check1(e.target.value);setSelect(false);}} className={style.main__block_interface_menu_c_select} name="" id="">
                            <option value="Choose-origin" disabled>{text['template'][lang]}</option>
                            <option value="ready">{text['template_ready'][lang]}</option>
                            <option value="selectable">{text['template_custom'][lang]}</option>
                        </select>:''}
                    </div>
                        {result==='ready' && orient==='book'?
                        <select defaultValue={ss_ready} onChange={(e)=>{Check3(e.target.value);setReady(true);}} className={style.main__block_interface_menu_c_select} name="" id="">
                            <option value="Choose-origin" disabled>{text['ready'][lang]}</option>
                            <option value="6х9">{text['width'][lang]}: 6cm, {text['height'][lang]}: 9cm (6х9 cm)</option>
                            <option value="7,4х10,5">{text['width'][lang]}: 7,4cm, {text['height'][lang]}: 10,5cm (7,4х10,5 cm)</option>
                            <option value="8х10,6">{text['width'][lang]}: 8cm, {text['height'][lang]}: 10,6cm (8х10,6 cm)</option>
                            <option value="8,1х12">{text['width'][lang]}: 8,1cm, {text['height'][lang]}: 12cm (8,1х12 cm)</option>
                            <option value="9,7х14">{text['width'][lang]}: 9,7cm, {text['height'][lang]}: 14cm (9,7х14 cm)</option>
                            <option value="10,5x15,1">{text['width'][lang]}: 10,5cm, {text['height'][lang]}: 15,1cm (10,5x15,1 cm)</option>
                            <option value="11x15">{text['width'][lang]}: 11cm, {text['height'][lang]}: 15cm (11x15 cm)</option>
                            <option value="11,1х12,7">{text['width'][lang]}: 11,1cm, {text['height'][lang]}: 12,7cm (11,1х12,7 cm)</option>
                        </select>:''}
                        {result==='ready' && orient==='album'?
                        <select defaultValue={ss_ready} onChange={(e)=>{Check3(e.target.value);setReady(true);}} className={style.main__block_interface_menu_c_select} name="" id="">
                            <option value="Choose-origin" disabled>{text['ready'][lang]}</option>
                            <option value="9х6">{text['width'][lang]}: 9cm, {text['height'][lang]}: 6cm (9х6 cm)</option>
                            <option value="9х6,5">{text['width'][lang]}: 9cm, {text['height'][lang]}: 6,5cm (9х6,5 cm)</option>
                            <option value="10х7,5">{text['width'][lang]}: 10cm, {text['height'][lang]}: 7,5cm (10х7,5 cm)</option>
                            <option value="11,9х7,7">{text['width'][lang]}: 11,9cm, {text['height'][lang]}: 7,7cm (11,9х7,7 cm)</option>
                            <option value="11,2х9,3">{text['width'][lang]}: 11,2cm, {text['height'][lang]}: 9,3cm (11,2х9,3 cm)</option>
                            <option value="12х8,5">{text['width'][lang]}: 12cm, {text['height'][lang]}: 8,5cm (12х8,5 cm)</option>
                        </select>:''}
                        {result==='selectable'?
                        <select defaultValue={ss} onChange={(e)=>{setSelect(true);Check2(e.target.value)}} className={style.main__block_interface_menu_c_select} name="" id="">
                            <option value="Choose-origin" disabled>{text['selectable'][lang]}</option>
                            <option value="sm">{text['selectable_sm'][lang]}</option>
                            <option value="dm">{text['selectable_dm'][lang]}</option>
                            <option value="px">{text['selectable_pix'][lang]}</option>
                        </select>:''}
                        {!result==='ready'||(select||cc)?<>
                            <div className={`${style.main__block_interface_menu_c_s} flex`}>
                                <input className={style.main__block_interface_menu_c_s_i} onChange={(e)=>{setWidth((v) => (e.target.validity.valid ? e.target.value : v))}} placeholder={text['enter_width'][lang]} value={width} type="tel" pattern="[0-9,.]*" name="" id="" />
                                <span className={style.main__block_interface_menu_c_s_t}>{text['width'][lang]}</span>
                            </div>
                            <div className={`${style.main__block_interface_menu_c_s} flex`}>
                                <input className={style.main__block_interface_menu_c_s_i} onChange={(e)=>{setHeight((v) => (e.target.validity.valid ? e.target.value : v));setReady(true);}} placeholder={text['enter_height'][lang]} value={height} type="tel" pattern="[0-9,.]*" name="" id="" />
                                <span className={style.main__block_interface_menu_c_s_t}>{text['height'][lang]}</span>
                            </div>
                        </>:''}

                    </div>
                    
                </div>
            </div>
            <div className={style.main__block_fixed_confirm}>
                <div className={`${style.main__block_interface_menu_c_end} flex`}>
                            <Link href="/construct/badge/logo" prefetch={false} className={style.main__block_interface_btn_back}>{ux['back'][lang]}</Link>
                            {!ready ? <button className={style.main__block_interface_btn_forward}>{ux['continue'][lang]}</button>: <Link href="/construct/badge/info" prefetch={false} className={style.main__block_interface_btn_forward}>{ux['continue'][lang]}</Link>}    
                </div>
            </div>
    </>
    );
}
export default SizeAcc;