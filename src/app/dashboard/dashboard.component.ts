import { DisableDialogComponent } from './../disable-dialog/disable-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardService } from './../services/dashboard.service';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DashboardModel } from '../models/dashboard.model';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'dashboardName',
    'dashboardDescription',
    'view',
    'status',
    'update',
    'delete'
  ];

  url: any;
  id!: string;
  dashboardList?: DashboardModel[];
  dashboard: DashboardModel = new DashboardModel();
  dashboardSec!: DashboardModel
  datasource!: MatTableDataSource<any>;
  dashboardForm!: FormGroup;
  isDisable: boolean = false;
  selected = 'All';

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private communicationService: CommunicationService,
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getDashboardList();
    this.initFormDashboardForm();
  }

  resetForm() {
    this.dashboardForm.reset();
  }

  getDashboardList() {
    this.dashboardService.getDashboardList().subscribe((data) => {
      this.datasource = new MatTableDataSource<any>(data);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    })
  }

  getOnlineDashboards() {
    this.dashboardService.getOnlineDashboardList().subscribe((data) => {
      this.datasource = new MatTableDataSource<any>(data);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    })
  }

  getOfflineDashboards() {
    this.dashboardService.getOfflineDashboardList().subscribe((data) => {
      this.datasource = new MatTableDataSource<any>(data);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    })
  }

  addDashboard() {
    this.dashboardService.addDashboard(this.dashboard).subscribe((data) => {
      console.log(data);
      console.log(this.dashboard.dashboardName);
      this.communicationService.subject.next(true);
      this.showSuccess();
      this.resetForm();
      this.getDashboardList();
    }, (error) => {
      if(this.dashboard.dashboardName === undefined || this.dashboard.dashboardName.length === 0){
        this.showErrorIfNameIsEmpty();
      }else {
        this.showErrorIfNameAlreadyExists();
      }
    }
    );
  }

  // readUrl(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //   var reader = new FileReader();

  //   reader.onload = (event:any) => {
  //   this.url = event.target.result;
  //   }

  //   reader.readAsDataURL(event.target.files[0]);
  //   }
  //  }

  //  onFileSelected() {
  //   const inputNode: any = document.querySelector('#file');

  //   if (typeof FileReader !== 'undefined') {
  //   const reader = new FileReader();

  //   reader.onload = (e: any) => {
  //   this.dashboard.dashboardLogo = e.target.result;
  //   };

  //   reader.readAsText(inputNode.files[0]);
  //   }
  //  }

  deleteDashboardById(id: string) {
    this.dashboardService.deleteDashboardById(id).subscribe((data) => {
      this.getDashboardList();
      this.communicationService.subject.next(true);
    },
      (error) => {
        this.getDashboardList();
      })
  }

  updateDashboard() {
    this.dashboardService.updateDashboard(this.id, this.dashboard).subscribe(data => {
      console.log(data);

    }, error => console.log(error)
    )
  }

  getDashboardById() {
    this.dashboardService.getDashboardById(this.id).subscribe(data => {
      this.dashboard = data;
    }, error => console.log(error));

  }

  statusUpdate(id: any) {
    console.log(id);

    this.dashboardService.updateDashboardStatus(id, this.dashboard).subscribe(data => {
      console.log(data);
      this.communicationService.subject.next(true);
    }, error => console.log(error)
    )
  }

  statusUpdateDialog(event: any, row: any) {
    let dialogRef = this.dialog.open(DisableDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(`${result}` == 'true') {
        this.onClick(event, row);
      }
    })
  }

  updateDashboardAfterUpdate() {
    this.communicationService.subject.subscribe(data => {
      console.log(data);
      this.getDashboardList();
    });
  }

  deleteDialog(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (`${result}` == 'true') {
        this.deleteDashboardById(id);
        this.deleteMessage();
      }
    });
  }

  initFormDashboardForm() {
    this.dashboardForm = new FormGroup({
      dashboardName: this.fb.control(''),
      dashboardDescription: this.fb.control(''),
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLocaleLowerCase();
  }

  onSubmit() {
    this.addDashboard();
  }

  refresh() {
    window.location.reload();
  }

  onUpdate(dashboard: any) {
    console.log(dashboard);
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '250px',
      data: dashboard,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog was closed');

    })
  }

  onClick(event: any, row: any) {
    console.log(event);
    console.log(row);

    row.disableTextbox = !row.disableTextbox;
    row.status = !row.status

    this.statusUpdate(row.id);
  }

  updateDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    let dialogRef = this.dialog.open(UpdateDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.getDashboardList();
    });
  }

  viewDashboardPage(id: string) {
    this.router.navigate(['api/dashboard/view/' + id]);
  }

  showSuccess() {
    this.toastr.success('Dashboard was added successfully!', 'Success!');
  }

  showErrorIfNameIsEmpty() {
      this.toastr.error('Dashboard name cannot be empty, please be sure to fill out the required fields', 'Error!');
  }

  showErrorIfNameAlreadyExists() {
    this.toastr.error('Dashboard name already exists, please be sure to use unique names', 'Error!')
  }

  deleteMessage() {
    this.toastr.success('Dashboard was deleted successfully!', 'Success!');
  }
}
