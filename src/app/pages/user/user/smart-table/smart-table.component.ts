import {Component, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {UsersService} from '../../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditUserComponent} from './edit-user/edit-user.component';
import {CreateUserComponent} from './create-user/create-user.component';

@Component({
  selector: 'ngx-user-table',
  styleUrls: ['./smart-table.componente.scss'],
  templateUrl: './smart-table.component.html',
})
export class SmartTableComponent implements OnInit {

  settings = {
    columns: {
      idUsuario: {
        title: 'Id',
        type: 'text',
        editable: false,
      },
      nombres: {
        title: 'Nombres',
        type: 'string',
      },
      apellidos: {
        title: 'Apellidos',
        type: 'string',
      },
      usuario: {
        title: 'Usuario',
        type: 'number',
      },
      correo: {
        title: 'Correo',
        type: 'string',
      },
      cargo: {
        title: 'Cargo',
        type: 'string',
      },
      estado: {
        title: 'Estado',
        type: 'string',
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: UsersService,
              private modalService: NgbModal) {
    this.populateTable();
  }

  public ngOnInit(): void {

  }

  private populateTable() {
    const params = {};
    this.service.getUserBy(params).subscribe(
      response => {
        const userList = [];
        response.forEach(function (value) {
          userList.push({
            idUsuario: value.idUsuario,
            nombres: value.nombres.toUpperCase(),
            apellidos: value.apellidos.toUpperCase(),
            usuario: value.usuario,
            correo: value.correo,
            estado: value.estado.estado,
            cargo: value.cargo.nombre,
          });
        });
        this.source.load(userList);
      });
  }

  onUserRowSelect(event) {
    const idUser = event.data.idUsuario;
    const modalRef = this.modalService.open(EditUserComponent);
    modalRef.componentInstance.idUsuario = idUser;
  }

  openModalToCreate() {
    this.modalService.open(CreateUserComponent);
  }
}
