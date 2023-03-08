/*jshint esversion: 6 */
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import soon from "/translate/seo_index";
import text from "/translate/constructor/acc/index_translate";
import nav_translate from "/translate/services/all_translate";
import NavbarApp from '/pages/navbar_app/nav';

const EducationIndex = ({lang}) => {
    return(
        <>
            <Head>
                <title>{nav_translate['education'][lang]} | Okki.kz</title>
                <meta property="og:title" content={`${nav_translate['education'][lang]} | Okki.kz`} />
                <meta name="description" content={text['seo_description'][lang]} />
            </Head>
            <NavbarApp lang={lang} to={[{key:'education',path:'last'}]}/>
            <div className="page_not_found">
                <div className="page_not_found_block">
                    <div className="page_not_found_block_img">
                        <Image priority width={200} height={200} src="/emoji/cowboy_hat_face.webp" alt="not found" />
                    </div>
                    <h1 className="page_not_found">{nav_translate['education'][lang]}</h1>
                    <p className="page_not_found">{soon['soon1'][lang]} {soon['soon2'][lang]}</p>
                    <Link prefetch={false} href="/" className="page_not_found">{soon['soon3'][lang]}</Link>
                </div>
            </div>
      </>
    );
};

EducationIndex.getInitialProps = async ({locale}) => {
    return { lang:locale };
};

export default EducationIndex;