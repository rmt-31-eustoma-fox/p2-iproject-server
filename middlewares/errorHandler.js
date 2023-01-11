const errorHandler = async (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
  console.log(err);

  switch (err.name) {
    case "players_not_found":
      code = 404;
      message = "Player not found";
      break;
    case "standings_not_found":
      code = 404;
      message = "Standings not found";
    case "teams_not_found":
      code = 404;
      message = "Teams not found";

    default:
      break;
  }

  res.status(code).json({ message, err });
};

module.exports = errorHandler;
