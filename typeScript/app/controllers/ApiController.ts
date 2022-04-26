// Controllers
import MasterController from "./MasterController";

export default class ApiController extends MasterController {

    success(data: any, res, statusCode: number = 200) {
        const httpStatus = Option['httpStatus'][`s${statusCode}`];
        res.status(httpStatus.code).json({
            status: 'success',
            code: httpStatus.code,
            message: httpStatus.message,
            data,
        });
    }
    rebuildMobileNumber(phoneNumber: string): string {
        if (phoneNumber.charAt(0) === "+") phoneNumber = phoneNumber.replace("+98", "");
        if (phoneNumber.charAt(0) === "0") phoneNumber = phoneNumber.substr(1, phoneNumber.length);
        return phoneNumber;
    }
};
