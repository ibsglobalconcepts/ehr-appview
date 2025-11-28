// src/store/hooks.js
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import store from "./store";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);
