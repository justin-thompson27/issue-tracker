# Permissions

## Permission Table

| What a person does                          | Permission           | Dev | BA | QA | PM | TM | Why                 |
|--------------------------------------------|----------------------|-----|----|----|----|----|----------------------|
| Classify an issue                          | `issue:classify`     |     | Y  |    |    |    | Req. 6               |
| Create an issue                            | Any signed-in user   |     |    |    |    |    | Req. 3               |
| Close an issue                             | `issue:close`        |     | Y  |    |    |    | Req. 10              |
| Edit an issue's title, description, and steps | `issue:edit`      |     |    |    |    |    | Note: only the author|
| Change status between open and in-progress | `issue:status`       | Y   |    |    |    |    | Judgment             |
| Assign an issue                            | `issue:assign`       |     |    |    |    | Y  | Judgment             |
| Add a comment                              | Any signed-in user   |     |    |    |    |    | Req. 5               |
| Delete a comment                           | `issue:deleteComment`|None |None|None|None|None| Judgment             |
| Add a test case                            | `issue:addTestCase`  |     |    | Y  |    |    | Req. 7               |
| Mark a test case passed or failed          | `issue:markTestCase` |     |    | Y  |    |    | Req. 7               |
| Delete an issue                            | `issue:delete`       | None|None|None|None|None| Req. 10          |
| Change someone's role                      | `user:changeRole`    |     |    |    |    | Y  | Judgment             |
| Change issue priority                     | `issue:changePriority`|     | Y  |    | Y  | Y  | Judgment             |
| Add a time log                             | `issue:addTimeLog`   | Y   |    |    |    |    | Req. 8               |
| Record fixed version and date              | `issue:recordFixed`  | Y   |    |    |    |    | Req. 9               |
| View the issue list (`GET /issues`)        | Any signed-in user   |     |    |    |    |    | Judgment             |
| View an issue (`GET /issues/:id`)          | Any signed-in user   |     |    |    |    |    | Judgment             |

Someone with no role can create an issue/comment but can’t edit unless they are the author.

## Ownership rules

| Action                                 | Who, besides the role                                                                | Which sentence says so |
|----------------------------------------|--------------------------------------------------------------------------------------|------------------------|
| Edit an issue's title, desc, and steps | Only the issue's author                                                              | Note                   |
| Delete a comment                       | No user                                                                              | Req. 10                |
| Add time log hours                     | Only the assigned dev                                                                | Req. 8                 |
| Add fixed info                         | Only the assigned dev                                                                | Req. 9                 |
| Assign an issue                        | The person being assigned must be a Developer, Business Analyst, or Quality Analyst  | Req. 4                 |

## Gaps and judgement calls

What may a Product Manager do? (Requirements 2 to 10 never mention the role.)
**The product manager is allowed to change priority and they are allowed the same permissions that all users get at base. Being creating an issue , adding comments and viewing issues. If PM was given permissions to delete data such as issues it would violate requirement 10. **

What may a Technical Manager do? Who should hand out roles, and why not let everybody pick their own?
**The technical manager is in charge of assigning roles. Since only person is assigning roles there is a risk of someone being assigned the wrong role and gain access to permission they shouldn’t if no one is double checking it. Allowing people to choose their own roles would give them access to permissions that they shouldn’t.**

Who may delete an issue? Requirement 10 says issues are retained indefinitely. Does anyone get an exception?
**Nobody may delete an issue. The only exception would be for a manager, in the case of overflow or data corruption.**

Who may assign an issue to a person, and who may delete somebody else's comment?
**A technical manager may assign an issue to a dev, QA, and . No one can delete comments**

Who may change an issue's priority? The Note lists title, description, and steps to reproduce for the author, but PATCH /issues/:id also carries priority.
**A technical manager, product manager or a business analyst may change an issue’s priority.**

What does a person with no role see and do?
**Someone with no role can create an issue/comment but can’t edit unless they are the author.**

Judgement for Change status
**Bas change status as they montior who is working on issues and get to decide what issues are closed. A assigned developer would decide if it is in-progess or open.**

Judgment for Assign issue
**A technical manager may assign an issue to a dev, QA, and BA. No one can delete comments**

Judgement for Change someone's role
**Technical Manager is in charge of the internal coding so they should be the one changing people's roles. If everyone could pick their own role they could pick roles that aren’t suited for their skillset.**

Judgement for Change priority
**A technical manager, product manager, or a business analyst may change an issue’s priority.**

Judgement for Get /issues and GET /issues/:id
**Any user should be able to view issues.**