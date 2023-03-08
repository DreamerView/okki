/*jshint esversion: 6 */
/*jshint esversion: 9 */
/*jshint sub:true*/
import style from "/styles/constructor/acc/index.module.css";
import { useState,useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import text from "/translate/constructor/acc/info_block_translate";

const InfoBlock = (result) => {
    const lang = result.lang;
    const send = useDispatch();
    const getcrop = useSelector(state=>state.getcrop);
    const [logo,setLogo] = useState("/img/man.webp");
    const [info,setInfo] = useState(result?result.item:{});
    useEffect(()=>{
        return result.item.avatar?setLogo(result.item.avatar):setLogo("/img/man.webp");
    },[result])
    const CheckAvatar = (e) => {
        const i = document.createElement('img');
        i.src = e;
        i.onload = () => {
            const canvas = document.createElement('canvas');
            const maxWidth = 300;
            const scaleSize = maxWidth / i.width;
            canvas.width = maxWidth;
            canvas.height = i.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(i,0,0,canvas.width,canvas.height);
            const srcEnc = ctx.canvas.toDataURL("image/webp");
            setInfo({...info,avatar:srcEnc});
            setLogo(srcEnc);
        };
    };
    if(getcrop) {if(getcrop.id===result.item.id) CheckAvatar(getcrop.image);}
    useEffect(()=>{
        return info !==''&&result.change({info});
    },[info]); // eslint-disable-line react-hooks/exhaustive-deps
    return(
        <div className={`${style.main__block_interface_menu} c-m ${result.action}`}>
                    <div className={style.main__block_menu_close}>
                        <svg onClick={()=>{result.remove(result.item)}} id="close" xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26">
                            <path id="Контур_24" data-name="Контур 24" d="M0,0H26V26H0Z" fill="none" />
                            <path id="Контур_25" data-name="Контур 25" d="M20.256,5.756a1.147,1.147,0,0,0-1.624,0L13,11.376,7.368,5.744A1.148,1.148,0,0,0,5.744,7.368L11.376,13,5.744,18.632a1.148,1.148,0,0,0,1.624,1.624L13,14.624l5.632,5.632a1.148,1.148,0,0,0,1.624-1.624L14.624,13l5.632-5.632A1.154,1.154,0,0,0,20.256,5.756Z" transform="translate(0 0)" fill="#aaa" />
                        </svg>
                    </div>
                    <div className={style.main__block_interface_menu_c}>
                        <h1>{text['title'][lang]}</h1>
                    </div>
                    <div className={style.main__block_interface_menu_c_info_block}>
                        <div className={style.main__block_interface_menu_c_info_block_avatar}>
                            <label className={style.main__block_interface_menu_logo_icon}>
                                <div className={style.main__block_interface_menu_logo_icon_pic}>
                                    <Image width={46} height={46} loading="lazy" className={style.main__block_interface_menu_logo_icon_img} src={"/img/add_a_photo.svg" } alt="icon" />
                                </div>
                            </label>
                            <input className={style.main__block_interface_menu_logo_icon_img_hide} name="logoPreview" accept="image/*" type='file' onChange={(event)=>{send({type:"setCropImage",set:{id:result.item.id,image:URL.createObjectURL(event.target.files[0])}});}} />
                            <Image width={135} height={135} loading="lazy" className={style.main__block_interface_menu_logo_img} src={logo} alt="logo" placeholder="blur" blurDataURL={logo} />
                            <p className="sub_content">{text['choose_image'][lang]}</p>
                        </div>
                        <div className={style.main__block_interface_menu_c_info_block_text}>
                            <div className={`${style.main__block_interface_menu_c_s} flex`}>
                                <input className={style.main__block_interface_menu_c_s_i} placeholder={text['type_name'][lang]} value={info?info.name||'':""} onChange={(e)=>{setInfo({...info,name:e.target.value})}} type="text" />
                                <span className={style.main__block_interface_menu_c_s_t}>{text['name'][lang]}</span>
                            </div>
                            <div className={`${style.main__block_interface_menu_c_s} flex`}>
                                <input className={style.main__block_interface_menu_c_s_i} placeholder={text['type_surname'][lang]} value={info?info.surname||"":""} onChange={(e)=>{setInfo({...info,surname:e.target.value})}} type="text" />
                                <span className={style.main__block_interface_menu_c_s_t}>{text['surname'][lang]}</span>
                            </div>
                            <div className={`${style.main__block_interface_menu_c_s} flex`}>
                                <input className={style.main__block_interface_menu_c_s_i} placeholder={text['not_need'][lang]} value={info?info.status||"":""} onChange={(e)=>{setInfo({...info,status:e.target.value})}} type="text" />
                                <span className={style.main__block_interface_menu_c_s_t}>{text['status'][lang]}</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.main__block_interface_menu_c_end}>
                        <div >
                            <span className={style.logo}>{text['complete'][lang]}</span>
                        </div>
                    </div>
                </div>
    )
}

export default InfoBlock;