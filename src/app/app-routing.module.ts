import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'api/home-page', pathMatch: 'full' },
  { path: 'api/home-page', loadComponent: () => import('./home-page/home-page.component').then(module => module.HomePageComponent) },
  { path: 'api/dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(module => module.DashboardComponent)},
  { path: 'api/dashboard/update/:id', loadComponent: () => import('./update-dialog/update-dialog.component').then(module => module.UpdateDialogComponent) },
  { path: 'api/dashboard/view/:id', loadComponent: () => import('./widget/widget.component').then(module => module.WidgetComponent)},
  { path: 'api/widget', loadComponent: () => import('./widget/widget.component').then(module => module.WidgetComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
