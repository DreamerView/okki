/*jshint esversion: 6 */
import dynamic from "next/dynamic";
import AppStorePreloader from "@/modules/app_store/apps_preloader";
const AppStore =  dynamic(()=>import("@/modules/app_store/apps"),{loading: AppStorePreloader});
const AppList = dynamic(()=>import("@/modules/app_store/app_list"),{loading: AppStorePreloader});
const ShowComponent = dynamic(()=>import("@/modules/showComponent"),{ssr:false});
import Image from "next/image";
import translate from "@/translate/index_translate.json";


const IndexContent = ({lang,service,ux}) => {
  const text = (result) => translate.find(e=>e.name===result)[lang];
  return(
        <div className="main">
          <div className="main_block_row">
            <h1 className="flex_text">{text("popular")} <div className="emoji_h1"><Image title={`Microsoft fire emoji (Used for informational purposes only)`} priority src={"/emoji-small/fire.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{text("popular_subtext")}</p>
              <AppList lang={lang} service={service} ux={ux} />
              <h1>{text("try_use")}</h1>
              <AppStore lang={lang} ux={ux} service={service} />
              <ShowComponent lang={lang} ux={ux} service={service} />
          </div>
      </div>
  )
};
export default IndexContent;