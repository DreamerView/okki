/*jshint esversion: 6 */
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import translate from "/translate/ux/404_translate";

export const getStaticProps = async ({locale}) => {
    return {props:{locale:locale}};
};

const NotFound = ({locale}) => {
    return(
        <>
            <Head>
                <title>{translate['title'][locale]}</title>
                <meta property="og:title" content={`${translate['title'][locale]} | Okki.kz`} />
            </Head>
            <div className="page_not_found">
                <div className="page_not_found_block">
                    <div className="page_not_found_block_pic">
                        <Image priority width={256} height={256} src="/img/404.webp" alt="not found" />
                    </div>
                    <h1 className="page_not_found">{translate['name'][locale]}</h1>
                    <p className="page_not_found">{translate['content'][locale]}</p>
                    <Link prefetch={false} href="/" className="page_not_found">{translate['button'][locale]}</Link>
                </div>
            </div>
        </>
    )
};

export default NotFound;
