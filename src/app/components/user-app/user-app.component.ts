import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import Swal from 'sweetalert2'
import {Router, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {SharingDataService} from "../../services/sharing-data.service";

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private sharingDataService: SharingDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  addUser() {
    this.sharingDataService.newUserEventEmitter.subscribe(user => {
      if(user.id > 0)
      {
        this.users = this.users.map(u => (u.id === user.id)? {... user}: u);
      } else {
        this.users = [... this.users,{... user,id: new Date().getTime()}];
      }
      this.router.navigate(['/users'], {state: {users: this.users}});
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado con exito!",
        icon: "success"
      });
    });
  }

  removeUser():void {
    this.sharingDataService.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el usuario sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users =  this.users.filter(user => user.id != id);
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
            this.router.navigate(['/users'], {state: {users: this.users}});
          });
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }

  findUserById() {
    this.sharingDataService.findUserByIdEventEmitter.subscribe(id =>{
      const user = this.users.find(user => user.id == id);

      this.sharingDataService.selectUserEventEmitter.emit(user);
    })
  }
}
