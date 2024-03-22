import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Book Exchange Admin';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
