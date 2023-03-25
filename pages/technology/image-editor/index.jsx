import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/technology/image-editor/index.module.css";
import { useState,useRef,useEffect } from "react";
import Image from "next/image";
export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const ImageEditor = ({lang}) => {
    const imageEditor = useRef();
    const [range,setRange] = useState({
        blur:0,
        brightness:0,
        contrast:0,
        grayscale:0,
        hue:0,
        invert:0,
        saturate:0,
        sepia:0
    });
    useEffect(()=>{
        imageEditor.current.style.filter = `blur(${range.blur}px)`;
    },[range])
    return(
        <>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app">
            <div className="main_block_row">
                <div className={style.image_block}>
                    <Image ref={imageEditor} className={style.check} src="/img/editor.jpg" width={600} height={400} alt="editor" />
                </div>
                <div className={style.editor_block}>
                    <div className={`${style.editor_block_button} anim_hover`}>
                        <div className={style.editor_block_button_icon}>
                            <Image src="/img/blur.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Blur</h6>
                    </div>
                    <div className={`${style.editor_block_button} anim_hover`}>
                        <div className={style.editor_block_button_icon}>
                            <Image src="/img/brightness.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Brightness</h6>
                    </div>
                    <div className={`${style.editor_block_button} anim_hover`}>
                        <div className={style.editor_block_button_icon}>
                            <Image src="/img/contrast.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Contrast</h6>
                    </div>
                    <div className={`${style.editor_block_button} anim_hover`}>
                        <div className={style.editor_block_button_icon}>
                            <Image src="/img/contrast.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Grayscale</h6>
                    </div>
                    <div className={`${style.editor_block_button} anim_hover`}>
                        <div className={style.editor_block_button_icon}>
                            <Image src="/img/hue.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Hue-rotate</h6>
                    </div>
                    <div className={`${style.editor_block_button} anim_hover`}>
                        <div className={style.editor_block_button_icon}>
                            <Image src="/img/hue.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Invert</h6>
                    </div>
                    <div className={`${style.editor_block_button} anim_hover`}>
                        <div className={style.editor_block_button_icon}>
                            <Image src="/img/saturate.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Saturate</h6>
                    </div>
                    <div className={`${style.editor_block_button} anim_hover`}>
                        <div className={style.editor_block_button_icon}>
                            <Image src="/img/sepia.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Sepia</h6>
                    </div>
                </div>
                <div className={style.editor}>
                    <label for="cowbell">Blur</label>
                    <input onChange={(e)=>setRange({...range,blur:e.target.value-100})} id="cowbell" type="range" defaultValue="100" min="0" max="200"/>
                    <input type="tel" value={range.blur} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, ""))}} />
                </div>
            </div>
        </div>
        </>
    );
};

export default ImageEditor;