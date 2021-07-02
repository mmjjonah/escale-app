import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {StatusCodes} from 'http-status-codes';
import {Subscription} from 'rxjs';
import {UserService} from '../../layouts/admin-layout/services/user/user.service';
import {User} from '../../shared/interfaces/user';
import {ToastService} from '../../shared/services/toast/toast.service';
import {ToolsService} from '../../shared/services/tools/tools.service';
import {ModalEditPasswordComponent} from './modal-edit-password/modal-edit-password.component';
import {ModalSingleAccountComponent} from './modal-single-account/modal-single-account.component';
import {_c} from '../../config/constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['lastname', 'firstname', 'email', 'group', 'actions'];
  STATUS = _c.status;
  GROUPES = _c.groups;
  dataSource = new MatTableDataSource<User>();
  subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private user$: UserService,
    private matDialog: MatDialog,
    private tools$: ToolsService,
    private toast$: ToastService
  ) {}

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
  getGroupDesc(name: string) {
    let desc = ''
    this.GROUPES.map(group => {
      if (group.value === name) {
        desc = group.description
      }
    })
    return desc
  }

  onAdd() {
    this.subscription.add(
      this.matDialog.open(ModalSingleAccountComponent, {
        width: '800px'
      }).afterClosed()
        .subscribe(user => {
          if (user) {
            this.user$.createUser(user)
              .subscribe(res => {
                if (res.status === StatusCodes.CREATED) {
                  this.toast$.success('Création', res.message)
                  this.initTable()
                }
              })
          }
        })
    )
  }

  onEdit(user: User) {
    this.subscription.add(
      this.matDialog.open(ModalSingleAccountComponent, {
        width: '800px',
        data: user
      }).afterClosed()
        .subscribe((userResult: any) => {
          if (userResult) {
            this.user$.updateUser(userResult.user_id, userResult)
              .subscribe(res => {
                if (res.status === StatusCodes.OK) {
                  this.toast$.success('Modification', res.message)
                  this.initTable()
                }
              })
          }
        })
    )
  }

  initTable() {
    this.subscription.add(
      this.user$.getUsers().subscribe((res) => {
        this.dataSource.data = res.data
      })
    )
  }

  onEditPassword(user: User) {
    this.subscription.add(
      this.matDialog.open(ModalEditPasswordComponent, {
        width: '400',
        data: user
      }).afterClosed()
        .subscribe(userResult => {
          if (userResult) {
            this.user$.updateUser(userResult.user_id, userResult)
              .subscribe(res => {
                if (res.status === StatusCodes.OK) {
                  this.toast$.success('Modification identifiant', res.message)
                  this.initTable()
                }
              })
          }
        })
    )
  }

  onChangeStatus(user: User) {
    const title = user.user_status === this.STATUS.ACTIVE ? 'Désactivation' : 'Activation'
    this.subscription.add(
      this.tools$.confirm({
        title,
        message: `Êtes-vous sûre de vouloir ${user.user_status === this.STATUS.ACTIVE ? 'Désactiver' : 'Activer'} l'utilisateur ${user.user_lastname} ${user.user_firstname} ?`,
        btnTextConfirm: user.user_status === this.STATUS.ACTIVE ? 'Désactiver' : 'Activer'
      }).subscribe((result) => {
        if (result) {
          this.user$.updateUser(user.user_id, {
            user_status: user.user_status === this.STATUS.ACTIVE ? this.STATUS.INACTIVE : this.STATUS.ACTIVE
          })
            .subscribe(res => {
              if (res.status === StatusCodes.OK) {
                this.toast$.success(title, res.message)
                this.initTable()
              }
            })
        }
      })
    )
  }

  onDelete(user: User) {
    this.subscription.add(
      this.tools$.confirm({
        title: 'Suppression',
        message: `Êtes-vous sûre de vouloir supprimer l'utilisateur ${user.user_lastname} ${user.user_firstname} ?`
      }).subscribe((result) => {
        if (result) {
          this.user$.deleteUser(user.user_id)
            .subscribe(res => {
              if (res.status === StatusCodes.OK) {
                this.toast$.success('Suppression', res.message)
                this.initTable()
              }
            })
        }
      })
    )
  }

  ngOnInit(): void {
    this.initTable()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
