const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema(
  {
    prUrl: { type: String, required: true },
    owner: { type: String, required: true },
    repo: { type: String, required: true },
    prNumber: { type: Number, required: true },
    title: { type: String },
    author: { type: String },
    filesChanged: { type: Number, default: 0 },
    additions: { type: Number, default: 0 },
    deletions: { type: Number, default: 0 },
    summary: { type: String },        // AI generated summary
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    suggestions: [{ type: String }],  // AI generated review suggestions
    rawDiffExcerpt: { type: String }, // optional stored snippet
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analysis', analysisSchema);
