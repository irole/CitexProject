import {body} from 'express-validator';

import Validator from "../../../Validator";
import translate from "../../../../helpers/translate";
import userService from "../../../../services/UserService";

class RegisterValidator extends Validator {

    handle() {
        return [
            body('mobile')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value === '' && req.method === "PUT") return;
                    const re = new RegExp(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/);
                    if (!re.test(value)) throw new Error(translate(req, __filename, 'number-valid', 'your phone number format not valid'));
                })
                .custom(async (value, {req}) => {
                    if (value.charAt(0) === "+") value = value.replace("+98", "")
                    if (value.charAt(0) === "0") value = value.substr(1, value.length);
                    let user = await userService.findOne({mobile: value});
                    if (user && req.user.mobile === value && req.method === "PUT") return;
                    if (user) throw new Error(translate(req, __filename, 'mobile-exist', 'this mobile Number registered before'));
                }),
            body('password')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value === '' && req.method === "PUT") return;
                    const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
                    if (!re.test(value)) throw new Error(translate(req, __filename, 'password-valid', 'password must be longer than 8 characters and should contain at least a number, an Uppercase alphabet and a lowercase alphabet.'));
                }),
            body('rePassword')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value === "" && req.method === "PUT" && !req.body.password) return;
                    if (req.body.password !== value) throw new Error(translate(req, __filename, 'password-not-confirm', 'password Confirmation Dose not not match password'));
                }),

            body('name').trim().escape().custom(async (value, {req}) => {
                if (value === "" && req.method === "PUT") return;
                if (value === '') throw new Error(translate(req, __filename, 'first-name-required', 'firstname is required'));
                if (value.length < 3) throw new Error(translate(req, __filename, 'first-name-min-length', 'firstname should be more than 2 characters'));
                if (value.length > 20) throw new Error(translate(req, __filename, 'first-name-max-length', 'firstname should be less than 20 characters'));
            }),
            body('age')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value === "" && req.method === "PUT") return;
                    if (value === '') throw new Error(translate(req, __filename, 'age-required', 'age is required'));
                    if (isNaN(value)) throw new Error(translate(req, __filename, 'age-number', 'age must be a number'));
                    if (parseInt(value) < 18) throw new Error(translate(req, __filename, 'age-min', 'your age must more than 18 years old'));
                    if (parseInt(value) > 80) throw new Error(translate(req, __filename, 'age-max', 'your age must lower than 80 years old'));
                }),

        ];
    }
}

export default new RegisterValidator();
