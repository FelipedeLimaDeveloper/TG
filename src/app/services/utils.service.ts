import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private times: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() { }

  get isFirstTimeObservable() {
    return this.times.asObservable();
  }

  isFirstTime(){
      this.times.next(false);
  }
  resetObservable () {
    this.times.next(true);
  }
}
