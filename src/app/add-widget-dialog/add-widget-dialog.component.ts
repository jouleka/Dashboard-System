import { ChartType } from 'chart.js';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChartTypeModel } from '../models/chartType.model';
import { WidgetModel } from '../models/widget.module';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'app-add-widget-dialog',
  templateUrl: './add-widget-dialog.component.html',
  styleUrls: ['./add-widget-dialog.component.scss']
})
export class AddWidgetDialogComponent implements OnInit {

  widget: WidgetModel = new WidgetModel();
  chartList!: ChartTypeModel[];
  widgetList!: WidgetModel[];
  vsList: WidgetModel[] = [];
  chartTypeList: string[] = [
    'line',
    'bar',
    'pie'
  ];
  dashboardId!: string;
  widgetDataModel: string[] = [
    'TemperatureData',
    'GasCosts',
    'HeatData',
    'AcidEmission',
    'CompanyBudget',
    'EnergyConsumption'
  ]
  selectedValue!: any;

  constructor(
    private widgetService: WidgetService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddWidgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.dashboardId = data;
     }

    ngOnInit(): void {
      console.log(this.dashboardId);

    }

    filteredDataModels(event: any) {
      console.log("filter event", event);

      this.vsList = Object.assign([],this.widgetList);
      this.vsList = this.vsList.filter(
        (widgetDataType) =>
          event.source.value.wid == widgetDataType.chartType
      );
    }

    goToWidgetList(id: any) {
      this.router.navigate(['api/dashboard/view/' + id]);
    }

    onSubmit() {
      this.widget.dashboardId = this.dashboardId;
      this.widgetService.addWidget(this.widget).subscribe((data) => {
        console.log(data);
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
      }
     );
    }

    showSuccess() {
      this.toastr.success('Widget was added successfully!', 'Success!');
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

    refresh() {
      window.location.reload();
    }

  }
