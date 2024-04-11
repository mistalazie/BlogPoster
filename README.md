# BlogPoster
Blogging Application

## Authentication Routes:
- POST /api/auth/signup: Create a new user account.
- POST /api/auth/login: Log in an existing user.
- POST /api/auth/logout: Log out the current user.
- POST /api/auth/refresh: Refresh the JWT token.
- GET /api/auth/user: Get information about the currently logged-in user.

## Blog Post Routes:
- GET /api/posts: Get a list of all blog posts.
- GET /api/posts/:id: Get a specific blog post by ID.
- POST /api/posts: Create a new blog post.
- PUT /api/posts/:id: Update an existing blog post.
- DELETE /api/posts/:id: Delete a blog post.

## User Routes:
- GET /api/users: Get a list of all users (might be restricted to admin users).
- GET /api/users/:id: Get a specific user by ID (might be restricted to admin users).
- PUT /api/users/:id: Update a user's information (might be restricted to admin users).
- DELETE /api/users/:id: Delete a user (might be restricted to admin users).

## Comment Routes:
- GET /api/posts/:postId/comments: Get all comments for a specific post.
- POST /api/posts/:postId/comments: Add a new comment to a post.
- PUT /api/posts/:postId/comments/:commentId: Update a specific comment.
- DELETE /api/posts/:postId/comments/:commentId: Delete a specific comment.

## Tag Routes:
- GET /api/tags: Get a list of all tags.
- GET /api/tags/:id: Get a specific tag by ID.
- POST /api/tags: Create a new tag.
- PUT /api/tags/:id: Update a tag's information.
- DELETE /api/tags/:id: Delete a tag.

## Category Routes:
- GET /api/categories: Get a list of all categories.
- GET /api/categories/:id: Get a specific category by ID.
- POST /api/categories: Create a new category.
- PUT /api/categories/:id: Update a category's information.
- DELETE /api/categories/:id: Delete a category.

## File Upload Routes (if needed):
- POST /api/upload/avatar: Upload a user's avatar image.
- POST /api/upload/image: Upload an image for a blog post.