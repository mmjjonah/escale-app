import {formatDate} from '@angular/common';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {StatusCodes} from 'http-status-codes';
import {Subscription} from 'rxjs';
import {CommandService} from '../../layouts/admin-layout/services/command/command.service';
import {Command} from '../../shared/interfaces/command';
import {User} from '../../shared/interfaces/user';
import {SessionService} from '../../shared/services/session/session.service';
import {ToastService} from '../../shared/services/toast/toast.service';
import {ToolsService} from '../../shared/services/tools/tools.service';
import {ModalRetourClientComponent} from './modal-retour-client/modal-retour-client.component';
import {ModalSingleCommandComponent} from './modal-single-command/modal-single-command.component';
import {_c} from '../../config/constants';
import {mimes} from '../../config/mimes'

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Command>()
  displayedColumns = ['id', 'nom_prenom', 'contact', 'date_livraison', 'nbr_gateau', 'evenement', 'action']
  _c = _c
  subscription = new Subscription()

  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private session$: SessionService,
    private command$: CommandService,
    private toast$: ToastService,
    private tools$: ToolsService
  ) {
  }

  get type(): string {
    return this.activatedRoute.snapshot.paramMap.get('type') as string
  }

  get user(): User {
    return this.session$.getUserSession
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  purchaseOrder(command_id: number) {
    this.tools$.showSpinner()
    this.subscription.add(
      this.command$.purchaseOrder(command_id)
        .subscribe((res) => {
          if (res.status === StatusCodes.OK) {
            this.toast$.info('Bon de commande', res.message)
            this.tools$.downloadBase64File(mimes.PDF, res.data, `bon-de-commande-${formatDate(new Date, 'yyyy-MM-dd-H-mm-ss', 'fr')}`)
            this.tools$.hideSpinner()
          }
        })
    )
  }

  retourClient(commandData: Command) {
    this.subscription.add(
      this.matDialog.open(ModalRetourClientComponent, {
        width: '400px',
        data: commandData
      }).afterClosed()
        .subscribe(res => {
          if (res) {
            this.initList()
          }
        })
    )
  }

  supprimerCommand(commandData: Command) {
    this.subscription.add(
      this.tools$.confirm({
        title: 'Suppression',
        message: `Êtes-vous sûre de vouloir supprimer la commande de ${commandData.client.client_lastname} ${commandData.client.client_firstname} ?`,
      }).subscribe(allow => {
        if (allow) {
          this.command$.delete(commandData.command_id)
            .subscribe((res) => {
              if (res.status === StatusCodes.OK) {
                this.toast$.success('Suppression', res.message)
                this.initList()
              }
            })
        }
      })
    )
  }

  modifierCommand(commandData: Command) {
    this.subscription.add(
      this.matDialog.open(ModalSingleCommandComponent, {
        width: '800px',
        data: commandData,
        disableClose: true
      }).afterClosed()
        .subscribe((command) => {
          if (command) {
            console.log(command)
            this.tools$.showSpinner()
            this.command$.createOrUpdate(command).subscribe((res) => {
              if (res.status === StatusCodes.OK) {
                this.toast$.success('Commande', res.message)
                this.initList()
              } else {
                this.toast$.error('Commande', 'Erreur lors de la modification du commande.')
              }
              this.tools$.hideSpinner()
            })
          }
        })
    )
  }

  ajoutCommand() {
    this.subscription.add(
      this.matDialog.open(ModalSingleCommandComponent, {
        width: '800px',
        disableClose: true
      }).afterClosed()
        .subscribe((command) => {
          if (command) {
            console.log(command)
            this.tools$.showSpinner()
            this.command$.createOrUpdate(command).subscribe((res) => {
              if (res.status === StatusCodes.CREATED) {
                this.toast$.success('Commande', res.message)
                this.tools$.hideSpinner()
                if (this.user.user_group === _c.OPERATOR) {
                  this.ajoutCommand()
                } else {
                  this.initList()
                }
              } else {
                this.toast$.error('Commande', 'Erreur lors de la création du commande.')
              }
            })
          }
        })
    )
  }

  initList() {
    this.subscription.add(
      this.command$.findAll()
        .subscribe(res => {
          if (res.status === StatusCodes.OK) {
            this.dataSource.data = res.data
          }
        })
    )
  }

  ngOnInit(): void {
    this.matDialog.closeAll()
    this.tools$.showSpinner()
    if (this.user.user_group === _c.OPERATOR) {
      this.ajoutCommand()
    } else {
      this.initList()
    }
    this.tools$.hideSpinner()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
