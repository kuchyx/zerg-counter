import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  counter!: number;
  incrementCounter = 1000;
  constructor(private storage: Storage) { 
    this.storage.create();
    storage.get(`counter`).then((val: any) => {
      this.counter = val;
    });
    let lastSyncDifference = 0;
    storage.get(`date`).then((val: any) => {
      console.log(`Date.now() - lastSync`, Date.now() - val);
      lastSyncDifference = Date.now() - val;
      console.log(`lastSyncDifference: `, lastSyncDifference);
      console.log(`lastSyncDifference >= this.incrementCounter`, lastSyncDifference >= this.incrementCounter);
      console.log(`lastSyncDifference / this.incrementCounter`, lastSyncDifference / this.incrementCounter);
  
      if(lastSyncDifference >= this.incrementCounter) {
        
        for(let i = 0; i < Math.floor(lastSyncDifference / this.incrementCounter); i++) {
          this.counter++;
        }
      }
    });

    storage.set(`date`, Date.now());

  }

  ngOnInit() {
    /*
    setInterval(() => {
      this.counter++;
  }, this.incrementCounter); */
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
  
  decrement() {
    console.log(`this.counter: `, this.counter);
    if(this.counter > 0) {
      this.counter--;
      return;
    }
    this.counter = 0;
  }

}
