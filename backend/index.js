// backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 4000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    /^https:\/\/.*\.github\.io$/,
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(bodyParser.json());

let reviews = [
  {
    id: uuidv4(),
    name: "George Carvalho",
    date: "Aug 2, 11:36 PM",
    title: "Ethiopian Yirgacheffe",
    roaster: "Blue Bottle Coffee",
    origin: "Ethiopia, Yirgacheffe",
    method: "pour over",
    ratio: "22g : 350g",
    time: "1:16",
    tags: ["bright", "floral", "fruity", "acidic"],
    notes:
      "Bright and floral with notes of lemon and tea. Perfect morning coffee with a clean finish. Used V60 with 22g coffee to 350g water at 94°C.",
    rating: 5,
  },
  {
    id: uuidv4(),
    name: "George Carvalho",
    date: "Aug 1, 9:15 AM",
    title: "Guatemala Huehuetenango",
    roaster: "Intelligentsia Coffee",
    origin: "Guatemala, Huehuetenango",
    method: "chemex",
    ratio: "30g : 600g",
    time: "1:17",
    tags: ["chocolaty", "smooth", "bright", "sweet"],
    notes:
      "Rich and complex with chocolate undertones and a wine-like acidity. Absolutely stellar coffee that showcases what specialty coffee can be.",
    rating: 5,
  },
  {
    id: uuidv4(),
    name: "George Carvalho",
    date: "Jul 31, 2:30 PM",
    title: "Colombia Geisha",
    roaster: "Counter Culture Coffee",
    origin: "Colombia, Nariño",
    method: "v60",
    ratio: "24g : 415g",
    time: "1:16",
    tags: ["floral", "bright", "fruity", "sweet", "smooth"],
    notes:
      "Exceptional cup with jasmine and bergamot notes. This geisha variety is absolutely magical — floral, tea-like, and incredibly clean. Worth every penny.",
    rating: 5,
  },
  {
    id: uuidv4(),
    name: "George Carvalho",
    date: "Jul 30, 8:45 AM",
    title: "Brazil Santos",
    roaster: "Stumptown Coffee",
    origin: "Brazil, Santos",
    method: "french press",
    ratio: "28g : 450g",
    time: "4:00",
    tags: ["nutty", "smooth", "low-acid", "chocolate"],
    notes:
      "Classic Brazilian profile with nutty notes and a smooth, low-acid finish. Perfect for those who prefer a milder cup. Great as an afternoon coffee.",
    rating: 4,
  },
  {
    id: uuidv4(),
    name: "George Carvalho",
    date: "Jul 29, 7:20 AM",
    title: "Kenya AA",
    roaster: "Blue Bottle Coffee",
    origin: "Kenya, Nyeri",
    method: "aeropress",
    ratio: "17g : 250g",
    time: "2:30",
    tags: ["bright", "fruity", "wine-like", "complex"],
    notes:
      "Incredibly bright and fruity with blackberry and grape notes. The wine-like acidity is perfectly balanced. This is what makes Kenyan coffee so special.",
    rating: 5,
  }
];

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/reviews", (req, res) => {
  res.json(reviews);
});

app.post("/reviews", (req, res) => {
  const newReview = { id: uuidv4(), ...req.body };
  reviews.unshift(newReview); // Add to top of feed
  res.status(201).json(newReview);
});

app.delete("/reviews/:id", (req, res) => {
  reviews = reviews.filter((review) => review.id !== req.params.id);
  res.status(204).end();
});

app.put("/reviews/:id", (req, res) => {
  const reviewIndex = reviews.findIndex((review) => review.id === req.params.id);
  if (reviewIndex === -1) {
    return res.status(404).json({ error: "Review not found" });
  }
  
  // Update the review while preserving the id and date
  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    ...req.body,
    id: req.params.id, // Ensure id doesn't change
    date: reviews[reviewIndex].date // Preserve original date
  };
  
  res.json(reviews[reviewIndex]);
});

// Like/Unlike a review
app.post("/reviews/:id/like", (req, res) => {
  const reviewIndex = reviews.findIndex((review) => review.id === req.params.id);
  if (reviewIndex === -1) {
    return res.status(404).json({ error: "Review not found" });
  }
  
  const review = reviews[reviewIndex];
  const userId = req.body.userId || "george"; // Default user for demo
  
  if (!review.likes) {
    review.likes = [];
  }
  
  const likeIndex = review.likes.indexOf(userId);
  if (likeIndex > -1) {
    // Unlike
    review.likes.splice(likeIndex, 1);
  } else {
    // Like
    review.likes.push(userId);
  }
  
  res.json({ likes: review.likes, likeCount: review.likes.length });
});

// Add comment to a review
app.post("/reviews/:id/comments", (req, res) => {
  const reviewIndex = reviews.findIndex((review) => review.id === req.params.id);
  if (reviewIndex === -1) {
    return res.status(404).json({ error: "Review not found" });
  }
  
  const review = reviews[reviewIndex];
  if (!review.comments) {
    review.comments = [];
  }
  
  const newComment = {
    id: uuidv4(),
    userId: req.body.userId || "george",
    userName: req.body.userName || "George Carvalho",
    text: req.body.text,
    date: new Date().toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  };
  
  review.comments.push(newComment);
  res.json(newComment);
});

// Get comments for a review
app.get("/reviews/:id/comments", (req, res) => {
  const review = reviews.find((review) => review.id === req.params.id);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  
  res.json(review.comments || []);
});

// Update a comment
app.put("/reviews/:reviewId/comments/:commentId", (req, res) => {
  const review = reviews.find((review) => review.id === req.params.reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  
  const commentIndex = review.comments.findIndex((comment) => comment.id === req.params.commentId);
  if (commentIndex === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }
  
  const comment = review.comments[commentIndex];
  if (comment.userId !== req.body.userId) {
    return res.status(403).json({ error: "Not authorized to edit this comment" });
  }
  
  // Update the comment text
  review.comments[commentIndex] = {
    ...comment,
    text: req.body.text,
    edited: true,
    editedAt: new Date().toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  };
  
  res.json(review.comments[commentIndex]);
});

// Delete a comment
app.delete("/reviews/:reviewId/comments/:commentId", (req, res) => {
  const review = reviews.find((review) => review.id === req.params.reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  
  const commentIndex = review.comments.findIndex((comment) => comment.id === req.params.commentId);
  if (commentIndex === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }
  
  const comment = review.comments[commentIndex];
  if (comment.userId !== req.body.userId) {
    return res.status(403).json({ error: "Not authorized to delete this comment" });
  }
  
  // Remove the comment
  review.comments.splice(commentIndex, 1);
  
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});
