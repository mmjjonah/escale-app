import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {StatusCodes} from 'http-status-codes';
import {UserService} from '../../layouts/admin-layout/services/user/user.service';
import {User} from '../../shared/interfaces/user';
import {ToastService} from '../../shared/services/toast/toast.service';
import {ToolsService} from '../../shared/services/tools/tools.service';
import {ModalEditPasswordComponent} from './modal-edit-password/modal-edit-password.component';
import {ModalSingleAccountComponent} from './modal-single-account/modal-single-account.component';
import { _c } from '../../config/constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['lastname', 'firstname', 'email', 'actions'];
  STATUS = _c.status;
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private user$: UserService,
    private matDialog: MatDialog,
    private tools$: ToolsService,
    private toast$: ToastService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdd() {
    this.matDialog.open(ModalSingleAccountComponent, {
      width: '800px'
    }).afterClosed()
      .subscribe(user => {
        if (user) {
          this.user$.createUser(user)
            .subscribe(res => {
              if (res.status === StatusCodes.OK) {
                this.toast$.success('Création utilisateur', res.message)
              }
            })
        }
      })
  }

  onEdit(user: User) {
    this.matDialog.open(ModalSingleAccountComponent, {
      width: '800px',
      data: user
    })
  }

  onEditPassword(user: User) {
    this.matDialog.open(ModalEditPasswordComponent, {
      width: '400',
      data: user
    })
  }

  onChangeStatus(user: User) {
    this.tools$.confirm({
      title: user.user_status === this.STATUS.ACTIVE ? 'Désactivation' : 'Activation',
      message: `Êtes-vous sûre de vouloir ${user.user_status === this.STATUS.ACTIVE ? 'Désactiver' : 'Activer'} l'utilisateur ${user.user_lastname} ${user.user_firstname} ?`,
      btnTextConfirm: user.user_status === this.STATUS.ACTIVE ? 'Désactiver' : 'Activer'
    }).subscribe((res) => {
      if (res) {
        this.dataSource.data = this.dataSource.data.map(u => {
          if (u.user_id === user.user_id) {
            u.user_status = user.user_status === this.STATUS.ACTIVE ? this.STATUS.INACTIVE : this.STATUS.ACTIVE
          }
          return u
        })
      }
    })
  }

  onDelete(user: User) {
    this.tools$.confirm({
      title: 'Suppression',
      message: `Êtes-vous sûre de vouloir supprimer l'utilisateur ${user.user_lastname} ${user.user_firstname} ?`
    }).subscribe((res) => {
      if (res) {
        // todo: Supprimer l'utilisateur
      }
    })
  }

  ngOnInit(): void {
    this.user$.getUsers().subscribe((res) => {
      console.log(res)
      this.dataSource.data = res.data
    })
  }
}
