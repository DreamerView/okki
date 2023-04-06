/*jshint esversion: 6 */
import dynamic from "next/dynamic";
import AppStorePreloader from "@/modules/app_store/apps_preloader";
const AppStore =  dynamic(()=>import("@/modules/app_store/apps"),{loading: AppStorePreloader});
const AppList =  dynamic(()=>import("@/modules/app_store/app_list"),{loading: AppStorePreloader});
const SubAppStore =  dynamic(()=>import("@/modules/app_store/subApps"),{loading: AppStorePreloader});
const SubAppList =  dynamic(()=>import("@/modules/app_store/subAppList"),{loading: AppStorePreloader});
import Image from "next/image";
import translate from "@/translate/index_translate";
import all from '@/start/services/subCategory.json';

const IndexContent = ({lang}) => {
  return(
        <div className="main">
          <div className="main_block_row">
            <h1 className="flex_text">{translate!==undefined&&translate['popular'][lang]} <div className="emoji_h1"><Image title={`Microsoft fire emoji (Used for informational purposes only)`} priority src={"/emoji-small/fire.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate!==undefined&&translate['popular_subtext'][lang]}</p>
            <AppList lang={lang} />
            <h1>{translate!==undefined&&translate['try_use'][lang]}</h1>
              <AppStore lang={lang}/>
              {/* <SubAppList lang={lang} category={"pregnancy"} />
              <SubAppList lang={lang} category={"health_life"} /> */}
              {/* {all!==undefined&&all.map((e,index)=>
              <SubAppStore key={index} lang={lang} category={e.name} />)} */}
              {all!==undefined&&all.map((e,index)=>
              index%2===0?<SubAppList key={index} lang={lang} category={e.name} />:<SubAppStore key={index} lang={lang} category={e.name} />)}
          </div>
      </div>
  )
};
export default IndexContent;