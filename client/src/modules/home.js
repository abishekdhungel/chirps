
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {Users} from '../resources/data/users';



@inject(Router, AuthService, Users)
export class Home {
  constructor(router, auth, users) {
    this.router = router;
    this.auth = auth;
    this.users = users;
    this.message = 'Chirps';
    this.showLogon = true;
  }

  login() {
    return this.auth.login(this.email, this.password)
      .then(response => {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        this.loginError = "";
        this.router.navigate('wall');
      })
      .catch(error => {
        console.log(error);
        this.loginError = "Invalid credentials.";
      });
  };

  //save a user
  async save() {
    var user = {
      fname: this.firstName,
      lname: this.lastName,
      email: this.email,
      screenName: this.screenName,
      Password: this.password
    }
    let serverResponse = await this.users.save(user);
    if (!serverResponse.error) {
      this.registerError = "";
      this.showLogon = true;
    } else {
      this.registerError = "There was a problem registering the user."
    }
  };

  showRegister() {
    this.showLogon = !this.showLogon;
  }



}
