import {Component} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {ClientsService} from '../../clients.service';

@Component({
  selector: 'ngx-client-table',
  templateUrl: './smart-table.component.html',
})
export class SmartTableComponent {

  settings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      idCliente: {
        title: 'Id',
        type: 'text',
        editable: false,
      },
      nombre: {
        title: 'Nombres',
        type: 'string',
      },
      correo: {
        title: 'Correo',
        type: 'string',
      },
      direccion: {
        title: 'Direccion',
        type: 'number',
      },
      numeroDoc: {
        title: '# Documento',
        type: 'string',
      },
      telefono: {
        title: 'Telefono',
        type: 'string',
      },
    },
    actions: {
      add: false,
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ClientsService) {
    this.getClientes();
  }
  private getClientes() {
    const params = {};
  this.service.getClientsBy(params).subscribe(
    response => {
      const clientList = [];
      response.forEach(function (value) {
        clientList.push({
          idCliente: value.idCliente,
          nombre: value.nombre.toUpperCase(),
          correo: value.correo.toUpperCase(),
          direccion: value.direccion,
          numeroDoc: value.numeroDoc,
          telefono: value.telefono,
        });
      });
      this.source.load(clientList);
    });
}

  /**
   *
   * @param event
   */
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.disableUser(event.data);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  /**
   *
   * @param event
   */
  onEditConfirm(event): void {
    if (window.confirm('Confirmar')) {
      const oldData = event.data;
      const newData = event.newData;
      if (oldData !== newData) {
        this.service.editProduct(newData);
      }
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
