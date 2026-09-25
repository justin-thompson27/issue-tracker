
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



GET /issues
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


GET /issues/6ab2babce85627dca1b48e94
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



GET /issues/999
—
My Results:
400
{
    "error": "Invalid issue id"
}
404
{"error":"Issue not found"}




POST /issues
My Results:
201
{
    "acknowledged": true,
    "insertedId": "6ab2d74ad71b61d3a14ed802"
}

{"title":"New issue"}
201
created with status "open", priority "medium"




POST /issues
{}
My Results:
400
{
    "error": "title is required"
}
400
{"error":"title is required"}; nothing added




PATCH /issues/6ab2babce85627dca1b48e94
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



PATCH /issues/999
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
404
{
    "error": "Issue not found"
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

Day 25 Results 

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