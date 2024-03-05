import Handlebars from "handlebars";

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});


Handlebars.registerHelper("ifEqualsOr", function (arg1, arg2, arg3, options) {
  if (arg1 === arg2 || arg1 === arg3) {
    return options.fn(this);
  }
  return options.inverse(this);
});


export default Handlebars;


