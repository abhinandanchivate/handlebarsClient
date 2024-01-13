import handlebars from "handlebars";
import getCurrentYear from "./currentYear.js";
import handlebarHelpers from "handlebars-helpers";

handlebars.registerHelper("getCurrentYear", getCurrentYear);
handlebars.registerHelper("eq", handlebarHelpers().eq);

export default handlebars;
