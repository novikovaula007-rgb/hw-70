import type {AppDispatch, RootState} from "./app/store.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
