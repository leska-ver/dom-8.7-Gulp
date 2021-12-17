// import $, { map } from "jquery";
// import "jquery-ui";
import "inputmask";
// import "just-validate";
import "../../node_modules/just-validate/dist/js/just-validate.min.js";
import projectHigh from "./components/projectHigh";
import burger from "./components/burger";
import searchMobile from "./components/search-mobile";
import map from "./components/map";
import contacts from "./components/contacts";

document.addEventListener('DOMContentLoaded', function() {
  projectHigh();
  burger();
  searchMobile();
  map();
  contacts();
});