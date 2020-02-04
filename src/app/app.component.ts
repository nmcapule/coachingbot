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
    this.doSample();
  }

  /** Lines below are for demonstration purposes only on how to use the service. */
  private async doSample() {
    this.log("Welcome to CoachingBot!");

    const m1 = await this.coachingBot.getMembers().toPromise();
    this.log("Members:", JSON.stringify(m1, undefined, 2));

    this.log("Add member and edit John.");

    await this.coachingBot.addMember({ firstName: "Hello" });
    await this.coachingBot.editMember({
      id: 0,
      firstName: "Juan",
      lastName: "Nyebe"
    });

    const m2 = await this.coachingBot.getMembers().toPromise();
    this.log("Members:", JSON.stringify(m2, undefined, 2));
  }

  private log(...lines: string[]) {
    this.logs += `\n> ${lines.join(" ")}`;
  }
}
