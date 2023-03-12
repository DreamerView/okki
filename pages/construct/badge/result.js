/*jshint esversion: 6 */
import style from "/styles/constructor/acc/index.module.css";
import Head from "next/head";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Image from "next/image";
import translate from "/translate/constructor/acc/navbar_translate";
import ux from "/translate/ux/action";
import text from "/translate/constructor/acc/result_translate";
import NavbarApp from "/modules/navbar_app/nav";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const ResultAcc = ({lang}) => {
    const send = useDispatch();
    return(
        <>
            <Head>
                <title>{text['name'][lang]}</title>
            </Head>
            <NavbarApp lang={lang} to={[{key:'constructor',location:'/construct'},{key:'acc_const',location:'/construct/badge'},{text:translate['step2'][lang],location:'/construct/badge/logo'},{text:translate['step3'][lang],location:'/construct/badge/size'},{text:translate['step4'][lang],location:'/construct/badge/info'},{text:translate['step5'][lang],path:'last'}]}/>
            <div className="main">
                <h1>{text['name'][lang]}</h1>
                <p className="sub_content">{text['content'][lang]}</p>
                <div className={`${style.main__block_interface_menu} c-m block_animation`}>
                    <div className={style.main__block_interface_menu_c}>
                        <h1>{text['title'][lang]}</h1>
                        <p className="sub_content">{text['desc'][lang]}</p>
                        <div className={`fullscreen__result_block blue_background`} onClick={()=>{send({type:"setFullFrame",set:true});send({type:"setUrlFrame",set:"/service-app/badge-constructor/convert.html"});}}>
                            <div className={`fullscreen__result_button`}><Image src={'/img/fullscreen.svg'} width={22} height={22} alt="icon"/></div>
                            <p className={`small`}>{ux['fullframe_open'][lang]}</p>
                        </div>
                    </div>
                    <iframe id="frame" title="converter result" src={"/service-app/badge-constructor/convert.html"}>
                        Your browser does not support floating frames!
                    </iframe>
                </div>
            </div>
            <div className={style.main__block_fixed_confirm}>
                <div className={`${style.main__block_interface_menu_c_end} flex`}>
                            <Link href="/construct/badge/info" prefetch={false} className={style.main__block_interface_btn_back}>{ux['back'][lang]}</Link>
                            <Link href="/" prefetch={false} className={style.main__block_interface_btn_forward}>{ux['home'][lang]}</Link>
                </div>
            </div>
        </>
    );
};

export default ResultAcc;