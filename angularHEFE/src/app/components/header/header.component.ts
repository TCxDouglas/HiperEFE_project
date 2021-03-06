import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  @Input() status: string;
  user: any;

  constructor(
    public _userService: UserService,
    public _router: Router) {

  }

  async ngOnInit(): Promise<void> {
    const user = await this._userService.getCurrentUser();
    if (user) {
      this._userService.getUserData(user.uid).subscribe(datauser => {
        this.user = datauser;
        if (!this.user.photoURL) {
          this.user.photoURL = user.photoURL;
        }
      });
    }

  }
  goProfile() {
    this._router.navigate([`/user/profile/${this.user.uid}`]);
  }

  
  //cerrar sesion
  singOut() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Se cerrará tu sesión!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then(async (result) => {
      if (result.value) {

        Swal.fire({
          title: 'Cerrando Sesion...',
          allowOutsideClick: false,
          timer: 1000,
          onBeforeOpen: () => {
            Swal.showLoading()
          },
          onClose: () => {
            this._userService.signOut();
          }
        });
      }
    })
  }


}
