import { Injectable } from "@angular/core";
import { Observable, of as observableOf, throwError } from "rxjs";

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  team: string;
  position: string;
  active: boolean;
}

export interface Sprint {
  id: number;
  name: string;
  description: string;
  startDate: number;
  endDate: number;
}

export interface Feedback {
  id: number;
  sprintId: number;
  teamLeadId: number;
  teamMemberId: number;
  agenda: string;
  discussion: string;
  actionItems: string;
}

const DEFAULT_MEMBERS: Member[] = [
  {
    id: 0,
    firstName: "John",
    lastName: "Snow",
    team: "GSOC",
    position: "Lord Commander of the Night's Watch",
    active: true
  },
  {
    id: 1,
    firstName: "Winnie",
    lastName: "the Pooh",
    team: "GSOC",
    position: "Bear",
    active: true
  }
];

/** Service connecting to the fake backend -- since all updates are stored locally. */
@Injectable()
export class CoachingBotService {
  members: Member[] = DEFAULT_MEMBERS;
  sprints: Sprint[] = [];
  feedbacks: Feedback[] = [];

  reset() {
    this.members = DEFAULT_MEMBERS;
    this.sprints = [];
    this.feedbacks = [];
  }

  /** Creates a member. */
  addMember(partial: Partial<Member>): Observable<boolean> {
    const member: Member = {
      id: this.members.length,
      firstName: partial.firstName || "???",
      lastName: partial.lastName || "???",
      team: partial.team || "???",
      position: partial.position || "???",
      active: !!partial.active
    };
    this.members.push(member);
    return observableOf(true);
  }

  /** Updates a member of the given id. */
  editMember(partial: Partial<Member>): Observable<Member> {
    if (partial.id === undefined) {
      return throwError(new Error("id is required"));
    }
    if (partial.id >= this.members.length) {
      return throwError(new Error(`unknown member id ${partial.id}`));
    }

    const member = this.members[partial.id];

    member.firstName = partial.firstName || member.firstName;
    member.lastName = partial.lastName || member.lastName;
    member.team = partial.team || member.team;
    member.position = partial.position || member.position;
    member.active =
      partial.active === undefined ? member.active : partial.active;

    this.members[partial.id] = member;

    return observableOf(member);
  }

  /** Retrieves all members. */
  getMembers(): Observable<Member[]> {
    return observableOf(this.members);
  }

  /** Creates a sprint record. */
  addSprint(partial: Partial<Sprint>): Observable<boolean> {
    const sprint: Sprint = {
      id: this.members.length,
      name: partial.name || "???",
      description: partial.description || "???",
      startDate: partial.startDate || new Date().getTime(),
      endDate: partial.endDate || new Date().getTime()
    };

    // Fake error checking.
    if (sprint.endDate < sprint.startDate) {
      return throwError(new Error("end date < start date"));
    }

    this.sprints.push(sprint);
    return observableOf(true);
  }

  /** Updates a sprint record given id. */
  editSprint(partial: Partial<Sprint>): Observable<Sprint> {
    if (partial.id === undefined) {
      return throwError(new Error("id is required"));
    }
    if (partial.id >= this.sprints.length) {
      return throwError(new Error(`unknown sprint id ${partial.id}`));
    }
    if (partial.endDate < partial.startDate) {
      return throwError(new Error("end date < start date"));
    }

    const sprint = this.sprints[partial.id];

    sprint.name = partial.name || sprint.name;
    sprint.description = partial.description || sprint.description;
    sprint.startDate = partial.startDate || sprint.startDate;
    sprint.endDate = partial.endDate || sprint.endDate;

    this.sprints[partial.id] = sprint;

    return observableOf(sprint);
  }

  /** Retrieves all sprint records. */
  getSprints(): Observable<Sprint[]> {
    return observableOf(this.sprints);
  }

  /** Creates a sprint feedback record. */
  addFeedback(partial: Partial<Feedback>): Observable<boolean> {
    if (partial.sprintId === undefined) {
      return throwError(new Error("sprintId is required"));
    }
    if (partial.teamLeadId === undefined) {
      return throwError(new Error("teamLeadId is required"));
    }
    if (partial.teamMemberId === undefined) {
      return throwError(new Error("teamMemberId is required"));
    }

    const feedback: Feedback = {
      id: this.feedbacks.length,
      sprintId: partial.sprintId,
      teamLeadId: partial.teamLeadId,
      teamMemberId: partial.teamMemberId,
      agenda: partial.agenda || "???",
      discussion: partial.discussion || "???",
      actionItems: partial.actionItems || "???"
    };

    if (partial.sprintId >= this.sprints.length) {
      return throwError(new Error(`unknown sprintId ${partial.sprintId}`));
    }
    if (partial.teamLeadId >= this.members.length) {
      return throwError(new Error(`unknown partial.teamLeadId ${partial.teamLeadId}`));
    }
    if (partial.teamMemberId >= this.members.length) {
      return throwError(new Error(`unknown partial.teamMemberId ${partial.teamMemberId}`));
    }

    this.feedbacks.push(feedback);
    return observableOf(true);
  }

  /** Retrieves all sprint feedback records. */
  getFeedbacks(): Observable<Feedback[]> {
    return observableOf(this.feedbacks);
  }
}
