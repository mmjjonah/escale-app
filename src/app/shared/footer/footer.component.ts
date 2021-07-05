import { Component } from '@angular/core';
import {_c} from '../../config/constants'

@Component({
    moduleId: module.id,
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {
  projectDateRelease = _c.projectDateRelease
}
