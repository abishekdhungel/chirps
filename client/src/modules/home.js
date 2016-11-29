
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';


@inject(Router, AuthService)
export class Home {
  constructor(router, auth) {
	this.router = router;
  this.auth = auth;
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
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      screenName: this.screenName,
      password: this.password
    }
    let serverResponse = await this.users.save(user);
    if(!serverResponse.error){
       this.registerError = "";
      this.showLogon = true;
    } else {
      this.registerError = "There was a problem registering the user."
    }
 };

  showRegister(){
    this.showLogon = !this.showLogon;
  }



}
