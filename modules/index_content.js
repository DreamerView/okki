/*jshint esversion: 6 */
import dynamic from "next/dynamic";
import AppStorePreloader from "/modules/app_store/apps_preloader";
const AppStore =  dynamic(()=>import("/modules/app_store/apps"),{loading: AppStorePreloader});
import AppList from "@/modules/app_store/app_list";
import Image from "next/image";
import translate from "/translate/index_translate";

const IndexContent = ({lang,service}) => {
  const serv = service!==undefined?service:[{}];
  return(
        <div className="main">
          <div className="main_block_row">
            <h1 className="flex_text">{translate!==undefined&&translate['popular'][lang]} <div className="emoji_h1"><Image title={`Microsoft fire emoji (Used for informational purposes only)`} priority src={"/emoji-small/fire.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate!==undefined&&translate['popular_subtext'][lang]}</p>
            <AppList list={serv} lang={lang} />
            {/* <hr/> */}
            <h1>{translate!==undefined&&translate['try_use'][lang]}</h1>
              <AppStore serv={serv} lang={lang}/>
          </div>
      </div>
  )
};
export default IndexContent;