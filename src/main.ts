import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideTippyConfig, tooltipVariation, popperVariation } from '@ngneat/helipopper';


bootstrapApplication(AppComponent, {
  providers: [
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      }
    })
  ]
})
