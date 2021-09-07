import { WidgetComponent } from './widget/widget.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: 'api/home-page', pathMatch: 'full' },
  { path: 'api/home-page', component: HomePageComponent },
  { path: 'api/dashboard', component: DashboardComponent},
  { path: 'api/dashboard/update/:id', component: UpdateDialogComponent },
  { path: 'api/dashboard/view/:id', component: WidgetComponent},
  { path: 'api/widget', component: WidgetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
