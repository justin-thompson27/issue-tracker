
Request
Body
Expected
Notes
GET /health
—
My Results :
200 
{
    "status": "ok"
}
200
{"status":"ok"}



GET /issues AUTOMATED
—
My Results: 
200
[
    {
        "_id": "6aad7bbb36e840ccf9e3cca2",
        "title": "Payment processing failed",
        "description": "Server 500 error upon processing payment",
        "stepsToReproduce": " 1. Click the payment button",
        "status": "in-progress",
        "priority": "high",
        "classification": "approved",
        "createdOn": "2026-09-18T17:58:19.071Z",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "assignedTo": {
            "userId": "6aad783119cdc5d65b974899",
            "fullName": "Claret Flintstone"
        }
    },
    {
        "_id": "6aad7c1836e840ccf9e3cca3",
        "title": "Queries failing to find proper inventory",
        "description": "Search for any item that we sell in the search bar and nothing returns",
        "stepsToReproduce": " 1.Type the name in the search bar and hit enter",
        "status": "closed",
        "priority": "medium",
        "classification": "approved",
        "createdOn": "2026-09-18T17:59:52.840Z",
        "author": {
            "userId": "6aad78e531ec9c91694e7dd1",
            "fullName": "Starlight Billy"
        },
        "assignedTo": {
            "userId": "6aad78f57846511dfa2eeaad",
            "fullName": "Justin Thompson"
        },
        "testCases": [
            {
                "_id": "6aad790e14f21324c417998a",
                "userId": "6aad791fd9f9e73be23e0353",
                "passed": true,
                "createdOn": "2026-09-18T17:59:52.840Z"
            }
        ],
        "timeLog": [
            {
                "userId": " 6aad791fd9f9e73be23e0353 ",
                "hoursWorked": 45,
                "passed": true,
                "loggedOn": "2026-09-18T17:59:52.840Z"
            }
        ],
        "fixed": {
            "fixedBy": {
                "userId": "6aad78f57846511dfa2eeaad",
                "fullName": "Cissia"
            },
            "fixedOnVersion": "1.05",
            "fixedOnDate": "2026-09-18T17:59:52.840Z"
        }
    },
    {
        "_id": "6aad7c3636e840ccf9e3cca4",
        "title": "Failing to load images",
        "description": "Images of products improperly load",
        "stepsToReproduce": " Refresh any html page with images",
        "status": "in-progress",
        "priority": "low",
        "classification": "unapproved",
        "createdOn": "2026-09-18T18:00:22.921Z",
        "author": {
            "userId": "6aad7a7364b39ceca2b8d780",
            "fullName": "Remielle Dan"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Asaba Harumasa"
        },
        "testCases": [
            {
                "_id": "6aad7ac1949a30bdb0fe2bb4",
                "userId": "6aac4b7760201c5ed2bcea92",
                "passed": false,
                "createdOn": "2026-09-18T18:00:22.921Z"
            }
        ]
    },
    {
        "_id": "6aad8f5e36e840ccf9e3cca5",
        "title": "Constantly loading",
        "description": "Page loading freezes at 99%",
        "stepsToReproduce": " 1.Open the website from any source",
        "status": "open",
        "priority": "low",
        "classification": "unclassified",
        "createdOn": "2026-09-18T19:22:06.797Z",
        "author": {
            "userId": "6aac45663c299e5342891895",
            "fullName": "Justin Thompson"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Bob Bobbingson"
        },
        "comments": [
            {
                "id": "6aac4c59b8a607a4a4349492 ",
                "userId": " 6aac4ccba693bf19b2f497d6",
                "fullName": "Alice Hyacinth ",
                "comment": "Please fix as soon as possible the site is unusable ",
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "testCases": [
            {
                "_id": null,
                "userId": null,
                "passed": null,
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "timeLog": [
            {
                "userId": " ",
                "hoursWorked": null,
                "passed": null,
                "loggedOn": null
            }
        ],
        "fixed": {
            "fixedBy": {
                "userId": null,
                "fullName": null
            },
            "fixedOnVersion": null,
            "fixedOnDate": null
        }
    },
    {
        "_id": "6ab1a5eded6c39e542accc1d",
        "title": "Page failing to load",
        "description": "Page infinitely loads over and over again",
        "status": "open",
        "priority": "low"
    },
    {
        "_id": "6ab1a826777875318f9e87c1",
        "title": "Page failing 31",
        "description": "Page infinitely loads over 4242342and over again232",
        "status": "closed",
        "priority": "low"
    },
    {
        "_id": "6ab2babce85627dca1b48e94",
        "title": "Constantly loading",
        "description": "Page loading freezes at 99%",
        "stepsToReproduce": " 1.Open the website from any source",
        "status": "open",
        "priority": "low",
        "classification": "unclassified",
        "createdOn": "2026-09-22T17:28:28.267Z",
        "author": {
            "userId": "6aac45663c299e5342891895",
            "fullName": "Justin Thompson"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Bob Bobbingson"
        },
        "comments": [
            {
                "id": "6aac4c59b8a607a4a4349492 ",
                "userId": " 6aac4ccba693bf19b2f497d6",
                "fullName": "Alice Hyacinth ",
                "comment": "Please fix as soon as possible the site is unusable ",
                "createdOn": "2026-09-22T17:28:28.267Z"
            }
        ],
        "testCases": [
            {
                "_id": "6ab2b9b66581bb16fd574056",
                "userId": "6aac4b7760201c5ed2bcea92",
                "passed": false,
                "createdOn": "2026-09-22T17:28:28.267Z"
            }
        ],
        "timeLog": [
            {
                "userId": "6aac4b7760201c5ed2bcea92",
                "hoursWorked": 30,
                "passed": false,
                "loggedOn": "2026-09-22T17:28:28.267Z"
            }
        ]
    },
    {
        "_id": "6ab2bfb09d8414968b0cb035",
        "title": "Scroll wheel not working on website",
        "comments": [
            {
                "id": "6aada628b45b42fededdce80",
                "userId": "6aac4b7760201c5ed2bcea92",
                "fullName": "Bob Bobbingson",
                "comment": "This is really frustrating",
                "createdOn": "2026-09-22T17:49:43.272Z"
            }
        ],
        "testCases": [
            {
                "id": "6aada73af14493d53d58413f",
                "userId": "6aac4b7760201c5ed2bcea92",
                "fullName": "Bob Bobbingson",
                "passed": true,
                "createdOn": "2026-09-22T17:50:17.707Z"
            }
        ],
        "timeLog": [
            {
                "userId": "6aac4b7760201c5ed2bcea92",
                "hoursWorked": 10,
                "loggedOn": "2026-09-22T17:51:44.944Z"
            }
        ],
        "status": "closed"
    }
]
200
returns all 3 seeded issues


GET /issues/6ab2babce85627dca1b48e94 AUTOMATED
—
My Results:
200
{
    "_id": "6ab2babce85627dca1b48e94",
    "title": "Constantly loading",
    "description": "Page loading freezes at 99%",
    "stepsToReproduce": " 1.Open the website from any source",
    "status": "open",
    "priority": "low",
    "classification": "unclassified",
    "createdOn": "2026-09-22T17:28:28.267Z",
    "author": {
        "userId": "6aac45663c299e5342891895",
        "fullName": "Justin Thompson"
    },
    "assignedTo": {
        "userId": "6aac4b7760201c5ed2bcea92",
        "fullName": "Bob Bobbingson"
    },
    "comments": [
        {
            "id": "6aac4c59b8a607a4a4349492 ",
            "userId": " 6aac4ccba693bf19b2f497d6",
            "fullName": "Alice Hyacinth ",
            "comment": "Please fix as soon as possible the site is unusable ",
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "testCases": [
        {
            "_id": "6ab2b9b66581bb16fd574056",
            "userId": "6aac4b7760201c5ed2bcea92",
            "passed": false,
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "timeLog": [
        {
            "userId": "6aac4b7760201c5ed2bcea92",
            "hoursWorked": 30,
            "passed": false,
            "loggedOn": "2026-09-22T17:28:28.267Z"
        }
    ]
}
returns your first seeded issue (id 1)



GET /issues/999 AUTOMATED
—
My Results:
400
{
    "error": "Invalid issue id"
}
404
{"error":"Issue not found"}




POST /issues AUTOMATED
My Results:
201
{
    "acknowledged": true,
    "insertedId": "6ab2d74ad71b61d3a14ed802"
}

{"title":"New issue"}
201
created with status "open", priority "medium"




POST /issues AUTOMATED
{}
My Results:
400
{
    "error": "title is required"
}
400
{"error":"title is required"}; nothing added




PATCH /issues/6ab2babce85627dca1b48e94 AUTOMATED
{"status":"closed"}
200
My Results:
200
{
    "_id": "6ab2babce85627dca1b48e94",
    "title": "Constantly loading",
    "description": "Page loading freezes at 99%",
    "stepsToReproduce": " 1.Open the website from any source",
    "status": "closed",
    "priority": "low",
    "classification": "unclassified",
    "createdOn": "2026-09-22T17:28:28.267Z",
    "author": {
        "userId": "6aac45663c299e5342891895",
        "fullName": "Justin Thompson"
    },
    "assignedTo": {
        "userId": "6aac4b7760201c5ed2bcea92",
        "fullName": "Bob Bobbingson"
    },
    "comments": [
        {
            "id": "6aac4c59b8a607a4a4349492 ",
            "userId": " 6aac4ccba693bf19b2f497d6",
            "fullName": "Alice Hyacinth ",
            "comment": "Please fix as soon as possible the site is unusable ",
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "testCases": [
        {
            "_id": "6ab2b9b66581bb16fd574056",
            "userId": "6aac4b7760201c5ed2bcea92",
            "passed": false,
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "timeLog": [
        {
            "userId": "6aac4b7760201c5ed2bcea92",
            "hoursWorked": 30,
            "passed": false,
            "loggedOn": "2026-09-22T17:28:28.267Z"
        }
    ]
}
issue 1's status is now "closed"



PATCH /issues/999 AUTOMATED
{"status":"closed"}
404
My Results:
400
{
    "error": "Invalid issue id"
}
no issue with that id



DELETE /issues/26ab2d74ad71b61d3a14ed802 
—
My Results:
204

204
no response body



GET /issues/2
—
My Results:
400
{
    "error": "Invalid issue id"
}
404
confirms the delete above actually happened


DELETE /issues/999
—
My Results:
400
{
    "error": "Invalid issue id"
}
404
no issue with that id


Lab 04-01
Day 25 Results 


1 POST a valid issue body — confirm 201, and confirm the response's author matches your hardcoded placeholder, not anything you sent. AUTOMATED

http://localhost:3000/issues/
{
  "title": "1234564",
  "author": "adadfaf",
  "description": "Issue description",
  "stepsToReproduce": "Step 1, Step 2",
  "priority": "high"
}
201 
{
    "acknowledged": true,
    "insertedId": "6ab6df32debac92c32ca5d5b"
}
{
    "_id": "6ab6dff5d39531dcbd4a2e11",
    "title": "1234564",
    "description": "Issue description",
    "stepsToReproduce": "Step 1, Step 2",
    "priority": "high",
    "status": "open",
    "classification": "unclassified",
    "author": {
        "userId": "6aad780ce470879405ff14af",
        "fullName": "Miyabi Hoshimi"
    },
    "createdOn": "2026-09-25T20:56:21.752Z",
    "comments": [],
    "testCases": [],
    "timeLog": []
}

2 POST a body missing a required field (e.g. no title) — confirm 400 with a ValidationFailed error and a details array naming the missing field, not a 500 or a silently-created issue. AUTOMATED

http://localhost:3000/issues/
{
  "title": "1234564",
  "author": "adadfaf",
  "description": "Issue description",
  "stepsToReproduce": "Step 1, Step 2",
  
}
400

{
    "error": "ValidationFailed",
    "details": [
        {
            "path": "priority",
            "message": "Invalid option: expected one of \"low\"|\"medium\"|\"high\""
        }
    ]
}

3 POST a body that includes an author field of your own choosing — confirm the response's author is still your placeholder, not what you sent. This is the actual security property today's work exists to guarantee.


http://localhost:3000/issues/
{
  "title": "1234564",
  "author": "adadfaf",
  "description": "Issue description",
  "stepsToReproduce": "Step 1, Step 2",
  "priority": "high"
}
201
inserted json result 
{
    "title": "1234564",
    "description": "Issue description",
    "stepsToReproduce": "Step 1, Step 2",
    "priority": "high",
    "status": "open",
    "classification": "unclassified",
    "author": {
        "userId": "6aad780ce470879405ff14af",
        "fullName": "Miyabi Hoshimi"
    },
    "createdOn": "2026-09-25T20:56:21.752Z",
    "comments": [],
    "testCases": [],
    "timeLog": [],
    "_id": "6ab6dff5d39531dcbd4a2e11"
}




4 PATCH an existing issue with just one field (e.g. { "priority": "high" }) — confirm only that field changed, and every other field (including comments, testCases, timeLog) is untouched. AUTOMATED


http://localhost:3000/issues/6ab6dff5d39531dcbd4a2e11

{ "priority": "low" }

200

{
    "_id": "6ab6dff5d39531dcbd4a2e11",
    "title": "1234564",
    "description": "Issue description",
    "stepsToReproduce": "Step 1, Step 2",
    "priority": "low",
    "status": "open",
    "classification": "unclassified",
    "author": {
        "userId": "6aad780ce470879405ff14af",
        "fullName": "Miyabi Hoshimi"
    },
    "createdOn": "2026-09-25T20:56:21.752Z",
    "comments": [],
    "testCases": [],
    "timeLog": []
}

LAB 04-02
Day 26

1
PATCH /issues/:id/status with a valid value (e.g. { "status": "in-progress" }) — confirm 200, and confirm the response's status actually changed. AUTOMATED

http://localhost:3000/issues/6aad7bbb36e840ccf9e3cca2/status
{"status":"closed"}
200
{
    "_id": "6aad7bbb36e840ccf9e3cca2",
    "title": "Payment processing failed",
    "description": "Server 500 error upon processing payment",
    "stepsToReproduce": " 1. Click the payment button",
    "status": "closed",
    "priority": "high",
    "classification": "approved",
    "createdOn": "2026-09-18T17:58:19.071Z",
    "author": {
        "userId": "6aad780ce470879405ff14af",
        "fullName": "Miyabi Hoshimi"
    },
    "assignedTo": {
        "userId": "6aad783119cdc5d65b974899",
        "fullName": "Claret Flintstone"
    }
}

2 PATCH /issues/:id/status with an invalid value (e.g. { "status": "done" }) — confirm 400 with a ValidationFailed error naming status, not a 500 or a silent no-op. AUTOMATED

http://localhost:3000/issues/6aad7bbb36e840ccf9e3cca2/status
{"status":"done"}
400
{
    "error": "ValidationFailed",
    "details": [
        {
            "path": "status",
            "message": "Invalid option: expected one of \"open\"|\"in-progress\"|\"closed\""
        }
    ]
}

3 Repeat both of the above for PATCH /issues/:id/classify, using a valid and an invalid classification value. AUTOMATED


http://localhost:3000/issues/6ab2babce85627dca1b48e94/classify
{"classification":"unapproved"}
200
{
    "_id": "6ab2babce85627dca1b48e94",
    "title": "Constantly loading",
    "description": "Page loading freezes at 99%",
    "stepsToReproduce": " 1.Open the website from any source",
    "status": "closed",
    "priority": "low",
    "classification": "unapproved",
    "createdOn": "2026-09-22T17:28:28.267Z",
    "author": {
        "userId": "6aac45663c299e5342891895",
        "fullName": "Justin Thompson"
    },
    "assignedTo": {
        "userId": "13414",
        "fullName": "Alice"
    },
    "comments": [
        {
            "id": "6aac4c59b8a607a4a4349492 ",
            "userId": " 6aac4ccba693bf19b2f497d6",
            "fullName": "Alice Hyacinth ",
            "comment": "Please fix as soon as possible the site is unusable ",
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "testCases": [
        {
            "_id": "6ab2b9b66581bb16fd574056",
            "userId": "6aac4b7760201c5ed2bcea92",
            "passed": false,
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "timeLog": [
        {
            "userId": "6aac4b7760201c5ed2bcea92",
            "hoursWorked": 30,
            "passed": false,
            "loggedOn": "2026-09-22T17:28:28.267Z"
        }
    ]
}


http://localhost:3000/issues/6ab2babce85627dca1b48e94/classify
{"classification":"done"}
400
{
    "error": "ValidationFailed",
    "details": [
        {
            "path": "classification",
            "message": "Invalid option: expected one of \"unclassified\"|\"approved\"|\"unapproved\"|\"duplicate\""
        }
    ]
}


4 PATCH /issues/:id/assign with a complete { "userId", "fullName" } body — confirm the response's assignedTo matches exactly what you sent, unlike author's fixed placeholder from Lab 04-01. 



http://localhost:3000/issues/6ab2babce85627dca1b48e94/assign
{
  "userId": "2552552525252",
  "fullName": "Alice Thymefield"
}
200
{
    "_id": "6ab2babce85627dca1b48e94",
    "title": "Constantly loading",
    "description": "Page loading freezes at 99%",
    "stepsToReproduce": " 1.Open the website from any source",
    "status": "closed",
    "priority": "low",
    "classification": "unapproved",
    "createdOn": "2026-09-22T17:28:28.267Z",
    "author": {
        "userId": "6aac45663c299e5342891895",
        "fullName": "Justin Thompson"
    },
    "assignedTo": {
        "userId": "2552552525252",
        "fullName": "Alice Thymefield"
    },
    "comments": [
        {
            "id": "6aac4c59b8a607a4a4349492 ",
            "userId": " 6aac4ccba693bf19b2f497d6",
            "fullName": "Alice Hyacinth ",
            "comment": "Please fix as soon as possible the site is unusable ",
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "testCases": [
        {
            "_id": "6ab2b9b66581bb16fd574056",
            "userId": "6aac4b7760201c5ed2bcea92",
            "passed": false,
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "timeLog": [
        {
            "userId": "6aac4b7760201c5ed2bcea92",
            "hoursWorked": 30,
            "passed": false,
            "loggedOn": "2026-09-22T17:28:28.267Z"
        }
    ]
}


5 PATCH /issues/:id/assign with fullName missing — confirm 400. Then update TEST-RESULTS.md with today's results. AUTOMATED


http://localhost:3000/issues/6ab2babce85627dca1b48e94/assign
{
  "userId": "2552552525252"
  
}
400
{
    "error": "ValidationFailed",
    "details": [
        {
            "path": "fullName",
            "message": "Invalid input: expected string, received undefined"
        }
    ]
}


Day 28 Lab 04-03

POST /issues/:id/comments with a valid comment — confirm 201, and confirm the new comment's userId and fullName match your placeholder identity. AUTOMATED
 http://localhost:3000/issues/6ab2babce85627dca1b48e94/comments
{"comment": "This is a test comment."}
201
{
    "_id": "6ab2babce85627dca1b48e94",
    "title": "Constantly loading",
    "description": "Page loading freezes at 99%",
    "stepsToReproduce": " 1.Open the website from any source",
    "status": "closed",
    "priority": "low",
    "classification": "unapproved",
    "createdOn": "2026-09-22T17:28:28.267Z",
    "author": {
        "userId": "6aac45663c299e5342891895",
        "fullName": "Justin Thompson"
    },
    "assignedTo": {
        "userId": "2552552525252",
        "fullName": "Alice Thymefield"
    },
    "comments": [
        {
            "id": "6aac4c59b8a607a4a4349492 ",
            "userId": " 6aac4ccba693bf19b2f497d6",
            "fullName": "Alice Hyacinth ",
            "comment": "Please fix as soon as possible the site is unusable ",
            "createdOn": "2026-09-22T17:28:28.267Z"
        },
        {
            "_id": "868a3c6e-f480-4f15-835f-c1a46cd5593a",
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi",
            "comment": "I want the error message to be blue not red2",
            "createdOn": "2026-09-30T19:31:34.957Z"
        },
        {
            "_id": "f0b1e082-fb90-421c-888c-cfc5d91a4939",
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi",
            "comment": "This is a test comment.",
            "createdOn": "2026-10-01T20:43:52.033Z"
        }
    ],
    "testCases": [
        {
            "_id": "6ab2b9b66581bb16fd574056",
            "userId": "6aac4b7760201c5ed2bcea92",
            "passed": false,
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "timeLog": [
        {
            "userId": "6aac4b7760201c5ed2bcea92",
            "hoursWorked": 30,
            "passed": false,
            "loggedOn": "2026-09-22T17:28:28.267Z"
        }
    ]
}


2 POST /issues/:id/comments with an empty comment string — confirm 400 with a ValidationFailed error. AUTOMATED

http://localhost:3000/issues/6ab2babce85627dca1b48e94/comments
{"comment": ""}

{}
400
{
    "error": "ValidationFailed",
    "details": [
        {
            "path": "comment",
            "message": "comment is required"
        }
    ]
}

3 DELETE /issues/:id/comments/:commentId for a comment that exists — confirm 200, and confirm that comment (and only that one) is gone from the response. AUTOMATED

http://localhost:3000/issues/6ab2babce85627dca1b48e94/comments/f0b1e082-fb90-421c-888c-cfc5d91a4939
200
{
    "_id": "6ab2babce85627dca1b48e94",
    "title": "Constantly loading",
    "description": "Page loading freezes at 99%",
    "stepsToReproduce": " 1.Open the website from any source",
    "status": "closed",
    "priority": "low",
    "classification": "unapproved",
    "createdOn": "2026-09-22T17:28:28.267Z",
    "author": {
        "userId": "6aac45663c299e5342891895",
        "fullName": "Justin Thompson"
    },
    "assignedTo": {
        "userId": "2552552525252",
        "fullName": "Alice Thymefield"
    },
    "comments": [
        {
            "id": "6aac4c59b8a607a4a4349492 ",
            "userId": " 6aac4ccba693bf19b2f497d6",
            "fullName": "Alice Hyacinth ",
            "comment": "Please fix as soon as possible the site is unusable ",
            "createdOn": "2026-09-22T17:28:28.267Z"
        },
        {
            "_id": "868a3c6e-f480-4f15-835f-c1a46cd5593a",
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi",
            "comment": "I want the error message to be blue not red2",
            "createdOn": "2026-09-30T19:31:34.957Z"
        }
    ],
    "testCases": [
        {
            "_id": "6ab2b9b66581bb16fd574056",
            "userId": "6aac4b7760201c5ed2bcea92",
            "passed": false,
            "createdOn": "2026-09-22T17:28:28.267Z"
        }
    ],
    "timeLog": [
        {
            "userId": "6aac4b7760201c5ed2bcea92",
            "hoursWorked": 30,
            "passed": false,
            "loggedOn": "2026-09-22T17:28:28.267Z"
        }
    ]
}

4 POST /issues/:id/test-cases — confirm 201, and confirm the new test case's passed starts false. AUTOMATED


http://localhost:3000/issues/6ab2babce85627dca1b48e94/test-cases
201
{
    "_id": "6ab2babce85627dca1b48e94",
    "title": "Constantly loading",
    "description": "Page loading freezes at 99%",
    "stepsToReproduce": " 1.Open the website from any source",
    "status": "closed",
    "priority": "low",
    "classification": "unapproved",
    "createdOn": "2026-09-22T17:28:28.267Z",
    "author": {
        "userId": "6aac45663c299e5342891895",
        "fullName": "Justin Thompson"
    },
    "assignedTo": {
        "userId": "2552552525252",
        "fullName": "Alice Thymefield"
    },
    "comments": [
        {
            "id": "6aac4c59b8a607a4a4349492 ",
            "userId": " 6aac4ccba693bf19b2f497d6",
            "fullName": "Alice Hyacinth ",
            "comment": "Please fix as soon as possible the site is unusable ",
            "createdOn": "2026-09-22T17:28:28.267Z"
        },
        {
            "_id": "868a3c6e-f480-4f15-835f-c1a46cd5593a",
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi",
            "comment": "I want the error message to be blue not red2",
            "createdOn": "2026-09-30T19:31:34.957Z"
        }
    ],
    "testCases": [
        {
            "_id": "6ab2b9b66581bb16fd574056",
            "userId": "6aac4b7760201c5ed2bcea92",
            "passed": false,
            "createdOn": "2026-09-22T17:28:28.267Z"
        },
        {
            "_id": "ce953d0d-f56a-4d6c-b335-a220442a72fa",
            "userId": "6aad780ce470879405ff14af",
            "passed": false,
            "createdOn": "2026-10-01T20:50:42.089Z"
        }
    ],
    "timeLog": [
        {
            "userId": "6aac4b7760201c5ed2bcea92",
            "hoursWorked": 30,
            "passed": false,
            "loggedOn": "2026-09-22T17:28:28.267Z"
        }
    ]
}


5
PATCH /issues/:id/test-cases/:testCaseId with { "passed": true } — confirm 200, and confirm only that test case changed. Then update TEST-RESULTS.md with today's results. AUTOMATED

http://localhost:3000/issues/6ab2babce85627dca1b48e94/test-cases/ce953d0d-f56a-4d6c-b335-a220442a72fa

{"passed": true}
200
{
    "_id": "6ab2babce85627dca1b48e94",
    "title": "Constantly loading",
    "description": "Page loading freezes at 99%",
    "stepsToReproduce": " 1.Open the website from any source",
    "status": "closed",
    "priority": "low",
    "classification": "unapproved",
    "createdOn": "2026-09-22T17:28:28.267Z",
    "author": {
        "userId": "6aac45663c299e5342891895",
        "fullName": "Justin Thompson"
    },
    "assignedTo": {
        "userId": "2552552525252",
        "fullName": "Alice Thymefield"
    },
    "comments": [
        {
            "id": "6aac4c59b8a607a4a4349492 ",
            "userId": " 6aac4ccba693bf19b2f497d6",
            "fullName": "Alice Hyacinth ",
            "comment": "Please fix as soon as possible the site is unusable ",
            "createdOn": "2026-09-22T17:28:28.267Z"
        },
        {
            "_id": "868a3c6e-f480-4f15-835f-c1a46cd5593a",
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi",
            "comment": "I want the error message to be blue not red2",
            "createdOn": "2026-09-30T19:31:34.957Z"
        }
    ],
    "testCases": [
        {
            "_id": "6ab2b9b66581bb16fd574056",
            "userId": "6aac4b7760201c5ed2bcea92",
            "passed": false,
            "createdOn": "2026-09-22T17:28:28.267Z"
        },
        {
            "_id": "ce953d0d-f56a-4d6c-b335-a220442a72fa",
            "userId": "6aad780ce470879405ff14af",
            "passed": true,
            "createdOn": "2026-10-01T20:50:42.089Z"
        }
    ],
    "timeLog": [
        {
            "userId": "6aac4b7760201c5ed2bcea92",
            "hoursWorked": 30,
            "passed": false,
            "loggedOn": "2026-09-22T17:28:28.267Z"
        }
    ]
}

day 30 LAB 04-04

1 GET /issues?status=open — confirm every result actually has status: "open".

200 
[
    {
        "_id": "6abd5aed75d4c7d96309e8c3",
        "title": "12341415153131afagaghaahah564",
        "description": "Issue description",
        "stepsToReproduce": "Step 4, Step 5",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-30T18:54:37.825Z",
        "comments": [],
        "testCases": [
            {
                "_id": "117cff42-055c-4b6b-abf8-0945644a6340",
                "userId": "6aad780ce470879405ff14af",
                "passed": false,
                "createdOn": "2026-10-01T20:22:32.135Z"
            },
            {
                "_id": "ed4ce8ea-856b-49ff-85ec-b368c9c5d792",
                "userId": "6aad780ce470879405ff14af",
                "passed": true,
                "createdOn": "2026-10-01T20:22:52.836Z"
            }
        ],
        "timeLog": []
    },
    {
        "_id": "6ab6dff5d39531dcbd4a2e11",
        "title": "1234564",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:56:21.752Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6df32debac92c32ca5d5b",
        "title": "1234564",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:53:06.788Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6de07836256d67905f955",
        "title": "closed issue42244 test",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:48:07.879Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6dcf75b2943128f64ed44",
        "title": "123",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:43:35.275Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6d39f32e4830ce7b3bd14",
        "title": "turkey",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:03:43.291Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6aad8f5e36e840ccf9e3cca5",
        "title": "Constantly loading",
        "description": "Page loading freezes at 99%",
        "stepsToReproduce": " 1.Open the website from any source",
        "status": "open",
        "priority": "low",
        "classification": "unclassified",
        "createdOn": "2026-09-18T19:22:06.797Z",
        "author": {
            "userId": "6aac45663c299e5342891895",
            "fullName": "Justin Thompson"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Bob Bobbingson"
        },
        "comments": [
            {
                "id": "6aac4c59b8a607a4a4349492 ",
                "userId": " 6aac4ccba693bf19b2f497d6",
                "fullName": "Alice Hyacinth ",
                "comment": "Please fix as soon as possible the site is unusable ",
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "testCases": [
            {
                "_id": null,
                "userId": null,
                "passed": null,
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "timeLog": [
            {
                "userId": " ",
                "hoursWorked": null,
                "passed": null,
                "loggedOn": null
            }
        ],
        "fixed": {
            "fixedBy": {
                "userId": null,
                "fullName": null
            },
            "fixedOnVersion": null,
            "fixedOnDate": null
        }
    },
    {
        "_id": "6ab1a5eded6c39e542accc1d",
        "title": "Page failing to load",
        "description": "Page infinitely loads over and over again",
        "status": "open",
        "priority": "low"
    }
]

2 GET /issues?status=open&priority=high — confirm every result matches both filters at once, not just one. AUTOMATED
200 
[
    {
        "_id": "6abd5aed75d4c7d96309e8c3",
        "title": "12341415153131afagaghaahah564",
        "description": "Issue description",
        "stepsToReproduce": "Step 4, Step 5",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-30T18:54:37.825Z",
        "comments": [],
        "testCases": [
            {
                "_id": "117cff42-055c-4b6b-abf8-0945644a6340",
                "userId": "6aad780ce470879405ff14af",
                "passed": false,
                "createdOn": "2026-10-01T20:22:32.135Z"
            },
            {
                "_id": "ed4ce8ea-856b-49ff-85ec-b368c9c5d792",
                "userId": "6aad780ce470879405ff14af",
                "passed": true,
                "createdOn": "2026-10-01T20:22:52.836Z"
            }
        ],
        "timeLog": []
    },
    {
        "_id": "6ab6dff5d39531dcbd4a2e11",
        "title": "1234564",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:56:21.752Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6df32debac92c32ca5d5b",
        "title": "1234564",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:53:06.788Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6de07836256d67905f955",
        "title": "closed issue42244 test",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:48:07.879Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6dcf75b2943128f64ed44",
        "title": "123",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:43:35.275Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6d39f32e4830ce7b3bd14",
        "title": "turkey",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:03:43.291Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    }
]

3 GET /issues?sort=-createdOn — confirm results come back newest-first. AUTOMATED
200
[
    {
        "_id": "6abd5aed75d4c7d96309e8c3",
        "title": "12341415153131afagaghaahah564",
        "description": "Issue description",
        "stepsToReproduce": "Step 4, Step 5",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-30T18:54:37.825Z",
        "comments": [],
        "testCases": [
            {
                "_id": "117cff42-055c-4b6b-abf8-0945644a6340",
                "userId": "6aad780ce470879405ff14af",
                "passed": false,
                "createdOn": "2026-10-01T20:22:32.135Z"
            },
            {
                "_id": "ed4ce8ea-856b-49ff-85ec-b368c9c5d792",
                "userId": "6aad780ce470879405ff14af",
                "passed": true,
                "createdOn": "2026-10-01T20:22:52.836Z"
            }
        ],
        "timeLog": []
    },
    {
        "_id": "6ab6dff5d39531dcbd4a2e11",
        "title": "1234564",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:56:21.752Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6df32debac92c32ca5d5b",
        "title": "1234564",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:53:06.788Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6de07836256d67905f955",
        "title": "closed issue42244 test",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:48:07.879Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6dcf75b2943128f64ed44",
        "title": "123",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:43:35.275Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab6d39f32e4830ce7b3bd14",
        "title": "turkey",
        "description": "Issue description",
        "stepsToReproduce": "Step 1, Step 2",
        "priority": "high",
        "status": "open",
        "classification": "unclassified",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "createdOn": "2026-09-25T20:03:43.291Z",
        "comments": [],
        "testCases": [],
        "timeLog": []
    },
    {
        "_id": "6ab2babce85627dca1b48e94",
        "title": "Constantly loading",
        "description": "Page loading freezes at 99%",
        "stepsToReproduce": " 1.Open the website from any source",
        "status": "closed",
        "priority": "low",
        "classification": "unapproved",
        "createdOn": "2026-09-22T17:28:28.267Z",
        "author": {
            "userId": "6aac45663c299e5342891895",
            "fullName": "Justin Thompson"
        },
        "assignedTo": {
            "userId": "2552552525252",
            "fullName": "Alice Thymefield"
        },
        "comments": [
            {
                "id": "6aac4c59b8a607a4a4349492 ",
                "userId": " 6aac4ccba693bf19b2f497d6",
                "fullName": "Alice Hyacinth ",
                "comment": "Please fix as soon as possible the site is unusable ",
                "createdOn": "2026-09-22T17:28:28.267Z"
            },
            {
                "_id": "868a3c6e-f480-4f15-835f-c1a46cd5593a",
                "userId": "6aad780ce470879405ff14af",
                "fullName": "Miyabi Hoshimi",
                "comment": "I want the error message to be blue not red2",
                "createdOn": "2026-09-30T19:31:34.957Z"
            }
        ],
        "testCases": [
            {
                "_id": "6ab2b9b66581bb16fd574056",
                "userId": "6aac4b7760201c5ed2bcea92",
                "passed": false,
                "createdOn": "2026-09-22T17:28:28.267Z"
            },
            {
                "_id": "ce953d0d-f56a-4d6c-b335-a220442a72fa",
                "userId": "6aad780ce470879405ff14af",
                "passed": true,
                "createdOn": "2026-10-01T20:50:42.089Z"
            }
        ],
        "timeLog": [
            {
                "userId": "6aac4b7760201c5ed2bcea92",
                "hoursWorked": 30,
                "passed": false,
                "loggedOn": "2026-09-22T17:28:28.267Z"
            }
        ]
    },
    {
        "_id": "6aad8f5e36e840ccf9e3cca5",
        "title": "Constantly loading",
        "description": "Page loading freezes at 99%",
        "stepsToReproduce": " 1.Open the website from any source",
        "status": "open",
        "priority": "low",
        "classification": "unclassified",
        "createdOn": "2026-09-18T19:22:06.797Z",
        "author": {
            "userId": "6aac45663c299e5342891895",
            "fullName": "Justin Thompson"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Bob Bobbingson"
        },
        "comments": [
            {
                "id": "6aac4c59b8a607a4a4349492 ",
                "userId": " 6aac4ccba693bf19b2f497d6",
                "fullName": "Alice Hyacinth ",
                "comment": "Please fix as soon as possible the site is unusable ",
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "testCases": [
            {
                "_id": null,
                "userId": null,
                "passed": null,
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "timeLog": [
            {
                "userId": " ",
                "hoursWorked": null,
                "passed": null,
                "loggedOn": null
            }
        ],
        "fixed": {
            "fixedBy": {
                "userId": null,
                "fullName": null
            },
            "fixedOnVersion": null,
            "fixedOnDate": null
        }
    },
    {
        "_id": "6aad7c3636e840ccf9e3cca4",
        "title": "Failing to load images",
        "description": "Images of products improperly load",
        "stepsToReproduce": " Refresh any html page with images",
        "status": "in-progress",
        "priority": "low",
        "classification": "unapproved",
        "createdOn": "2026-09-18T18:00:22.921Z",
        "author": {
            "userId": "6aad7a7364b39ceca2b8d780",
            "fullName": "Remielle Dan"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Asaba Harumasa"
        },
        "testCases": [
            {
                "_id": "6aad7ac1949a30bdb0fe2bb4",
                "userId": "6aac4b7760201c5ed2bcea92",
                "passed": false,
                "createdOn": "2026-09-18T18:00:22.921Z"
            }
        ]
    },
    {
        "_id": "6aad7c1836e840ccf9e3cca3",
        "title": "Queries failing to find proper inventory",
        "description": "Search for any item that we sell in the search bar and nothing returns",
        "stepsToReproduce": " 1.Type the name in the search bar and hit enter",
        "status": "closed",
        "priority": "medium",
        "classification": "approved",
        "createdOn": "2026-09-18T17:59:52.840Z",
        "author": {
            "userId": "6aad78e531ec9c91694e7dd1",
            "fullName": "Starlight Billy"
        },
        "assignedTo": {
            "userId": "6aad78f57846511dfa2eeaad",
            "fullName": "Justin Thompson"
        },
        "testCases": [
            {
                "_id": "6aad790e14f21324c417998a",
                "userId": "6aad791fd9f9e73be23e0353",
                "passed": true,
                "createdOn": "2026-09-18T17:59:52.840Z"
            }
        ],
        "timeLog": [
            {
                "userId": " 6aad791fd9f9e73be23e0353 ",
                "hoursWorked": 45,
                "passed": true,
                "loggedOn": "2026-09-18T17:59:52.840Z"
            }
        ],
        "fixed": {
            "fixedBy": {
                "userId": "6aad78f57846511dfa2eeaad",
                "fullName": "Cissia"
            },
            "fixedOnVersion": "1.05",
            "fixedOnDate": "2026-09-18T17:59:52.840Z"
        }
    },
    {
        "_id": "6aad7bbb36e840ccf9e3cca2",
        "title": "Payment processing failed",
        "description": "Server 500 error upon processing payment",
        "stepsToReproduce": " 1. Click the payment button",
        "status": "closed",
        "priority": "high",
        "classification": "approved",
        "createdOn": "2026-09-18T17:58:19.071Z",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "assignedTo": {
            "userId": "6aad783119cdc5d65b974899",
            "fullName": "Claret Flintstone"
        }
    },
    {
        "_id": "6ab1a5eded6c39e542accc1d",
        "title": "Page failing to load",
        "description": "Page infinitely loads over and over again",
        "status": "open",
        "priority": "low"
    },
    {
        "_id": "6ab2bfb09d8414968b0cb035",
        "title": "Scroll wheel not working on website",
        "comments": [
            {
                "id": "6aada628b45b42fededdce80",
                "userId": "6aac4b7760201c5ed2bcea92",
                "fullName": "Bob Bobbingson",
                "comment": "This is really frustrating",
                "createdOn": "2026-09-22T17:49:43.272Z"
            }
        ],
        "testCases": [
            {
                "id": "6aada73af14493d53d58413f",
                "userId": "6aac4b7760201c5ed2bcea92",
                "fullName": "Bob Bobbingson",
                "passed": true,
                "createdOn": "2026-09-22T17:50:17.707Z"
            }
        ],
        "timeLog": [
            {
                "userId": "6aac4b7760201c5ed2bcea92",
                "hoursWorked": 10,
                "loggedOn": "2026-09-22T17:51:44.944Z"
            }
        ],
        "status": "closed"
    }
]

4 GET /issues?sort=title (not on the allow-list) — confirm 400 with a ValidationFailed error. AUTOMATED
 


400 


{
    "error": "ValidationFailed",
    "details": [
        {
            "path": "sort",
            "message": "Invalid option: expected one of \"createdOn\"|\"-createdOn\"|\"priority\"|\"-priority\""
        }
    ]
}


5 GET /issues?q=<PAGE> — confirm it matches case-insensitively, and still matches when the word appears only in description, not title. AUTOMATED

200

[
    {
        "_id": "6ab1a5eded6c39e542accc1d",
        "title": "Page failing to load",
        "description": "Page infinitely loads over and over again",
        "status": "open",
        "priority": "low"
    },
    {
        "_id": "6aad8f5e36e840ccf9e3cca5",
        "title": "Constantly loading",
        "description": "Page loading freezes at 99%",
        "stepsToReproduce": " 1.Open the website from any source",
        "status": "open",
        "priority": "low",
        "classification": "unclassified",
        "createdOn": "2026-09-18T19:22:06.797Z",
        "author": {
            "userId": "6aac45663c299e5342891895",
            "fullName": "Justin Thompson"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Bob Bobbingson"
        },
        "comments": [
            {
                "id": "6aac4c59b8a607a4a4349492 ",
                "userId": " 6aac4ccba693bf19b2f497d6",
                "fullName": "Alice Hyacinth ",
                "comment": "Please fix as soon as possible the site is unusable ",
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "testCases": [
            {
                "_id": null,
                "userId": null,
                "passed": null,
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "timeLog": [
            {
                "userId": " ",
                "hoursWorked": null,
                "passed": null,
                "loggedOn": null
            }
        ],
        "fixed": {
            "fixedBy": {
                "userId": null,
                "fullName": null
            },
            "fixedOnVersion": null,
            "fixedOnDate": null
        }
    },
    {
        "_id": "6ab2babce85627dca1b48e94",
        "title": "Constantly loading",
        "description": "Page loading freezes at 99%",
        "stepsToReproduce": " 1.Open the website from any source",
        "status": "closed",
        "priority": "low",
        "classification": "unapproved",
        "createdOn": "2026-09-22T17:28:28.267Z",
        "author": {
            "userId": "6aac45663c299e5342891895",
            "fullName": "Justin Thompson"
        },
        "assignedTo": {
            "userId": "2552552525252",
            "fullName": "Alice Thymefield"
        },
        "comments": [
            {
                "id": "6aac4c59b8a607a4a4349492 ",
                "userId": " 6aac4ccba693bf19b2f497d6",
                "fullName": "Alice Hyacinth ",
                "comment": "Please fix as soon as possible the site is unusable ",
                "createdOn": "2026-09-22T17:28:28.267Z"
            },
            {
                "_id": "868a3c6e-f480-4f15-835f-c1a46cd5593a",
                "userId": "6aad780ce470879405ff14af",
                "fullName": "Miyabi Hoshimi",
                "comment": "I want the error message to be blue not red2",
                "createdOn": "2026-09-30T19:31:34.957Z"
            }
        ],
        "testCases": [
            {
                "_id": "6ab2b9b66581bb16fd574056",
                "userId": "6aac4b7760201c5ed2bcea92",
                "passed": false,
                "createdOn": "2026-09-22T17:28:28.267Z"
            },
            {
                "_id": "ce953d0d-f56a-4d6c-b335-a220442a72fa",
                "userId": "6aad780ce470879405ff14af",
                "passed": true,
                "createdOn": "2026-10-01T20:50:42.089Z"
            }
        ],
        "timeLog": [
            {
                "userId": "6aac4b7760201c5ed2bcea92",
                "hoursWorked": 30,
                "passed": false,
                "loggedOn": "2026-09-22T17:28:28.267Z"
            }
        ]
    }
]


6 GET /issues?page=2&limit=2 against at least 3 seeded issues — confirm you get the second page, not a repeat of the first. Then update TEST-RESULTS.md with today's results. AUTOMATED

200
[
    {
        "_id": "6aad7c3636e840ccf9e3cca4",
        "title": "Failing to load images",
        "description": "Images of products improperly load",
        "stepsToReproduce": " Refresh any html page with images",
        "status": "in-progress",
        "priority": "low",
        "classification": "unapproved",
        "createdOn": "2026-09-18T18:00:22.921Z",
        "author": {
            "userId": "6aad7a7364b39ceca2b8d780",
            "fullName": "Remielle Dan"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Asaba Harumasa"
        },
        "testCases": [
            {
                "_id": "6aad7ac1949a30bdb0fe2bb4",
                "userId": "6aac4b7760201c5ed2bcea92",
                "passed": false,
                "createdOn": "2026-09-18T18:00:22.921Z"
            }
        ]
    },
    {
        "_id": "6aad8f5e36e840ccf9e3cca5",
        "title": "Constantly loading",
        "description": "Page loading freezes at 99%",
        "stepsToReproduce": " 1.Open the website from any source",
        "status": "open",
        "priority": "low",
        "classification": "unclassified",
        "createdOn": "2026-09-18T19:22:06.797Z",
        "author": {
            "userId": "6aac45663c299e5342891895",
            "fullName": "Justin Thompson"
        },
        "assignedTo": {
            "userId": "6aac4b7760201c5ed2bcea92",
            "fullName": "Bob Bobbingson"
        },
        "comments": [
            {
                "id": "6aac4c59b8a607a4a4349492 ",
                "userId": " 6aac4ccba693bf19b2f497d6",
                "fullName": "Alice Hyacinth ",
                "comment": "Please fix as soon as possible the site is unusable ",
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "testCases": [
            {
                "_id": null,
                "userId": null,
                "passed": null,
                "createdOn": "2026-09-18T19:22:06.797Z"
            }
        ],
        "timeLog": [
            {
                "userId": " ",
                "hoursWorked": null,
                "passed": null,
                "loggedOn": null
            }
        ],
        "fixed": {
            "fixedBy": {
                "userId": null,
                "fullName": null
            },
            "fixedOnVersion": null,
            "fixedOnDate": null
        }
    }
]


TEST-RESULTS.md notes that your Atlas Search index named default shows Active on the issues collection (include a screenshot or the index name and status).

Name and Fields: default
Status: Ready



**Lab 05-01**


1  GET / with no cookie returns 200 HTML (the landing page is public).



200 
<!doctype html><html lang="en"><head><meta charset="UTF-8" /><link rel="icon" type="image/svg+xml" href="/favicon.svg" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>frontend</title><script type="module" crossorigin src="/assets/index-BcoPXmiK.js"></script><link rel="stylesheet" crossorigin href="/assets/index-D64VDMd1.css">
  </head><body><div id="root"></div></body>
</html>

 
2  POST /api/auth/sign-up/email with a valid body returns 200 and sets a cookie.

{
    "name": "Justin",
    "email": "Justin@example.com",
    "password": "correct-horse-9"
}

200 ok 
{
    "token": "C8K0MyB76VmHQDNW8EdnVpvx0CtteMdy",
    "user": {
        "name": "Justin",
        "email": "justin@example.com",
        "emailVerified": false,
        "createdAt": "2026-10-23T18:36:22.321Z",
        "updatedAt": "2026-10-23T18:36:22.321Z",
        "id": "6adba9265c542ec86e13f246"
    }
}


3
GET /api/auth/get-session with that cookie returns your user. Without the cookie it returns null.

200
{
    "session": {
        "expiresAt": "2026-10-30T18:36:22.416Z",
        "token": "C8K0MyB76VmHQDNW8EdnVpvx0CtteMdy",
        "createdAt": "2026-10-23T18:36:22.416Z",
        "updatedAt": "2026-10-23T18:36:22.416Z",
        "ipAddress": "",
        "userAgent": "PostmanRuntime/2.12.1",
        "userId": "6adba9265c542ec86e13f246",
        "id": "6adba9265c542ec86e13f248"
    },
    "user": {
        "name": "Justin",
        "email": "justin@example.com",
        "emailVerified": false,
        "createdAt": "2026-10-23T18:36:22.321Z",
        "updatedAt": "2026-10-23T18:36:22.321Z",
        "id": "6adba9265c542ec86e13f246"
    }
}

200
null


4 POST /api/auth/sign-out returns {"success":true}, and get-session is null afterwards.

200
{
    "success": true
}

200
null



5 POST /api/auth/sign-in/email with the right password returns 200; with a wrong password returns 401.


200
{
    "redirect": false,
    "token": "kkZy7Ymz7VNgdZRpA75HCDOI6qj2WOh0",
    "user": {
        "name": "Justin",
        "email": "justin@example.com",
        "emailVerified": false,
        "createdAt": "2026-10-23T18:36:22.321Z",
        "updatedAt": "2026-10-23T18:36:22.321Z",
        "id": "6adba9265c542ec86e13f246"
    }
}

401
{
    "message": "Invalid email or password",
    "code": "INVALID_EMAIL_OR_PASSWORD"
}

6 Duplicate email returns 422; a password under 8 characters returns 400; a request with no Origin returns 403.


{
    "name": "Justin",
    "email": "Justin@example.com",
    "password": "correct-horse-9"
}
422
{
    "message": "User already exists. Use another email.",
    "code": "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
}

{
    "name": "Justin",
    "email": "Justin@example.com",
    "password": "co9"
}
400
{
    "message": "Password too short",
    "code": "PASSWORD_TOO_SHORT"
}


403
no origin 
{
    "message": "Missing or null Origin",
    "code": "MISSING_OR_NULL_ORIGIN"
}


7
In your database, user, account and session exist and the stored password is a hash. (Describe what you saw; do not paste the hash.)


User: has _id , name , email , emailVerified , createdAt , updatedAt 


account: has _id, accountId , providerId , userId, password , createdAt , updatedAt 


session: has _id, expiresAt , token , createdAt , updatedAt , ipAddress , userAgent , userId




**lab 05-02**

Sign out, then ask again. Send the sign-out request, then GET /issues. Expect 401. Postman still holds the old cookie, but the server ended that session, so the cookie opens nothing.


200
{
    "success": true
}

Get 

401
{
    "error": "Please sign in first"
}



Put the guard after the router. In app.ts, temporarily change the mount to app.use("/issues", issuesRouter); and add app.use("/issues", requireAuth); on the next line. Restart the server, sign out, and send GET /issues. You will get 200 and your issues. The router answered first, so the guard never ran. This is the most common mistake with middleware. Put the line back.




200
[
    {
        "_id": "6aad7bbb36e840ccf9e3cca2",
        "title": "Payment processing failed",
        "description": "Server 500 error upon processing payment",
        "stepsToReproduce": " 1. Click the payment button",
        "status": "closed",
        "priority": "high",
        "classification": "approved",
        "createdOn": "2026-09-18T17:58:19.071Z",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "assignedTo": {
            "userId": "6aad783119cdc5d65b974899",
            "fullName": "Claret Flintstone"
        }
    },
    etc....
]

Leave a pretend user behind. Temporarily put attachCurrentUser back on POST /issues (you can bring the file back from git with git restore). Sign in and create an issue. The author is the pretend person, even though you are signed in, because the pretend middleware ran after the guard and overwrote the real name tag. Remove it again.


200
{
    "title": "Login button misaligned",
    "description": "Off by 4px on mobile",
    "stepsToReproduce": "Open on a phone",
    "priority": "low",
    "status": "open",
    "classification": "unclassified",
    "author": {
        "userId": "6aad780ce470879405ff14af",
        "fullName": "Miyabi Hoshimi"
    },
    "createdOn": "2026-10-23T19:29:10.075Z",
    "comments": [],
    "testCases": [],
    "timeLog": [],
    "_id": "6adbb586d53bb36308f2d996"
}

Re-Testing Everything
Stop the server, start it again, and write one row in TEST-RESULTS.md for each result you actually saw:
1 Signed out: GET /issues, GET /issues/:id, POST /issues, and GET /api/me all return 401 with {"error":"Please sign in first"}.


Get/issues
401
{
    "error": "Please sign in first"
}

Get/issues/64f000000000000000000001
401
{
    "error": "Please sign in first"
}

POST /issues
401
{
    "error": "Please sign in first"
}


2 Signed out: GET /, GET /health and GET /api/auth/get-session still answer 200.


GET /
200
<!doctype html><html lang="en"><head><meta charset="UTF-8" /><link rel="icon" type="image/svg+xml" href="/favicon.svg" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>frontend</title><script type="module" crossorigin src="/assets/index-BcoPXmiK.js"></script><link rel="stylesheet" crossorigin href="/assets/index-D64VDMd1.css">
  </head><body><div id="root"></div></body>
</html>

GET /health
200
{
    "status": "ok"
}


GET /api/auth/get-session
200
null

3 Signed in: GET /api/me returns your real userId and fullName, and GET /issues returns 200.

GET /api/me
{
    "userId": "6adba9265c542ec86e13f246",
    "fullName": "Justin"
}

GET /issues
200
[
    {
        "_id": "6aad7bbb36e840ccf9e3cca2",
        "title": "Payment processing failed",
        "description": "Server 500 error upon processing payment",
        "stepsToReproduce": " 1. Click the payment button",
        "status": "closed",
        "priority": "high",
        "classification": "approved",
        "createdOn": "2026-09-18T17:58:19.071Z",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "assignedTo": {
            "userId": "6aad783119cdc5d65b974899",
            "fullName": "Claret Flintstone"
        }
    }, etc....
] 

4 Signed in: POST /issues with a fake author in the body creates the issue with your real author.


{
    "title": "Login button misaligned",
    "description": "Off by 4px on mobile",
    "stepsToReproduce": "Open on a phone",
    "priority": "low",
    "author": {
        "userId": "hacker",
        "fullName": "Not Me"
    }
}

201
{
    "title": "Login button misaligned",
    "description": "Off by 4px on mobile",
    "stepsToReproduce": "Open on a phone",
    "priority": "low",
    "status": "open",
    "classification": "unclassified",
    "author": {
        "userId": "6adba9265c542ec86e13f246",
        "fullName": "Justin"
    },
    "createdOn": "2026-10-23T19:50:58.543Z",
    "comments": [],
    "testCases": [],
    "timeLog": [],
    "_id": "6adbbaa2b6fd96b5eacf8f92"
}


5 After sign-out, the old cookie no longer opens /issues (401).


401
{
    "error": "Please sign in first"
}

6 Guard placed after the router: GET /issues returned 200 when signed out. Guard restored afterwards.


200
[
    {
        "_id": "6aad7bbb36e840ccf9e3cca2",
        "title": "Payment processing failed",
        "description": "Server 500 error upon processing payment",
        "stepsToReproduce": " 1. Click the payment button",
        "status": "closed",
        "priority": "high",
        "classification": "approved",
        "createdOn": "2026-09-18T17:58:19.071Z",
        "author": {
            "userId": "6aad780ce470879405ff14af",
            "fullName": "Miyabi Hoshimi"
        },
        "assignedTo": {
            "userId": "6aad783119cdc5d65b974899",
            "fullName": "Claret Flintstone"
        }
    },
    etc....
]


8 A leftover pretend user overwrote the real author. Removed afterwards.


200
{
    "title": "Login button misaligned",
    "description": "Off by 4px on mobile",
    "stepsToReproduce": "Open on a phone",
    "priority": "low",
    "status": "open",
    "classification": "unclassified",
    "author": {
        "userId": "6aad780ce470879405ff14af",
        "fullName": "Miyabi Hoshimi"
    },
    "createdOn": "2026-10-23T19:29:10.075Z",
    "comments": [],
    "testCases": [],
    "timeLog": [],
    "_id": "6adbb586d53bb36308f2d996"
}




npm test passes, including tests/auth.test.ts, and npx tsc --noEmit has no errors.
