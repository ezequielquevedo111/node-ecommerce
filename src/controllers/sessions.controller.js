class SessionsController {
  register = async (req, res, next) => {
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
      return res.success200({ response: { role: req.user.role } });
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const sessionController = new SessionsController();
const { register, login, signout, badauth, google, me } = sessionController;
export { register, login, signout, badauth, google, me };
