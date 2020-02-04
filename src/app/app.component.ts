import { Component, OnInit } from "@angular/core";
import { CoachingBotService } from "./services/coachingbot.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  logs = "";

  constructor(private readonly coachingBot: CoachingBotService) {}

  ngOnInit() {
    this.log("Welcome to CodeSandbox!");

    this.coachingBot.getMembers().subscribe(members => {
      this.log(JSON.stringify(members));
    });
  }

  private log(line: string) {
    this.logs += `\n> ${line}`;
  }
}
