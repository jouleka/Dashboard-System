import { NgAnalyzedFile } from '@angular/compiler';
import { ChartTypeModel } from './chartType.model';

export class WidgetModel {
  id?: string;
  widgetName!: string;
  widgetDescription?: string;
  datasource!: string;
  chartType?: ChartTypeModel;
  widgetDataModels?: any;
  frequency!: number;
  dashboardId?: string;
  cols?: any;
  rows?: any;
  y?: any;
  x?: any
  // deleted?: boolean;
  // date?: Date;
  // dataInformation?: DataInfoModel[];
}
