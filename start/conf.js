/*jshint esversion: 6 */
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

const useConfirm = (res) => {
    const dis = useDispatch();
    const result = useSelector(state=>state.confirm);

    useEffect(() => {
        if(res) dis({type:"SetAction",set:{name:res.name,content:res.content,type:res.type,text:{cancel:res.cancel,accept_color:res.accept_color,accept:res.accept}}});
        return () => {
            return false;
        };
    }, [res,dis]);

   return [result];
};

export default useConfirm;