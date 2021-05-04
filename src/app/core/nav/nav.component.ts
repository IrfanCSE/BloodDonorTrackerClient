import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { DonorRequestService } from 'src/app/donor-request/donor-request.service';
import * as signalR from '@microsoft/signalr';
import { DonorService } from 'src/app/donor/donor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  baseUrl = environment.baseUrl;
  user$: Observable<User> = new Observable<User>();
  userId: string;
  donorId: number;
  connectionId: string = '';
  notificationCounter$: Observable<number> = new Observable<number>();

  collapse: boolean = true;

  constructor(
    private service: AccountService,
    private donorReq: DonorRequestService,
    private donorService: DonorService
  ) {}

  ngOnInit() {
    this.user$ = this.service.currentUser$;
    this.notificationCounter$ = this.donorReq.currentNotification$;
    this.loadDonor();
    this.buildSiglarR();
  }

  buildSiglarR = () => {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(`${this.baseUrl}notify`, { withCredentials: false })
      .build();

    connection
      .start()
      .then(() => {
        console.log('signalR Connected');
        console.log(`SignalR id : ${connection.connectionId}`);
        this.connectionId = connection.connectionId ?? '';
        this.setSignalRConnection();
      })
      .catch((err) => console.log(`error : ${err}`));

    connection.on('BroadcastMessage', () => {
      console.log(`SignalR id : ${connection.connectionId}`);
      this.loadNotification();
    });
    console.log(`SignalR id : ${connection.connectionId}`);
  };

  setSignalRConnection = () => {
    this.user$.subscribe((res) => {
      this.donorService.setSignalrConnection(res.userId, this.connectionId).subscribe();
    });
  };

  logout = () => {
    // this.donorReq.countDonorRequest(0).subscribe();
    this.service.logout();
  };

  loadDonor = () => {
    this.user$.subscribe((res) => {
      this.donorService.getDonor(res.userId).subscribe((res) => {
        this.donorId = res.donorIdPk;
        this.loadNotification();
      });
    });
  };

  loadNotification = () => {
    this.donorReq.countDonorRequest(this.donorId).subscribe();
  };
}
