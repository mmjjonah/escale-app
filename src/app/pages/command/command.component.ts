import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../shared/interfaces/user';
import {SessionService} from '../../shared/services/session/session.service';
import {ModalSingleCommandComponent} from './modal-single-command/modal-single-command.component';
import {_c} from '../../config/constants';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {
  listCommands = new MatTableDataSource()
  displayedColumns = ['id', 'nom_prenom', 'contact', 'date_livraison', 'nbr_gateau', 'evenement', 'action']
  _c = _c

  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private session$: SessionService,
  ) { }

  get type(): string { return this.activatedRoute.snapshot.paramMap.get('type') as string }
  get user(): User { return this.session$.getUserSession }

  ajoutCommand() {
    this.matDialog.open(ModalSingleCommandComponent, {
      width: '800px',
      disableClose: true
    }).afterClosed()
      .subscribe((command) => {
        if (command) {
          console.log(command)
          if (this.user.user_group === _c.OPERATOR) {
            this.ajoutCommand()
          } else {
            this.listCommands.data = [
              ...this.listCommands.data,
              command
            ]
          }
        }
      })
  }

  ngOnInit(): void {
    this.matDialog.closeAll()
    if (this.user.user_group === _c.OPERATOR) {
      this.ajoutCommand()
    }
  }

}
