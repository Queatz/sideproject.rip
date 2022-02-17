import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subject} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly destroyed = new Subject<void>()

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }

}
