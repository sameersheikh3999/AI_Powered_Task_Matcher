# SkillSync API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the request header:
```
x-auth-token: <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "skills": [],
    "goals": [],
    "preferences": {
      "difficulty": "all",
      "categories": [],
      "timeCommitment": "all"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /auth/login
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "skills": [],
    "goals": [],
    "preferences": {},
    "lastLogin": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /auth/me
Get current user profile (requires authentication).

**Response:**
```json
{
  "id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": null,
  "skills": [],
  "goals": [],
  "preferences": {},
  "lastLogin": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Users

#### PUT /users/profile
Update user profile (requires authentication).

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "preferences": {
    "difficulty": "medium",
    "categories": ["Programming", "Design"],
    "timeCommitment": "medium"
  }
}
```

#### POST /users/skills
Add a new skill (requires authentication).

**Request Body:**
```json
{
  "name": "React",
  "category": "Programming",
  "level": "intermediate",
  "confidence": 75,
  "experience": 2
}
```

#### PUT /users/skills/:skillId
Update a skill (requires authentication).

**Request Body:**
```json
{
  "level": "advanced",
  "confidence": 85,
  "experience": 3
}
```

#### DELETE /users/skills/:skillId
Delete a skill (requires authentication).

#### POST /users/goals
Add a new goal (requires authentication).

**Request Body:**
```json
{
  "title": "Master React",
  "description": "Become proficient in React development",
  "category": "Programming",
  "priority": "high",
  "targetDate": "2024-06-01T00:00:00.000Z"
}
```

### Tasks

#### GET /tasks
Get all available tasks (requires authentication).

**Query Parameters:**
- `category` - Filter by category
- `difficulty` - Filter by difficulty (easy, medium, hard)
- `limit` - Number of tasks to return (default: 20)
- `page` - Page number (default: 1)

**Response:**
```json
{
  "tasks": [
    {
      "id": "task-id",
      "title": "Learn React Hooks",
      "description": "Master the use of React Hooks for state management",
      "category": "Programming",
      "difficulty": "medium",
      "estimatedTime": 120,
      "skills": ["react", "javascript"],
      "tags": ["frontend", "react", "hooks"],
      "aiScore": 85,
      "requirements": {
        "prerequisites": ["Basic JavaScript"],
        "tools": ["VS Code", "Node.js"],
        "resources": []
      },
      "steps": [],
      "outcomes": ["Understand React Hooks", "Build functional components"],
      "completionCount": 150,
      "averageRating": 4.5,
      "ratingCount": 30,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

#### GET /tasks/recommendations
Get AI-powered task recommendations (requires authentication).

**Response:**
```json
{
  "recommendations": [
    {
      "id": "task-id",
      "title": "Master TypeScript",
      "description": "Learn TypeScript fundamentals and advanced features",
      "category": "Programming",
      "difficulty": "medium",
      "estimatedTime": 180,
      "skills": ["typescript", "javascript"],
      "tags": ["typescript", "programming"],
      "aiScore": 95,
      "reason": "Matches your React skills and programming goals"
    }
  ]
}
```

#### POST /tasks/:taskId/complete
Mark a task as completed (requires authentication).

**Response:**
```json
{
  "message": "Task completed successfully",
  "task": {
    "id": "task-id",
    "completed": true,
    "completedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /tasks/:taskId/rate
Rate a completed task (requires authentication).

**Request Body:**
```json
{
  "rating": 5,
  "review": "Great learning experience!"
}
```

### Assessments

#### GET /assessments/questions
Get skill assessment questions.

**Response:**
```json
{
  "questions": [
    {
      "id": "question-id",
      "question": "How would you rate your JavaScript knowledge?",
      "category": "Programming",
      "options": [
        {
          "id": "option-1",
          "text": "Beginner - I know basic syntax",
          "score": 25
        },
        {
          "id": "option-2",
          "text": "Intermediate - I can build small applications",
          "score": 50
        },
        {
          "id": "option-3",
          "text": "Advanced - I can build complex applications",
          "score": 75
        },
        {
          "id": "option-4",
          "text": "Expert - I can teach others",
          "score": 100
        }
      ]
    }
  ]
}
```

#### POST /assessments/submit
Submit assessment results (requires authentication).

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "question-id",
      "optionId": "option-2"
    }
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "skillId": "javascript",
      "skillName": "JavaScript",
      "score": 50,
      "confidence": 75,
      "recommendations": ["Practice with real projects", "Learn advanced concepts"]
    }
  ],
  "overallScore": 65
}
```

### Analytics

#### GET /analytics/overview
Get user analytics overview (requires authentication).

**Response:**
```json
{
  "skillsProgress": [
    {
      "skillId": "javascript",
      "skillName": "JavaScript",
      "progress": 75,
      "tasksCompleted": 12
    }
  ],
  "tasksCompleted": [
    {
      "date": "2024-01-01",
      "count": 3
    }
  ],
  "timeSpent": [
    {
      "category": "Programming",
      "hours": 45
    }
  ],
  "goalsProgress": [
    {
      "goalId": "goal-id",
      "goalTitle": "Master React",
      "progress": 60
    }
  ]
}
```

#### GET /analytics/skills/:skillId
Get detailed analytics for a specific skill (requires authentication).

**Response:**
```json
{
  "skill": {
    "id": "javascript",
    "name": "JavaScript",
    "currentLevel": "intermediate",
    "progress": 75,
    "tasksCompleted": 12,
    "timeSpent": 45,
    "growthRate": 15
  },
  "history": [
    {
      "date": "2024-01-01",
      "level": "beginner",
      "confidence": 50
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!",
  "message": "Internal server error"
}
```

## Rate Limiting

API requests are limited to 100 requests per 15-minute window per IP address. When exceeded, the API returns:

```json
{
  "error": "Too many requests from this IP, please try again later."
}
``` 