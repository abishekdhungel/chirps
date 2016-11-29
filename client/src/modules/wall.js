import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { Chirps } from '../resources/data/chirps';


@inject(Router, AuthService, Chirps)

export class Wall {

  constructor(router, auth, chirps) {
    this.router = router;
    this.auth = auth;
    this.chirps = chirps;
    this.message = 'Chirps';
    this.newChirp;
  }


 async activate() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    let serverResponse = await this.chirps.getUsersChirps(this.user._id);
    if (serverResponse.error) {
      this.wallMessage = "Error retrieving chirps"
    }
  }  

//save chirp
async chirp() {
    if (this.newChirp) {
      var chirp = {
        chirp: this.newChirp,
        user: this.user._id,
        chirpAuthor: this.user._id
      }
      let serverResponse = await this.chirps.saveChirp(chirp);
      if (serverResponse && !serverResponse.error) {
        this.newChirp = "";
        this.saveStatus = "";
        this.chirps.chirpArray[0].chirpAuthor.email = this.user.email;
      } else {
        this.saveStatus = "Error saving chirp";
      }
    }
  }


  home() {
    this.router.navigate('home');
  }

  logout() {
    sessionStorage.removeItem('user')
    this.auth.logout();
  }
}