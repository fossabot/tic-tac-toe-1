import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { TitleService } from '@app/service/title.service';

import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: TitleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) child = child.firstChild;
          if (child.snapshot.data['title']) return child.snapshot.data['title'];
          return 'Unnamed page';
        })
      )
      .subscribe((ttl: string) => this.titleService.setTitle(ttl));
  }
}
