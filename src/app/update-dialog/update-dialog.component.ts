import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { DashboardModel } from '../models/dashboard.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  dashboardForm!: FormGroup;
  datasource!: MatTableDataSource<any>;
  id!: string;
  dashboardList?: DashboardModel[];
  dashboard: DashboardModel = new DashboardModel();

  constructor(private fb: FormBuilder, private service: DashboardService, public dialogRef: MatDialogRef<UpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private toastr: ToastrService,
      private communicationService: CommunicationService,
      private router: Router,
      private dashboardService: DashboardService, private activateRouter: ActivatedRoute) {
        this.id = data;
        console.log(data);

       }

  ngOnInit(): void {
    // this.id = this.activateRouter.snapshot.params['id'];
    this.initForm();

    this.dashboardService.getDashboardById(this.id).subscribe(data => {
      this.dashboard = data;
      console.log(data);

      this.editForm();
    }, error => console.log(error));
    // this.updateDashboard();
  }

   getDashboardList() {
    this.service.getDashboardList().subscribe((data) => {
      this.datasource = new MatTableDataSource<any>(data);
    })
  }

  initForm() {
    this.dashboardForm = new FormGroup({
      dashboardName: this.fb.control(''),
      dashboardDescription: this.fb.control(''),
    });
  }

  editForm() {
    this.dashboardForm.patchValue({
      dashboardName: this.dashboard.dashboardName,
      dashboardDescription: this.dashboard.dashboardDescription,
    })
  }

  goToDashboardList() {
    this.router.navigate(['api/dashboard']);
  }

  updateDashboard(formValue: any) {
    this.dashboard.dashboardName = formValue.dashboardName;
    this.dashboard.dashboardDescription = formValue.dashboardDescription;
    this.service.updateDashboard(this.id, this.dashboard).subscribe(data => {
      this.showSuccess();
      this.getDashboardList();
    }, error => {
      if(this.dashboard.dashboardName.length === 0) {
        this.showErrorIfNameIsEmpty();
      }else {
        this.showErrorIfNameAlreadyExists();
      }
    }

    )
  }

  onUpdate(formValue: any) {
    console.log(formValue);

    this.updateDashboard(formValue);
    this.communicationService.subject.next(true);
  }

  showSuccess() {
    this.toastr.success('Dashboard was updated successfully!', 'Success!');
  }

  showErrorIfNameIsEmpty() {
      this.toastr.error('Dashboard name cannot be empty, please be sure to fill out the required fields', 'Error!');
  }

  showErrorIfNameAlreadyExists() {
    this.toastr.error('Dashboard name already exists, please be sure to use unique names', 'Error!')
  }


}
