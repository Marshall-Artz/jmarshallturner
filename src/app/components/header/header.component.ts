import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  isRaisedButton: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveLink();
      });
  }

  private updateActiveLink() {
    const currentRoute = this.activatedRoute.firstChild?.snapshot.routeConfig?.path;
  }

  toggleButtonStyle() {
    this.isRaisedButton = !this.isRaisedButton;
  }
}
