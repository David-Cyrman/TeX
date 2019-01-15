import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: Boolean = false;
  showBalanceUpdateInput: Boolean = false;

  constructor
    (
      private clientService: ClientService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessages: FlashMessagesService
    ) { }

  ngOnInit() {
    // get id from URL
    this.id = this.route.snapshot.params['id'];

    // Get client

    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.Balance > 0) {
          this.hasBalance = true;
        } else {
          this.hasBalance = false;
        }
      }
      this.client = client;
      // console.log(this.client);
    });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessages.show('Balance updated successfully', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure you want to delete?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessages.show('Client deleted successfully.', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
