import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './services/communication.service';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'DashboardSystem';

  constructor(private webSocketService: WebSocketService, private communicationService: CommunicationService,) {}

  ngOnInit() {
    this.webSocket();
  }

  webSocket() {
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, (frame: any) => {

      stompClient.subscribe('/topic/notification', (notifications: any) => {

      })
    }, (error: any) => {
      this.sendMessage();
      console.log('helo');

    });
  }

  sendMessage() {
    // send message to subscribers via observable subject
    this.communicationService.sendMessage('error');
}

}
