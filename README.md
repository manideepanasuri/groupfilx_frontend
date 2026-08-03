# 🎬 GroupFlix

> AI-powered collaborative movie recommendation platform for groups.

GroupFlix helps groups of friends decide **what to watch together** instead of recommending movies for a single user.

Unlike traditional recommendation systems that optimize for one person's taste, GroupFlix aggregates preferences from multiple users and generates recommendations that maximize overall group satisfaction using **Neural Collaborative Filtering (NCF)**.

---

# Features

## Authentication

- JWT Authentication
- Secure Login & Registration
- Protected Routes
- Token Refresh

---

## Group Management

- Create movie groups
- Join groups using invite code
- Invite friends
- Leave groups
- Manage members
- Group ownership

---

## Movie Discovery

- Browse thousands of movies
- Search movies
- Filter by genres
- Sort by

  - Rating
  - Popularity
  - Release Date

- View

  - Posters
  - Cast
  - Runtime
  - Genres
  - Description
  - Ratings

---

## AI Recommendation Engine

Instead of recommending movies individually, GroupFlix generates recommendations for an entire group.

Features include

- Neural Collaborative Filtering
- Group preference aggregation
- Personalized recommendations
- Trending movies
- Cold-start handling
- Ranking based on predicted ratings

---

## Ratings

Users can

- Rate movies
- Update ratings
- Build preference profiles
- Improve recommendation quality

---

## Voting

After recommendations are generated,

Group members can

- Vote for movies
- View live voting
- Finalize movie selection

---

## Admin Dashboard

Admin can

- Manage users
- Manage movies
- Monitor recommendations
- Update database

---

# Recommendation Pipeline

```
User Ratings
      │
      ▼
Store Ratings
      │
      ▼
Neural Collaborative Filtering
      │
      ▼
Predicted Ratings
      │
      ▼
Group Preference Aggregation
      │
      ▼
Rank Movies
      │
      ▼
Top Recommendations
```

---

# Tech Stack

## Frontend

- React
- React Router
- Axios
- CSS
- HTML

---

## Backend

- Django
- Django REST Framework
- JWT Authentication
- REST APIs

---

## Machine Learning

- PyTorch
- Neural Collaborative Filtering (NCF)
- NumPy
- Pandas

---

## Database

- PostgreSQL

---

## APIs

- TMDB API


---

# System Architecture

```
             React Frontend
                    │
         REST API Requests
                    │
      Django REST Backend
                    │
      ┌─────────────┴─────────────┐
      │                           │
PostgreSQL                  Recommendation Engine
 Database                          │
                                   │
                           Neural Collaborative
                              Filtering Model
                                   │
                                TMDB API
```

---

# Machine Learning

The recommendation system is built using **Neural Collaborative Filtering (NCF)**.

### Workflow

1. Collect user ratings
2. Encode users and movies
3. Train embedding layers
4. Learn latent preferences
5. Predict unseen movie ratings
6. Recommend highest scoring movies

The model continuously improves as more ratings are collected.

---


# Testing

The application includes testing for

- Authentication
- Movie Search
- Recommendation Engine
- Group Management
- Admin Features
- Voting
- Ratings
- User Registration

---

# Contributors

- **Manideep Anasuri**
- **Dinesh Saladi**
- **Ruthvik Pinninti**

National Institute of Technology, Warangal

---

# References

- TMDB API
- Django REST Framework
- PyTorch
- PostgreSQL
- React
