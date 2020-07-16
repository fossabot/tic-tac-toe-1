import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private titleSuffix: string = ' — TicTacToe';

  constructor(private titleService: Title) {}

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle + this.titleSuffix);
  }
}
