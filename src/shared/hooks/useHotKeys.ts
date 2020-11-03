import { useEffect } from "react";
import { merge, combineLatest, Observable } from "rxjs";
import { filter, distinctUntilChanged } from "rxjs/operators";

export const useHotKeys = (
  keydowns$: Observable<KeyboardEvent>,
  keyups$: Observable<KeyboardEvent>,
  hotKeys: number[],
  action: () => void,
) => {
  useEffect(() => {
    if (!keydowns$ || !keyups$) { return; }
    const judge = (v: number) => merge(keydowns$, keyups$)
      .pipe(
        filter(val => val.keyCode === v),
        distinctUntilChanged((pre, curr) => pre.keyCode === curr.keyCode && pre.type === curr.type),
      )

    const subject$ = combineLatest(
      hotKeys.map(judge)
    )
      .pipe(
        filter(arr => arr.every(v => v.type === 'keydown')),
      )
      .subscribe(action)

    return () => subject$.unsubscribe();
  }, [keydowns$, keyups$, hotKeys, action]);
}