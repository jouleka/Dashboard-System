import { DeleteWidgetDialogComponent } from './../delete-widget-dialog/delete-widget-dialog.component';
import { WidgetUpdateDialogComponent } from './../widget-update-dialog/widget-update-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable } from 'angular-gridster2';
import { AddWidgetDialogComponent } from '../add-widget-dialog/add-widget-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { WidgetModel } from '../models/widget.module';
import { WidgetService } from '../services/widget.service';
import { InjectionToken } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WebSocketService } from '../services/web-socket.service';
import { CommunicationService } from '../services/communication.service';


interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {


  MAT_DIALOG_DATA!: InjectionToken<any>;
  dashboardId!: any;
  options!: Safe;
  dashboard!: Array<GridsterItem>;
  datasource: any[] = [];
  widget: WidgetModel = new WidgetModel;
  newWidgetData!: WidgetComponent;
  temperatureData!: any;
  gasCosts!: any;
  heatData!: any;
  acidEmission!: any;
  companyBudget!: any;
  energyConsumption!: any;
  status: boolean = true;


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];
  // public barChartColors: Color[] = [
  //   { backgroundColor: 'red' },
  // ]

  constructor(private widgetService: WidgetService, private communicationService: CommunicationService, private dialog: MatDialog, private activatedRouter: ActivatedRoute, private router: Router,
    private toastr: ToastrService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.dashboardId = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.dashboardId);

    this.getWidgetById(this.dashboardId);
    this.webSocket()

    this.options = {
      // gridType: GridType.Fit,
      // compactType: CompactType.CompactLeft,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    this.datasource = [];
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  // }

  webSocket() {
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, (frame: any) => {

      stompClient.subscribe('/topic/notification', (notifications: any) => {

        this.barChartLabels = Object.keys(JSON.parse(notifications.body));

        // console.log(JSON.parse(notifications.body));


        this.gasCosts = JSON.parse(notifications.body).gasCosts;
        this.temperatureData = JSON.parse(notifications.body).temperatureData;
        this.companyBudget = JSON.parse(notifications.body).companyBudget;
        this.energyConsumption = JSON.parse(notifications.body).energyConsumption;
        this.heatData = JSON.parse(notifications.body).heatData;
        this.acidEmission = JSON.parse(notifications.body).acidEmission;

        this.updateChartData();

      })
    }, (error: any) => {
      this.sendMessage();
      console.log('helo');

    });
  }

  sendMessage() {
    // send message to subscribers via observable subject
    this.communicationService.sendMessage('error');
}

  updateChartData() {
    let newData = [{
      data: [this.acidEmission, this.gasCosts, this.heatData, this.temperatureData, this.companyBudget, this.energyConsumption], label: 'Widget Data'
    }]
    this.barChartData = (newData);
  }

  addWidget() {
    this.widget.dashboardId = this.dashboardId;

    this.widgetService.addWidget(this.widget).subscribe((data) => {
      console.log(data);

    }, (error) => console.log(error)
    );
  }

  getWidgetById(id: any) {
    this.widgetService.getDashboardWidgetById(id).subscribe((data) => {
      this.datasource = data;
    })
  }

  getWidgetList() {
    this.widgetService.getAllWidgets().subscribe((data) => {

      this.datasource = data;
      console.log(this.datasource);

    })
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

  deleteWidgetById(id: string) {
    this.widgetService.deleteWidgetById(id).subscribe((data) => {
      console.log(data);

    },
      (error) => {
        console.log(error)

      })
  }

  refresh() {
    window.location.reload();
  }

  addDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.dashboardId;
    let dialogRef = this.dialog.open(AddWidgetDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {

    });
  }

  goToWidgetList(id: any) {
    this.router.navigate(['api/dashboard/view/' + id]);
  }


  deleteDialog(id: string) {
    let dialogRef = this.dialog.open(DeleteWidgetDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (`${result}` == 'true') {
        this.deleteWidgetById(id);
        this.refresh();
        this.showSuccess();
      }
    });
  }

  updateDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    const secDialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    // secDialogConfig.data = this.dashboardId;
    let dialogRef = this.dialog.open(WidgetUpdateDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

    });
  }

  updateCoordinates() {
    this.widgetService.updateWidgetCoordinates(this.datasource).subscribe((data) => {
      console.log(data);
    })
  }

  showSuccess() {
    this.toastr.success('Widget was deleted permanently!', 'Success!');
  }

  showError() {
    this.toastr.error('There was an error please do try again', 'Error!');
  }
}
