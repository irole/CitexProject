const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const personSchema = Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    mobile: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
}, {
    timestamps: true, toJSON: {
        transform(doc: any, ret: any) {
            ret.id = ret._id
            delete ret._id;
            delete ret.password;
        },
        virtuals: true,
        versionKey: false // __v : 0
    }
});

personSchema.methods.comparePassword = function (password: any) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('Person', personSchema);
