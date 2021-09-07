import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WidgetModel } from '../models/widget.module';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-widget-update-dialog',
  templateUrl: './widget-update-dialog.component.html',
  styleUrls: ['./widget-update-dialog.component.scss']
})
export class WidgetUpdateDialogComponent implements OnInit {

  newWidget: WidgetModel = new WidgetModel;
  dashboardId!: string;
  datasource: any[] = [];
  widgetForm!: FormGroup;
  widget!: WidgetModel;
  id!: string;
  chartTypeList: string[] = [
    'line',
    'bar',
    'pie'
  ];
  widgetDataModel: string[] = [
    'Co2Emissions',
    'RainQuantity',
    'TemperatureData',
    'GasCosts',
    'HeatData',
    'AcidEmission',
    'Refrigeration',
    'CompanyBudget',
    'EnergyConsumption'
  ]

  constructor(
    private fb: FormBuilder,
    private widgetService: WidgetService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<WidgetUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.id = data;
     }

  ngOnInit(): void {

    this.initForm();

    this.widgetService.getWidgetById(this.id).subscribe(data => {
      this.widget = data;
      console.log(data);

      this.editForm();
    }, error => console.log(error));


  }

  getWidgetById(id: any) {
    this.widgetService.getDashboardWidgetById(id).subscribe((data) => {
      this.datasource = data;
    })
  }

  onSubmit(formValue: any) {
    this.widget.widgetName = formValue.widgetName;
    this.widget.widgetDescription = formValue.widgetDescription;
    this.widget.chartType = formValue.chartType;
    this.widget.widgetDataModels = formValue.widgetDataModels
    this.widget.frequency = formValue.frequency;
    this.widgetService.updateWidget(this.id, this.widget).subscribe((data) => {
      this.refresh();
      this.showSuccess();
    }, (error) => {
      if(this.widget.widgetName.length === 0 || this.widget.widgetName === undefined || this.widget.widgetName === null) {
        this.showErrorIfNameIsEmpty();

      }else if(this.widget.chartType === undefined || this.widget.chartType === null) {
        this.showErrorIfChartTypeIsEmpty();
      }else if(this.widget.widgetDataModels === undefined || this.widget.widgetDataModels === null) {
        this.showErrorIfWidgetDataIsEmpty();
      }else {
        this.showErrorIfNameAlreadyExists();
      }
    })

  }

  refresh() {
    window.location.reload();
  }

  // compareFn(c1: any, c2: any): boolean {
  //   return c1 && c2 ? c1.id === c2.id : c1 === c2;
  // }

  initForm() {
    this.widgetForm = new FormGroup({
      widgetName: this.fb.control(''),
      widgetDescription: this.fb.control(''),
      chartType: this.fb.control(''),
      widgetDataModels: this.fb.control(''),
      frequency: this.fb.control('')
    });
  }

  editForm() {
    this.widgetForm.patchValue({
      widgetName: this.widget.widgetName,
      widgetDescription: this.widget.widgetDescription,
      chartType: this.widget.chartType,
      widgetDataModels: this.widget.widgetDataModels,
      frequency: this.widget.frequency
    })
  }

  showSuccess() {
    this.toastr.success('Widget was updated successfully!', 'Success!');
  }

  showErrorIfNameAlreadyExists() {
    this.toastr.error('Widget name already exists, please be sure to use unique names.', 'Error!')
  }

  showErrorIfNameIsEmpty() {
    this.toastr.error('Widget name cannot be empty, please be sure to fill out the required fields.', 'Error!');
  }

  showErrorIfWidgetDataIsEmpty() {
    this.toastr.error('There needs to be selected at least one widget data, please be sure to select one.', 'Error!');
  }

  showErrorIfChartTypeIsEmpty() {
    this.toastr.error('There needs to be selected at least one chart type, please be sure to select one.', 'Error!');
  }

  showErrorIfMoreThanOneFieldIsEmpty() {
    this.toastr.error('Please do fill out all the required fields.', 'Error!');
  }
}
