import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  template: `Hi {{ email }}`
})
export class HomeComponent {
    email = 'User';
    currentUser = null
    constructor(private router: Router) {
        this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
        
    }

    ngOnInit() {
        if (!this.currentUser) {
          return this.router.navigate(['login']);
        }
        this.email = this.currentUser.email;
    }
}