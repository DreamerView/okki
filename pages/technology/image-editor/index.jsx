import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/technology/image-editor/index.module.css";
import { useState } from "react";
export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const ImageEditor = ({lang}) => {
    const [range,setRange] = useState();
    return(
        <>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app">
            <div className="main_block_row">
                <div className={style.image_block}>

                </div>
                <div className={style.editor_block}>
                    <div className={style.editor_block_button}>
                        <div className={style.editor_block_button_icon}></div>
                        <h6>Blur</h6>
                    </div>
                    <div className={style.editor_block_button}>
                        <div className={style.editor_block_button_icon}></div>
                        <h6>Brightness</h6>
                    </div>
                    <div className={style.editor_block_button}>
                        <div className={style.editor_block_button_icon}></div>
                        <h6>Contrast</h6>
                    </div>
                    <div className={style.editor_block_button}>
                        <div className={style.editor_block_button_icon}></div>
                        <h6>Grayscale</h6>
                    </div>
                    <div className={style.editor_block_button}>
                        <div className={style.editor_block_button_icon}></div>
                        <h6>Hue-rotate</h6>
                    </div>
                    <div className={style.editor_block_button}>
                        <div className={style.editor_block_button_icon}></div>
                        <h6>Invert</h6>
                    </div>
                    <div className={style.editor_block_button}>
                        <div className={style.editor_block_button_icon}></div>
                        <h6>Saturate</h6>
                    </div>
                    <div className={style.editor_block_button}>
                        <div className={style.editor_block_button_icon}></div>
                        <h6>Sepia</h6>
                    </div>
                </div>
                <div className={style.editor}>
                    <input id="cowbell" type="range" defaultValue="100" min="0" max="200"/>
                    <label for="cowbell">Cowbell</label>
                </div>
            </div>
        </div>
        </>
    );
};

export default ImageEditor;