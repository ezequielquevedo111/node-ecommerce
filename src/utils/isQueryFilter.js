const isQueryFilter = (req, orderBy) => {
  let filter = {};
  let order = {};

  if (req.query._id) {
    filter = { _id: req.query._id };
  }

  if (req.query.order) {
    if (req.query.order === "asc") {
      order = { [orderBy]: 1 };
    } else if (req.query.order === "desc") {
      order = { [orderBy]: -1 };
    } else {
      order = {};
    }
  } else {
    order = {};
  }

  return { filter, order };
};

export default isQueryFilter;
