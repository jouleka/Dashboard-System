import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule ,SidebarComponent, ToastrModule.forRoot({
            preventDuplicates: true,
            resetTimeoutOnDuplicate: true,
            includeTitleDuplicates: true,
            timeOut: 2000,
            extendedTimeOut: 2000,
            progressBar: true,
            progressAnimation: "decreasing",
            tapToDismiss: true
        })],
  providers: [provideZoneChangeDetection()],
  bootstrap: [AppComponent]
})
export class AppModule {}
