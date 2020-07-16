import { Component } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  public readonly options: Array<Object> = [
    { name: 'Homepage', link: '/' },
    { name: 'Create new room', link: '/create-room' },
    { name: 'Tournaments', link: '/tournaments' },
    { name: 'Leaderboard', link: '/leaderboard' },
  ];

  public sidebarState: boolean = false;
  public toggleSidebar(): void {
    this.sidebarState = !this.sidebarState;
  }
}
