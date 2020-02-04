import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoachingBotService } from "./coachingbot.service";

@NgModule({
  imports: [BrowserModule],
  providers: [CoachingBotService]
})
export class ServicesModule {}
