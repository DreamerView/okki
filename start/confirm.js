/*jshint esversion: 6 */
import { memo } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const ConfirmMode = ({item}) => {
    const send = useDispatch(),
    SaveLanguage = (e) => document.cookie = `NEXT_LOCALE=${e}; expires=Fri, 31 Dec 9999 23:59:59 GMT`,
    router = useRouter();
    return(
        <div className="confirm__back">
                <div className="confirm__block basic_animation">
                    <h3>
                        {item.name}
                    </h3>
                    <p className="sm">
                        {item.content}
                    </p>
                    {item.type === 'delete'&&
                    <div className="confirm__block_action_2">
                        <div>
                            <button onClick={()=>{send({type:"SetConfirm",set:false});send({type:"SetAction",set:false})}} className="confirm_custom">{item.text.cancel}</button>
                        </div>
                        <div>
                            <button onClick={()=>{send({type:"SetConfirm",set:true});send({type:"SetAction",set:false});}} className={`confirm_custom_a ${item.text.accept_color}`}>{item.text.accept}</button>
                        </div>
                    </div>}
                    {item.type === 'language'&&
                    <div className="confirm__block_action">
                        <div onClick={()=>{SaveLanguage('kk');router.push(router.asPath, router.asPath, { locale: 'kk' })}}>
                            <span className="confirm__block_action_row">Қазақша 🇰🇿</span>
                        </div>
                        <div onClick={()=>{SaveLanguage('kk');router.push(router.asPath, router.asPath, { locale: 'ru' })}}>
                            <span className="confirm__block_action_row">Русский 🇷🇺</span>
                        </div>
                        <div onClick={()=>{SaveLanguage('en');router.push(router.asPath, router.asPath, { locale: 'en' })}}>
                            <span className="confirm__block_action_row">English 🇬🇧</span>
                        </div>
                    </div>}
                </div>
            </div>
    );
};
export default memo(ConfirmMode);