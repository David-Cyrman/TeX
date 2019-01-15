import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    Name: '',
    LastName: '',
    Email: '',
    Phone: 0,
    Balance: 0
  };

  disabledBalanceOnEdit: Boolean = true;


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
      this.client = client;
      // console.log(this.client);
    });
  }
  onSubmit({ value, valid }: { value: Client, valid: Boolean }) {
    if (!valid) {
      this.flashMessages.show('Please fill the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessages.show('Client Updated!', {
        cssClass: 'alert-success', timeout: 4000
      });

      this.router.navigate(['/client/' + this.id]);
    }

  }
}
