import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { after, capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(store.Links)}
    ${Main(state)}
    ${Footer()}
  `;

  afterRedner(state);

  router.updatePageLinks();
}

function afterRedner(state) {
  //add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

router.hooks({
  before: (done, params) => {
    const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home"; //happend before the page is loaded
    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Pizza":
        // New Axios get request utilizing already made environment variable
        axios
          .get(`https://sc-pizza-api.onrender.com/pizzas`)
          .then(response => {
            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            console.log("response", response);
            store.Pizza.pizzas = response.data; //response.data = array of objects
            done();
          })
          .catch((error) => { //if error occurs, catch "catches" error and returns:
            console.log("It puked", error);
            done();
          });
          break;
      default :
        done();
    }
  },
  already: (params) => {
    const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home";

    render(store[view]); //difference between alread and before is this line of code - allows us to make api call when page is already loaded
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      if (store.hasOwnProperty(view)) {
        render(store[view]);
      } else {
        console.log(`View ${view} not defined`);
      }
    }
  })
  .resolve();
