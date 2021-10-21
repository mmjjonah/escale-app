import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {ParamGeneralService} from '../../shared/services/param-general/param-general.service';
import {StatusCodes} from 'http-status-codes';
import {ParamGen} from '../../shared/interfaces/param-gen';
import {MatDialog} from '@angular/material/dialog';
import {ModalSingleSettingComponent} from './modal-single-setting/modal-single-setting.component';
import {ToolsService} from '../../shared/services/tools/tools.service';
import {ToastService} from '../../shared/services/toast/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription = new Subscription();
  dataSource = new MatTableDataSource<ParamGen>()
  displayedColumns = ['param_id', 'param_categories', 'param_code', 'param_description', 'param_ordre', 'action'];

  constructor(
    private param$: ParamGeneralService,
    private matDialog: MatDialog,
    private tools$: ToolsService,
    private toast$: ToastService
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(row: ParamGen) {
    this.subscription.add(
      this.tools$.confirm({
        title: 'Suppression',
        message: 'Êtes-vous sûre de supprimer ce paramètre?'
      }).subscribe(allow => {
        if (allow) {
          this.param$.deleteParam(row.param_id)
            .subscribe(res => {
              if (res.status === StatusCodes.OK) {
                this.loadData()
                this.toast$.success('Suppression', 'Suppression avec succès.')
              }
            })
        }
      })
    )
  }

  onCreate() {
    this.matDialog.open(ModalSingleSettingComponent, {
      width: '400px',
      disableClose: true,
    })
      .afterClosed()
      .subscribe(_ => {
        this.loadData();
      })
  }

  onEdit(data: ParamGen) {
    this.matDialog.open(ModalSingleSettingComponent, {
      width: '400px',
      disableClose: true,
      data,
    })
      .afterClosed()
      .subscribe(_ => {
        this.loadData();
      })
  }

  loadData() {
    this.subscription.add(
      this.param$.getParams()
        .subscribe((res) => {
          if (res.status === StatusCodes.OK) {
            this.dataSource.data = res.data;
          }
        })
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
