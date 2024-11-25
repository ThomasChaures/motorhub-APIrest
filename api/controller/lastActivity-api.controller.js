import * as service from "../../service/lastActivity.service.js";

export const getUa = (req, res) => {
  service.getUa()
    .then((ua) => res.status(200).json(ua))
    .catch((error) => {
      res.status(400).json({ mssage: error });
    });
};
