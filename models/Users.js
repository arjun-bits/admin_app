const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	emailId:String
});

mongoose.model('users',userSchema);

