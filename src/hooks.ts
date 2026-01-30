import type {AppDispatch, RootState} from "./app/store.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
