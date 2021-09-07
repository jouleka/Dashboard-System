import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import { GridsterModule } from 'angular-gridster2';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableFilterModule } from 'mat-table-filter';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { WidgetComponent } from './widget/widget.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddWidgetDialogComponent } from './add-widget-dialog/add-widget-dialog.component';
import { DeleteWidgetDialogComponent } from './delete-widget-dialog/delete-widget-dialog.component';
import { WidgetUpdateDialogComponent } from './widget-update-dialog/widget-update-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { DisableDialogComponent } from './disable-dialog/disable-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    DeleteDialogComponent,
    UpdateDialogComponent,
    WidgetComponent,
    HomePageComponent,
    AddWidgetDialogComponent,
    DeleteWidgetDialogComponent,
    WidgetUpdateDialogComponent,
    DisableDialogComponent,
  ],
  entryComponents: [DeleteDialogComponent, UpdateDialogComponent, DeleteWidgetDialogComponent, AddWidgetDialogComponent, WidgetUpdateDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableFilterModule,
    MatSortModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatCardModule,
    GridsterModule,
    ChartsModule,

    ToastrModule.forRoot({
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
      includeTitleDuplicates: true,
      timeOut: 2000,
      extendedTimeOut: 2000,
      progressBar: true,
      progressAnimation: "decreasing",
      tapToDismiss: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
