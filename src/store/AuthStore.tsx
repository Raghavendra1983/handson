import { FormikHelpers } from "formik";
import { makeAutoObservable, makeObservable } from "mobx";
import { useNavigate } from "react-router-dom";

import React, { Component } from 'react'

import { LoginInitValuesType, User } from "types/AuthTypes";
import axiosInstance from "../../utils/axios";
import RootStore from "store";

type Props = {}

type State = {}

export class AuthStore {
  private user: String | undefined = undefined;
  private authenticated = false;
  private accessToken: string = '';
  private navigate = useNavigate();
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
  private setUser(user: String) {
    this.user = user;
  }
  private setAccessToken(token: string) {
    this.accessToken = token;
  }
  private setAuthenticated(val: boolean) {
    this.authenticated = val;
  }
  getAuthenticated() {
    return this.authenticated;
  }
  public getUser() {
    return this.user;
  }
  doLogin = async (values: LoginInitValuesType, actions: FormikHelpers<LoginInitValuesType>,) => {
    try {
      const res = await axiosInstance.post('login', values);
      const user = JSON.stringify(res.data.user);
      console.log('response', user);
      this.setAuthenticated(true);

      this.setUser(user);
      this.navigate('/home');
    }
    catch (error) {
      let message = "Something wrong. Check your network";
      actions.setErrors({ serverError: message })
    }
  }
  doRegister = async (values: LoginInitValuesType, actions: FormikHelpers<LoginInitValuesType>) => {
    try {
      const res = await axiosInstance.post('register', values);
      const user = JSON.stringify(res.data.user);
      this.setAuthenticated(true);
      this.setUser(user);
      this.navigate('/home');
    }
    catch (error) {
      let message = "Something wrong. Check your network";
      actions.setErrors({ serverError: message })
    }
  }
}


export default AuthStore;