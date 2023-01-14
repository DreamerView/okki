/*jshint esversion: 6 */
/*jshint sub:true*/
import style from "/styles/constructor/acc/index.module.css";
import {useEffect, useState} from "react";
import Link from 'next/link';
import Head from "next/head";
import Image from "next/image";
import ux from "/translate/ux/action";
import translate from "/translate/constructor/acc/navbar_translate";
import text from "/translate/constructor/acc/logo_translate";
import NavbarApp from '/pages/navbar_app/nav';

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const LogoAcc = ({lang}) => {
    const [logo,setLogo] = useState("/img/logo_round.svg");
    const [c,setC] = useState({logo:'logo',text:text['desc'][lang],div:''});
    const [ready,setReady] = useState(false);
    const CheckLogo = (event) => {
        let reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onloadend = () => {
            const i = document.createElement('img');
            i.src = reader.result;
            i.onload = () => {
                const canvas = document.createElement('canvas');
                const maxWidth = 300;
                const scaleSize = maxWidth / i.width;
                canvas.width = maxWidth;
                canvas.height = i.height * scaleSize;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(i,0,0,canvas.width,canvas.height);
                const srcEnc = ctx.canvas.toDataURL("image/webp");
                localStorage.setItem('logo_acc',srcEnc);
                setLogo(srcEnc);
                setC({logo:'logo_s',text:text['complete'][lang],div:'alerts_g'});
            };
        };
    };
    useEffect(()=>{
        if(localStorage.getItem('logo_acc')) {
            setLogo(localStorage.getItem('logo_acc'));
            setReady(true);
            setC({logo:'logo_s',text:text['complete'][lang],div:'alerts_g'});
        }
        return () => {
            return 0;
        }
    },[lang]);
    return(
        <>
            <Head>
                <title>{text['name'][lang]}</title>
            </Head>
            <NavbarApp lang={lang} to={[{key:'constructor',location:'/constructor'},{key:'acc_const',location:'/constructor/acc'},{text:translate['step2'][lang],path:'last'}]}/>
            <div className="main">
                <h1>{text['name'][lang]}</h1>
                <p className="sub_content">{text['content'][lang]}</p>
                <div className={`${style.main__block_interface_menu} c-m block_animation`} onClick={()=>{}}>
                    <div className={style.main__block_interface_menu_c}>
                        <h1>{text['title'][lang]}</h1>
                    </div>
                    <div className={style.main__block_interface_menu_c_logo}>
                        <label htmlFor="logoPreview">
                            <div className={style.main__block_interface_menu_logo_icon_pic}>
                                <Image width={46} height={46} loading="lazy" className={style.main__block_interface_menu_logo_icon_img} src={"/img/add_a_photo.svg" } alt="icon" />
                            </div>
                        </label>
                        <input style={{display:'none'}} name="logoPreview" id="logoPreview" accept="image/*" type='file' onChange={(event)=>{CheckLogo(event.target.files[0]);setReady(true)}} />
                       
                            <Image width={135} height={135} loading="lazy" className={style.main__block_interface_menu_logo_img} src={logo} alt="logo" placeholder="blur" blurDataURL={logo} />
                        
                    </div>
                    <div className={style.main__block_interface_menu_c_end}>
                        <div className={c.div}>
                            <span className={c.logo}>{c.text}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.main__block_fixed_confirm}>
                <div className={`${style.main__block_interface_menu_c_end} flex`}>
                            <Link href="/constructor/acc/size" prefetch={false} className={style.main__block_interface_btn_back}>{ux['skip'][lang]}</Link>
                            {!ready ? <button className={style.main__block_interface_btn_forward}>{ux['continue'][lang]}</button>: <Link href="/constructor/acc/size" prefetch={false} className={style.main__block_interface_btn_forward}>{ux['continue'][lang]}</Link>}    
                </div>
            </div>
        </>
    );
}

export default LogoAcc;