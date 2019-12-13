import { Component, OnInit } from '@angular/core';
import {ConnectionService} from 'ng-connection-service';
import {TodoService} from '../../../todo.service';

@Component({
  selector: 'ngx-conection-header',
  templateUrl: './conection-header.component.html',
  styleUrls: ['./conection-header.component.scss'],
})
export class ConectionHeaderComponent implements OnInit {

  isConnected = true;
  constructor( private connectionService: ConnectionService,
               private todoService: TodoService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (isConnected) {
        this.todoService.requestSync();
      }
    });
  }

  ngOnInit() {
  }

}
