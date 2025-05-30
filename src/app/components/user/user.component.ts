import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {load, remove} from "../../store/users/users.actions";
import Swal from "sweetalert2";

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  title: string = 'Listado de usuarios!';

  users: User[] = [];
  paginator: any = {};

  constructor(
    private store: Store<{users: any}>,
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.store.select('users').subscribe(state => {
        this.users = state.users,
        this.paginator = state.paginator
    });
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => this.store.dispatch(load({ page: +(params.get('page') || '0') })));
  }

  onRemoveUser(id: number): void {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado el usuario sera eliminado del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(remove({ id }));
      }
    });
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  get admin(){
    return this.authService.isAdmin();
  }
}
