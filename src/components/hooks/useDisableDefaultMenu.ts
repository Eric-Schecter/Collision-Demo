import {useEffect, RefObject} from 'react';

export const useDisableDefaultMenu = (ref:RefObject<HTMLElement>) =>{
  useEffect(()=>{
    if(ref.current){
      const disableDefaultMenu = (e:Event) => e.preventDefault();
      window.addEventListener('contextmenu',disableDefaultMenu);
    }
  },[ref])
}