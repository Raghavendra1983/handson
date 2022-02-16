import { makeAutoObservable, makeObservable } from "mobx";

import React, { Component } from 'react'
import { User } from "types/AuthTypes";

type Props = {}

type State = {}

export class AuthStore {
  private user: User | undefined = undefined;
  private authenticated = false;

  constructor(private readonly user1: User) {
    makeAutoObservable(this);
  }
  private setUser(user: User) {
    this.user = user;
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


}

export default AuthStore;