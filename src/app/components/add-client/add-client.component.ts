import { Component, OnInit, ViewChild } from '@angular/core';

import { Client } from '../../models/Client';

import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    Name: '',
    LastName: '',
    Email: '',
    Phone: 0,
    Balance: 0
  };

  disableBalanceOnAdd: Boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: Client, valid: Boolean }) {
    if (this.disableBalanceOnAdd) {
      value.Balance = 0;

    }
    if (!valid) {
      // show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });

    } else {

      // Add new client
      this.clientService.newClient(value);
      // Redirect
      this.router.navigate(['/']);
      // show successful message
      this.flashMessage.show('New client added!', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }
}

