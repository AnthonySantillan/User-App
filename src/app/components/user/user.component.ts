import {Component, EventEmitter} from '@angular/core';
import {User} from "../../models/user";
import {Router, RouterModule} from "@angular/router";
import {UserService} from "../../services/user.service";
import {SharingDataService} from "../../services/sharing-data.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  title = "Listado de usuarios"

  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private sharingDataService: SharingDataService
  ) {
    if(this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    } else {
      this.userService.findAll().subscribe(users => this.users = users);
    }
  }

  onRemoveUser(id: number): void {
    this.sharingDataService.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit',user.id], {state: {user}});
  }

}
