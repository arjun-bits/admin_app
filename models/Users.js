const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	emailId:String,
	isOauth : {
		type: Boolean,
		default: false
	}
});

mongoose.model('users',userSchema);

