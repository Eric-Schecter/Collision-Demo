import { useDispatch } from "react-redux";
import { useCallback } from "react";

export const useUpdateReducer = (update:(arg:any)=>void) => {
  const dispatch = useDispatch();
  const updateCreateOpt = useCallback((v) => dispatch(update(v)), [dispatch,update]);
  return updateCreateOpt;
} 