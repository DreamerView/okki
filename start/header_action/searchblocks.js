/*jshint esversion: 6 */
import translate from "/translate/services/all_translate";
import type_translate from "/translate/services/type_translate";
import style from '/styles/search_block.module.css';
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const SearchBlocks = (res) => {
    const locale = res.lang;
    return(
        <>
            <Link href={res.item.location} prefetch={false} >
            <div className={`${style.search__block} basic_animation`} onClick={()=>res.send(translate[res.item.name][locale])}>
                {res.item.type==='category'?
                <div>
                <div className={`${style.search__block_image} ${res.item.image_background}`}>
                    <div className={style.search__block_pic}>
                        <Image priority width={26} height={26} alt="category" src={res.item.image}/>
                    </div>
                </div></div>:
                    <div><div className={`${style.search__block_image_s}`}>
                        <Image priority width={38} height={38} alt="application" className={`${style.search__block_image_i}`} src={res.item.image}/>
                    </div></div>
                }
                <div className={style.search__block_content}>
                    <h5 className={style.search}>{translate[res.item.name][locale]}</h5>
                    <p className={style.smaller}>{type_translate[res.item.type][locale]}</p>
                </div>
            </div>
            </Link>
        </>
    )
};
export default memo(SearchBlocks);