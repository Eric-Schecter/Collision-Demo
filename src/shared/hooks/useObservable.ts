import { useEffect, useState, RefObject } from 'react';
import { Observable, fromEvent, EMPTY } from 'rxjs';

export const useObservable = (ref: RefObject<HTMLElement | Window>, event: string) => {
  const [subject$, setSubject$] = useState<Observable<any>>(EMPTY);
  useEffect(() => {
    if (!ref.current) { return; }
    setSubject$(fromEvent<any>(ref.current, event, { passive: true }));
  }, [ref, event])
  return subject$;
}