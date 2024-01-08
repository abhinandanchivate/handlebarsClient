import handlebars from "handlebars";
import getCurrentYear from "./currentYear.js";

handlebars.registerHelper("getCurrentYear", getCurrentYear);

export default handlebars;
