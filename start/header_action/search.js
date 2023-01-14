/*jshint esversion: 6 */
import { useState,useEffect,useRef,memo } from 'react';
import SearchResult from "/start/services/all.json";

const Search = (res) => {
    const focus = useRef();
    const [search,setSearch] = useState('');
    useEffect(()=>{
        res.change(SearchResult.filter((e)=>{
          if(search === '') return 0;
          else if(e.key.toLowerCase().includes(search.toLowerCase())) return e;
        }));
        return () => {
          return 0;
        };
      },[search]);
      useEffect(()=>{
          focus.current.addEventListener('focus',()=>{
            return res.accept(true);
          });
          focus.current.addEventListener('blur',()=>{
            return res.accept(false);
          });
          return () => {
            return 0;
          };
      },[focus]);
      
      useEffect(()=>{
        focus.current.value = res.list;
        return setSearch((prev)=>prev=res.list);
      },[res.list]);
    return (
        <>
            <input aria-haspopup="false" 
                autoCapitalize="off" 
                autoComplete="off" 
                autoCorrect="off" 
                role="combobox" 
                spellCheck="false"  ref={focus} placeholder={res.text} title={res.text} className="header__search_input" onChange={(e)=>setSearch(e.target.value)}  type="text" />
        </>
    )
};
export default memo(Search);