/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	hi: function(req, res){
		return res.send("Hi there!");
	},
	bye: function(req, res){
		return res.redirect('http://www.sayonara.com');
	}
};

