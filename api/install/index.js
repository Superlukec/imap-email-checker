const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');

var installService = {
    install: install
}

function install() {

    return new Promise(async (resolve, reject) => {

        try {            
            let users = await User.find({});
    
            if(users.length > 0) {
                
                return false;
                
            }
            
            // install needed data
    
            let adminUser = new User();
            
            adminUser.email = 'admin';
            adminUser.setPassword('changeme');
            adminUser.role = 'admin';
    
            await adminUser.save();
        

            return resolve(true);
    
    
        } catch (error) {
            return reject(error);
        }

    });
    
   

}

module.exports = installService;