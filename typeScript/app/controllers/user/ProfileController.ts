// Controllers
import Controller from "./Controller";
import {throws} from "assert";
import {ClientError} from "../../errors/ClientError";
import UserService from "../../services/UserService";
import userService from "../../services/UserService";


class ProfileController extends Controller {

    async index(req, res, next) {
        try {
            const id = req.params.id;
            if (id !== req.user.id) throw new ClientError("you are not access to this page ", 403)
            return res.json({
                name: req.user.name,
                age: req.user.age,
                mobile: req.user.mobile
            })
        } catch (e: any) {
            next(e);
        }
    }

    async destroy(req, res, next) {
        try {
            const id = req.params.id;
            if (id !== req.user.id) throw new ClientError("you are not access to this page ", 403)
            await UserService.remove(req.user.id);
            return this.success({msg: "user deleted"}, res, 200)
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            if (id !== req.user.id) throw new ClientError("you are not access to this page ", 403)
            let {name, mobile, age, password} = req.body;
            mobile = this.rebuildMobileNumber(mobile)
            if (name === "") name = req.user.name;
            if (mobile === "") mobile = req.user.mobile;
            if (age === "") age = req.user.age;
            if (password === "") {
                password = req.user.password;
            } else {
                password = await userService.bcryptPassword(password)
            }
            await userService.findOneAndUpdate({id: req.params.id}, {
                name,
                age,
                mobile,
                password
            })
            return this.success({msg: "user information updated successfully"}, res, 200)

        } catch (e) {
            next(e);
        }

    }
}

export default new ProfileController();
