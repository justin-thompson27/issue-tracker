
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
        "id": 1,
        "title": "Missing Login",
        "description": "Login function not appearing",
        "status": "open",
        "priority": "high"
    },
    {
        "id": 2,
        "title": "Incorrect Password",
        "description": "Password is being entered correctly but still is flagged as incorrect",
        "status": "in-progress",
        "priority": "high"
    },
    {
        "id": 3,
        "title": "Page failing to load",
        "description": "Page infinitely loads over and over again",
        "status": "closed",
        "priority": "low"
    }
]
200
returns all 3 seeded issues
GET /issues/1
—
My Results:
200
{
    "id": 1,
    "title": "Missing Login",
    "description": "Login function not appearing",
    "status": "open",
    "priority": "high"
}
200
returns your first seeded issue (id 1)
GET /issues/999
—
My Results:
404
{
    "message": "Issue not found"
}
404
{"error":"Issue not found"}
POST /issues
My Results:
201
{
    "id": 4,
    "title": "New issue",
    "status": "open",
    "priority": "medium"
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
PATCH /issues/1
{"status":"closed"}
200
My Results:
200
{
    "id": 1,
    "title": "Missing Login",
    "description": "Login function not appearing",
    "status": "closed",
    "priority": "high"
}
issue 1's status is now "closed"
PATCH /issues/999
{"status":"closed"}
404
My Results:
404
{
    "error": "Issue not found"
}
no issue with that id
DELETE /issues/2
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
    "message": "Issue not found"
}
404
confirms the delete above actually happened
DELETE /issues/999
—
My Results:
404
{
    "error": "Issue not found"
}
404
no issue with that id

