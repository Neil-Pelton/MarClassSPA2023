
import html from "html-literal";
import * as views from "./views"; //creating object called views, each item in views are features we're importing

export default (state) => html` ${views[state.view](state)} `;
