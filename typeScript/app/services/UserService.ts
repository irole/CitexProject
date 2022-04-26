// Packages
const bcrypt = require('bcrypt');
// Service
import Service from "./Service";
// Model
import User from "../models/person";

class UserService extends Service {

    constructor() {
        super(User);
    }


    bcryptPassword(password: any): any {
        // Bcrypt with 15 salt
        const salt = bcrypt.genSaltSync(15);
        // Bcrypt Password with Salt
        return bcrypt.hashSync(password, salt);
    }

    async registerProcess(mobile, password,name,age) {
        // Create new user
        const newUser = await new this.model({
            mobile,
            password: this.bcryptPassword(password),
            name,
            age
        });
        const user = await newUser.save();
        // when user not created send 500
        if (!user) return 500;
        return user;
    }

    async checkUserExistWithMobile(mobile) {
        const result = await this.findOne({mobile});
        return !!result;
    }
}

export default new UserService();
