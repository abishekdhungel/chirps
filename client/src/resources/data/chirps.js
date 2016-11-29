import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Chirps { 

	constructor(data) {
        		this.data = data;
		this.chirpsArray = undefined;
    	}

//Retrive users chirps
async getUsersChirps(id) {
        var url = this.data.CHIRP_SERVICE + '/userChirps/' + id;
        try {
            let serverResponse = await this.data.get(url);
            if (!serverResponse.error) {
                this.chirpArray = serverResponse;
            }
            return serverResponse;
        } catch (error) {
            console.log(error);
            return undefined;
        }
 }


 async saveChirp(chirp){ 
       try {
            	let serverResponse = await this.data.post(chirp, this.data.CHIRP_SERVICE);
	if(!serverResponse.error && !chirp.reChirp) {
		this.chirpArray.unshift(serverResponse);
	}
	return serverResponse;
        } catch (error) {
            	console.log(error);
            	return undefined;
        }
 }
}

