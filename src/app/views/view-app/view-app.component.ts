import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'view-app',
  imports: [RouterOutlet],
  templateUrl: './view-app.component.html',
})
export class ViewAppComponent {


  constructor(private router: Router){
    this.browserRefreshed();
  }

  private browserRefreshed(){
    
    const navEntries = performance.getEntriesByType("navigation");
    const navType = (navEntries[0] as PerformanceNavigationTiming)?.type;

    if (navType === 'reload') {
      this.router.navigate(['/']);
    }
  
  }
}
