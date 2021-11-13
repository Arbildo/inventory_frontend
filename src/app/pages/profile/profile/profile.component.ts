import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
import {UsersService} from '../../user/user.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  error = '';
  user;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UsersService,
  ) {
    this.user = authService.getToken();
    this.profileForm = this.formBuilder.group({
      idUsuario:	[{value: '', disabled: true}],
      codigo: [{value: '', disabled: true}],
      nombres: [{value: '', disabled: true}],
      apellidos: [{value: '', disabled: true}],
      correo: [{value: '', disabled: true}],
      cargo:	[{value: '', disabled: true}],
    });
  }

  ngOnInit() {
    //   this.profileForm.setValue({
    //     idUsuario: this.user.idUsuario,
    //       codigo : this.user.codigo,
    //       nombres: this.user.nombres,
    //       apellidos: this.user.apellidos,
    //       correo: this.user.correo,
    //       cargo: this.user.cargo.nombre,
    // });

      this.profileForm.setValue({
        idUsuario: '',
          codigo : '',
          nombres: '',
          apellidos: '',
          correo: '',
          cargo: '',
    });
  }
}
