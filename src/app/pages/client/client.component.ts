import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {StatusCodes} from 'http-status-codes';
import {Subscription} from 'rxjs';
import {ClientService} from '../../layouts/admin-layout/services/client/client.service';
import {Client} from '../../shared/interfaces/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Client>()
  displayedColumns = ['client_id', 'client_lastname', 'client_firstname', 'client_age', 'client_sexe', 'client_contact', 'date_first_command']
  subscription = new Subscription()

  constructor(
    private client$: ClientService
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.client$.findAll()
        .subscribe(res => {
          if (res.status === StatusCodes.OK) {
            this.dataSource.data = res.data
          }
        })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
