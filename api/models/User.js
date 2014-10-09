/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: 'string',
  	email: {
  		type: 'string',
  		unique: true
  	},
  	wishlist: {
  		collection: 'product',
  		via: 'wishlistedBy',
  		dominant: true
  	},
  	autoCreatedAt: true,
  	autoUpdatedAt: true
  }
};

