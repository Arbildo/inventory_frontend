import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UsersService} from '../../../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  userStates;
  userCharges;
  form: FormGroup;

  @Input() public idUsuario;

  constructor(private userService: UsersService,
              private fb: FormBuilder,
              private modalService: NgbModal) {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.fb.group({
      nombres: [{value: '', disabled: false}],
      apellidos: [{value: '', disabled: false}],
      usuario: [{value: '', disabled: false}],
      correo: [{value: '', disabled: false}],
      password: [{value: '', disabled: false}],
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
  onSubmit() {
    const  data = {
      nombres: this.form.controls.nombres.value,
      apellidos: this.form.controls.apellidos.value,
      usuario: this.form.controls.usuario.value,
      correo: this.form.controls.correo.value,
      password: this.form.controls.password.value,
      estado: this.form.controls.idEstado.value,
      idCargo: this.form.controls.idCargo.value,
    };
    this.userService.createUser(data);
    this.modalService.dismissAll();
  }
}
