import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../../user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userStates;
  userCharges;
  form: FormGroup;

  @Input() public idUsuario;

  constructor(private userService: UsersService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
    this.buildForm();
  }

  ngOnInit() {
    this.populateModal();
  }

  private buildForm() {
    this.form = this.fb.group({
      idUsuario: [{value: '', disabled: true}],
      codigo: [{value: '', disabled: true}],
      nombres: [{value: '', disabled: false}],
      apellidos: [{value: '', disabled: false}],
      usuario: [{value: '', disabled: false}],
      correo: [{value: '', disabled: false}],
      idCargo: [{value: '', disabled: false}],
      idEstado: [{value: '', disabled: false}],
    });
    this.populateLists();
  }

  private populateLists() {
    const params = {};
    this.userService.getCharges(params).subscribe(response => {
      const listCharges = [];
      response.forEach((value) => {
        listCharges.push({
          idCargo: value.idCargo,
          cargo: value.nombre,
        });
      });
      this.userCharges = listCharges;
    });
    this.userService.getUserStates(params).subscribe(response => {
      const litStates = [];
      response.forEach((value) => {
        litStates.push({
          idEstado: value.idEstado,
          estado: value.estado,
        });
      });
      this.userStates = litStates;
    });
  }

  private populateModal() {
    const params = {
      idUsuario: this.idUsuario,
    };
    this.userService.getUserBy(params).subscribe(response => {
      response.forEach((value => {
        this.form.setValue({
          idUsuario: response[0].idUsuario,
          codigo: response[0].codigo,
          nombres: response[0].nombres,
          apellidos: response[0].apellidos,
          usuario: response[0].usuario,
          correo: response[0].correo,
          idCargo: response[0].cargo.idCargo,
          idEstado: response[0].estado.idEstado,
        });
      }));
    });
  }


  onSubmit() {
    const newData = {
      nombres: this.form.controls.nombres.value,
      apellidos: this.form.controls.apellidos.value,
      usuario: this.form.controls.usuario.value,
      idUsuario: this.form.controls.idUsuario.value,
      correo: this.form.controls.correo.value,
      estado: this.form.controls.idEstado.value,
      idCargo: this.form.controls.idCargo.value,
    };
    this.userService.editUser(newData);
    this.modalService.dismissAll();
  }
}
