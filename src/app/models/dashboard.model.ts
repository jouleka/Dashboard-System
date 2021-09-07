import { WidgetModel } from './widget.module';

export class DashboardModel {
  id?: string;
  dashboardName!: string;
  dashboardDescription!: string;
  date?: Date;
  status?: boolean;
}
