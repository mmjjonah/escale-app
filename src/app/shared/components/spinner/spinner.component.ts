import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ToolsService} from '../../services/tools/tools.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  show = false
  subscription = new Subscription()
  constructor(
    private tools$: ToolsService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.tools$.spinner.subscribe(res => {
        this.show = res
        this.cd.detectChanges()
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
