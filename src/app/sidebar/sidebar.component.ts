import { CommunicationService } from './../services/communication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardModel } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  id!: string;
  dashboardList?: DashboardModel[];
  dashboard: DashboardModel = new DashboardModel();
  datasource: any[] = [];
  dashboardForm!: FormGroup;
  opened: boolean = false;
  openedDashboard: boolean = false;
  status: boolean = true;


  constructor(private dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getDashboardList();
    this.updateTooltip();
    this.updateSidebar();

  }

  updateSidebar() {
    this.communicationService.subject.subscribe(data => {
      console.log(data);
      this.getDashboardList();
    });
  }

  updateTooltip() {
    this.communicationService.getMessage().subscribe(message => {
      if(message) {
        this.status = false;
        this.showError()
      }else {
        this.showSuccess()
      }
    })
  }

  private getDashboardList() {
    this.dashboardService.getRecentlyUsedAndOnlineList().subscribe((data) => {
      console.log(data);
      // const name = data.dashboardName;
      // console.log(name);
      this.datasource = data;
      console.log(this.datasource);
      // this.datasource.map((x:any) => x.dashboard = x.dashboard.dashboardName);

      // this.datasource.push(data);
      // console.log(this.datasource);
    },error => this.status)
  }

  goToWidgetList(id: any) {
    this.router.navigate(['api/dashboard/view/' + id]);
  }

  refresh() {
    window.location.reload();
  }
  // displayName(subject:any) {
  //   return subject ? subject.name : undefined;
  // }

  showSuccess() {
    this.toastr.success('Datasource is Online! Dynamic datas are now available', 'Hoorey!');
  }

  showError() {
      this.toastr.error('Datasource is Offline! Dynamic datas are unavailable', 'Ufff!');
  }

}
