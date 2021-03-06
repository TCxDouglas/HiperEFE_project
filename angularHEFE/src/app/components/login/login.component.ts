import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {

  public userAccess: any;
  constructor(public _userService: UserService, public _router: Router) {

    this.userAccess = {
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {

  }
  async singInGoogle() {
    //this._userService.sinInGoogle() pendiente
    console.log('Google');
    try{
      await this._userService.signInGoogle();
      this._router.navigate(['home']);

    }catch(error){
      console.log(error);
    }
  }
  async SignIn() {
    Swal.fire({
      title: 'Iniciando Sesion...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });
    const result = await this._userService.signIn(this.userAccess.email, this.userAccess.password);
    if (result) {
      this.obtenerVerificacion();
    }
  }
  async obtenerVerificacion() {
    try {
      const user = await this._userService.getCurrentUser();

      if (user) {
        //console.log(user);

        if (!user.emailVerified) {
          console.log('No verificado');
          this._router.navigate(['/verify-account/' + user.uid]);
          Swal.close();

        }
        else if (user.emailVerified) {
          console.log('verificado');
          this._router.navigate(['/home']);
          Swal.close();

        }
      }
    } catch (error) {
      console.log(error);

    }
  }
  async alertChangePassword(){
    const { value: email } = await Swal.fire({
      title: 'Ingresa tu correo electrónico registrado!',
      input: 'email',
      inputPlaceholder: 'Escribe tu correo',
    })
    
    if (email) {
      //Swal.fire(`Entered email: ${email}`)
      console.log(email);
      Swal.fire({
        title: 'Enviando...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });
      this._userService.sendRecoverPasswordEmail(email);
        //Swal.close() == await result;
    
    }
  }

}
