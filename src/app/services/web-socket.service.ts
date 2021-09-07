import { Injectable } from '@angular/core';

declare var require: any;
var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  public connect() {
    let socket = new SockJs(`http://localhost:8080/socke`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
