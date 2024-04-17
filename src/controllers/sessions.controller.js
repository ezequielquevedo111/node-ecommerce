import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

class SessionsController {
  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.user;
    // console.log(req.body);
    // console.log(req.user);

    // console.log(email, name, verifiedCode);
    // console.log(verifiedCode);
    await service.register({ email, name, verifiedCode });
    try {
      return res.success201({ message: "Registered" });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .success200({ message: "Logged in" });
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200({ message: "Signed out!" });
    } catch (error) {
      return next(error);
    }
  };

  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };

  google = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
        })
        .success200({
          message: "Logged in with Google!",
          session: req.session,
        });
    } catch (error) {
      return next(error);
    }
  };

  me = async (req, res, next) => {
    try {
      console.log(req.body);
      return res.success200({
        response: { _id: req.user._id, role: req.user.role },
      });
    } catch (error) {
      return next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const { email, verifiedCode } = req.body;
      console.log(email, verifiedCode);
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        console.log(verifiedCode);
        await service.update(user._id, { verified: true });
        return res.json({
          statusCode: 200,
          message: "Verified user!",
        });
      } else {
        CustomError.new(errors.invalidToken);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const sessionController = new SessionsController();
const { register, login, signout, badauth, google, me, verifyAccount } =
  sessionController;
export { register, login, signout, badauth, google, me, verifyAccount };
