import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {Router} from "@angular/router";

import { User } from "../_modules/user";

@Component({
  selector: 'app-login',
  template: `<form (ngSubmit)="login()"
          [formGroup]="form">
      <label>Email</label>
      <input type="email"
             formControlName="email">
      <label>Password</label>
      <input type="password"
             formControlName="password">
      <button type="submit">Login</button>
    </form>`
})

export class LoginComponent {
  @Output() loggedIn = new EventEmitter<User>();
  form: FormGroup;
  currentUser: null;

  constructor(
      private fb: FormBuilder,
      private router: Router) {
    this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    if (this.currentUser) {
      this.router.navigate(['home']);
    }
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  login() {
    console.log(`Login ${this.form.value}`);
    if (!this.form.valid) {
      return;
    }
    const { email, password } = this.form.value;
    const user = new User(email, password);
    this.loggedIn.emit(user);

    localStorage.setItem('currentUser', JSON.stringify({ email }));
    this.router.navigate(['home']);
  }
}