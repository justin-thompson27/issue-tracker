import type { Issue, IssueUserRef } from "./data/issue.js";


// Who may edit an issue's title, description, steps or priority?
// Only the person who wrote it.
export function canEditIssue(issue: Issue, user: IssueUserRef): boolean { //issue author takes type IssueUserRef which has two properties userid and fullname 
  return issue.author.userId === user.userId;
}

// Who may work on an issue (move it between open and in-progress,
// add test cases, log hours, or hand it off)? The person it is assigned to.
export function canWorkOnIssue(issue: Issue, user: IssueUserRef): boolean {
  return issue.assignedTo?.userId === user.userId; //The ?. means "if there is an assignee, look at their id, otherwise give undefined". An unassigned issue therefore matches nobody, so nobody may work on it yet.
}


// Who may delete one particular comment? The person who wrote it.
export function canDeleteComment(  issue: Issue, commentId: string, user: IssueUserRef,): boolean {
  const comment = issue.comments.find((c) => c._id === commentId);
  return comment?.userId === user.userId; //if the comment is found and comment's author id is equal to user.userId than it returns true , if the comment id doesn't match of exist it returns false
}
