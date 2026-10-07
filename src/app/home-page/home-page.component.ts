import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardModel } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';
import { MatDivider, MatList, MatListItem } from '@angular/material/list';
import { NgIf, NgFor, SlicePipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    imports: [MatDivider, NgIf, MatList, NgFor, MatListItem, MatCard, MatCardHeader, MatIcon, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatButton, SlicePipe]
})
export class HomePageComponent implements OnInit {

  id!: string;
  dashboardList?: DashboardModel[];
  dashboard: DashboardModel = new DashboardModel();
  dashboardSec!: DashboardModel
  datasource: any[] = [];
  dashboardForm!: UntypedFormGroup;
  isDisable: boolean = false;
  dashboardsAreEmpty: boolean = true;

  // applyStyle: any = {
  //   "new-matcell": this.rowStyle
  // }

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private activateRouter: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getDashboardList();
  }

  private getDashboardList() {
    this.dashboardService.getRecentlyUsedList().subscribe((data) => {
      this.datasource = data;
      if(this.datasource.length > 0) {
        this.dashboardsAreEmpty = false;
      }
    })
  }

  goToWidgetList(id: any) {
    this.router.navigate(['api/dashboard/view/' + id]);
  }

  goToDashboardList() {
    this.router.navigate(['api/dashboard']);
  }

  deleteDashboardById(id: string) {
    this.dashboardService.deleteDashboardById(id).subscribe((data) => {
      this.getDashboardList();
    },
      (error) => {
        this.getDashboardList();
      })
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

  deleteMessage() {
    this.toastr.success('Dashboard was deleted successfully!', 'Success!');
  }

  viewDashboardPage(id: string) {
    this.router.navigate(['api/dashboard/view/' + id]);
  }
}
