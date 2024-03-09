import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() tabPanel: any;
  links = ['About', 'Projects'];
  activeLink: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveLink();
      });
  }

  private updateActiveLink() {
    const currentRoute = this.activatedRoute.firstChild?.snapshot.routeConfig?.path;
    this.activeLink = currentRoute && this.links.includes(currentRoute) ? currentRoute : this.links[0];
    this.changeDetector.detectChanges();
  }

  setActiveLink(link: string) {
    this.activeLink = link;
    this.changeDetector.detectChanges();
  }

  isActiveLink(link: string) {
    return this.activeLink === link;
  }
}
