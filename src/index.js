import React from "react";
import ReactDOM from "react-dom";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  Provider,
  createClient,
  defaultExchanges,
  subscriptionExchange
} from "urql";

import "./index.css";
import App from "./App";

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:4000/graphql",
  {}
);

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
