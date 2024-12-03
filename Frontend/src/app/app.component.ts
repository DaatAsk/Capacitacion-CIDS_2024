import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
   @ViewChild('sidenav') sidenav!: MatSidenav;
   headerIconButton!: HTMLElement;
   closeIconButton!: HTMLElement;

   ngAfterViewInit() {
    this.headerIconButton = document.getElementById('header-icon-button') as HTMLElement;
    }

   toggleSidenav() {
    this.sidenav.toggle();
    setTimeout(() => {
      this.headerIconButton.blur();
      }, 0);
     }

    closeSidenav() {
      this.sidenav.close();
    }
  }
