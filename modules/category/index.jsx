import dynamic from "next/dynamic";
import Image from "next/image";
import translate from "@/translate/constructor/acc/navbar_translate";
import nav_translate from "@/translate/services/all_translate";
import NavPreloader from "@/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('@/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import AppStorePreloader from "@/modules/app_store/apps_preloader";
const AppStore =  dynamic(()=>import("@/modules/app_store/apps"),{loading: AppStorePreloader});
const AppList =  dynamic(()=>import("@/modules/app_store/app_list"),{loading: AppStorePreloader});
import { memo } from "react";

const CategoryComponent = ({name,lang}) => {
    const historyAction = (service) => {
        const history = JSON.parse(localStorage.getItem('historyAction'));
        const action = history?history:[];
        const checkExp = [...action,{name:service,time:Date.now()}];
        const key = 'name';
        const historyResult = [...new Map(checkExp.map(item =>[item[key], item])).values()];
        localStorage.setItem('historyAction',JSON.stringify(historyResult))
    };
    return(
    <>
        <NavbarApp lang={lang} to={{href:"/"}} choice="alone"/>
        <div className="main_app ">
            <h1 className="flex_text">{nav_translate[name][lang]} <div className="emoji_h1"><Image title={'Microsoft laptop emoji (Used for informational purposes only)'} priority src={`/category/${name}.webp`} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate["step0_description"][lang]}</p>
            <AppList lang={lang} category={"category"} search={name} />
            <AppStore category={name} lang={lang} />
        </div>    
    </>
    );
};

export default memo(CategoryComponent);