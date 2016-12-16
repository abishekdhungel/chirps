import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { AuthService } from 'aurelia-auth';
import { Chirps } from '../resources/data/chirps';
import { Users } from '../resources/data/users';

@inject(Router, AuthService, Chirps, Users)

export class Wall {

  constructor(router, auth, chirps, users) {
    this.router = router;
    this.auth = auth;
    this.chirps = chirps;
    this.message = 'Chirps';
    this.users=users;
    this.newChirp;
  }

//currently logged in user
 async activate() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.users.setUser(this.user);
    let serverResponse = await this.chirps.getUsersChirps(this.user._id);
    if (serverResponse.error) {
      this.wallMessage = "Error retrieving chirps"
    }
  }  

//Like a chirp
 like(index){
    this.chirps.like(this.chirps.chirpArray[index]._id);
    this.chirps.chirpArray[index].likes++;
  }

//rechirp
  async reChirp(chirp){
    var newChirp = {
      chirp: chirp.chirp,
      reChirp: true,
      chirpAuthor: this.user._id
      //chirpAuthor: chirp.user

    }

      let serverResponse = await this.chirps.saveChirp(newChirp);
      if (serverResponse && !serverResponse.error) {
           this.saveStatus = "";
          this.chirps.chirpArray[0].chirpAuthor = new Object();
         this.chirps.chirpArray[0].chirpAuthor = {email : this.user.email};
      } else {
        this.saveStatus = "Error saving chirp"; 
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
        this.chirps.chirpArray[0].chirpAuthor = new Object();
        this.chirps.chirpArray[0].chirpAuthor = {email : this.user.email};
      } else {
        this.saveStatus = "Error saving chirp";
      }
    }
  }

  //Get a user based on ScrenName
  async findUser(){
    let serverResponse = await this.users.getPersonScreenName(this.searchScreenName);
    this.notMe = true;
    if(serverResponse && !serverResponse.error) {
      let response = await this.chirps.getUsersChirps(serverResponse._id);
        if (response.error) {
          this.wallMessage = "Error retrieving chirps";
        }
     }
  }


async follow(){
    await this.users.followUser(this.user._id, this.users.selectedUser._id);
  }

 async home(){
    this.notMe = false;
    await this.chirps.getUsersChirps(this.user._id);
  }

  logout() {
    sessionStorage.removeItem('user')
    this.auth.logout();
  }
}