import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors());
app.use("*", logger(console.log));

// Health check
app.get("/make-server-1d6c2b3c/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get all reviews for a gym
app.get("/make-server-1d6c2b3c/gyms/:gymId/reviews", async (c) => {
  try {
    const gymId = c.req.param("gymId");
    const reviews = await kv.getByPrefix(`review:${gymId}:`);

    return c.json({
      success: true,
      reviews: reviews
        .map((r) => r.value)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    });
  } catch (error) {
    console.log("Error fetching reviews:", error);
    return c.json({ success: false, error: "Failed to fetch reviews" }, 500);
  }
});

// Create a new review
app.post("/make-server-1d6c2b3c/gyms/:gymId/reviews", async (c) => {
  try {
    const gymId = c.req.param("gymId");
    const reviewData = await c.req.json();

    if (
      !reviewData.nickname ||
      !reviewData.country ||
      !reviewData.rating ||
      !reviewData.text
    ) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    const reviewId = Date.now().toString();
    const review = {
      id: reviewId,
      gymId,
      author: {
        nickname: reviewData.nickname,
        country: reviewData.country,
      },
      rating: reviewData.rating,
      text: reviewData.text,
      images: reviewData.images || [],
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };

    await kv.set(`review:${gymId}:${reviewId}`, review);

    return c.json({ success: true, review });
  } catch (error) {
    console.log("Error creating review:", error);
    return c.json({ success: false, error: "Failed to create review" }, 500);
  }
});

// Like a review
app.post("/make-server-1d6c2b3c/reviews/:reviewId/like", async (c) => {
  try {
    const reviewId = c.req.param("reviewId");
    const { gymId } = await c.req.json();

    if (!gymId) {
      return c.json({ success: false, error: "gymId is required" }, 400);
    }

    const reviewKey = `review:${gymId}:${reviewId}`;
    const reviewData = await kv.get(reviewKey);

    if (!reviewData) {
      return c.json({ success: false, error: "Review not found" }, 404);
    }

    const updatedReview = {
      ...reviewData,
      likes: reviewData.likes + 1,
    };

    await kv.set(reviewKey, updatedReview);

    return c.json({ success: true, review: updatedReview });
  } catch (error) {
    console.log("Error liking review:", error);
    return c.json({ success: false, error: "Failed to like review" }, 500);
  }
});

// Get saved gyms for a user (using device ID or session)
app.get("/make-server-1d6c2b3c/saved-gyms/:deviceId", async (c) => {
  try {
    const deviceId = c.req.param("deviceId");
    const savedData = await kv.get(`saved:${deviceId}`);

    return c.json({
      success: true,
      savedGymIds: savedData?.gymIds || [],
    });
  } catch (error) {
    console.log("Error fetching saved gyms:", error);
    return c.json({ success: false, error: "Failed to fetch saved gyms" }, 500);
  }
});

// Save or unsave a gym
app.post("/make-server-1d6c2b3c/saved-gyms/:deviceId", async (c) => {
  try {
    const deviceId = c.req.param("deviceId");
    const { gymId, action } = await c.req.json();

    if (!gymId || !action || !["save", "unsave"].includes(action)) {
      return c.json({ success: false, error: "Invalid request data" }, 400);
    }

    const savedData = (await kv.get(`saved:${deviceId}`)) || { gymIds: [] };

    if (action === "save") {
      if (!savedData.gymIds.includes(gymId)) {
        savedData.gymIds.push(gymId);
      }
    } else {
      savedData.gymIds = savedData.gymIds.filter((id) => id !== gymId);
    }

    await kv.set(`saved:${deviceId}`, savedData);

    return c.json({ success: true, savedGymIds: savedData.gymIds });
  } catch (error) {
    console.log("Error updating saved gyms:", error);
    return c.json(
      { success: false, error: "Failed to update saved gyms" },
      500,
    );
  }
});

// Get gym statistics
app.get("/make-server-1d6c2b3c/gyms/:gymId/stats", async (c) => {
  try {
    const gymId = c.req.param("gymId");
    const reviews = await kv.getByPrefix(`review:${gymId}:`);

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.value.rating, 0) / totalReviews
        : 0;

    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach((r) => {
      ratingDistribution[r.value.rating]++;
    });

    return c.json({
      success: true,
      stats: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.log("Error fetching gym stats:", error);
    return c.json({ success: false, error: "Failed to fetch gym stats" }, 500);
  }
});

Deno.serve(app.fetch);
