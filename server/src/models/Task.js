const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Design', 'Business', 'Marketing', 'Data Science', 'Other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  estimatedTime: {
    type: Number,
    required: true,
    min: 1,
    max: 1440 // 24 hours in minutes
  },
  skills: [{
    type: String,
    required: true,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  aiScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  requirements: {
    prerequisites: [{
      type: String,
      trim: true
    }],
    tools: [{
      type: String,
      trim: true
    }],
    resources: [{
      name: String,
      url: String,
      type: {
        type: String,
        enum: ['documentation', 'video', 'article', 'tool']
      }
    }]
  },
  steps: [{
    order: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    estimatedTime: {
      type: Number,
      min: 1
    }
  }],
  outcomes: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  completionCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
taskSchema.index({ category: 1, difficulty: 1 });
taskSchema.index({ skills: 1 });
taskSchema.index({ tags: 1 });
taskSchema.index({ aiScore: -1 });
taskSchema.index({ isActive: 1, isPublic: 1 });

// Virtual for time in hours
taskSchema.virtual('estimatedTimeHours').get(function() {
  return Math.round((this.estimatedTime / 60) * 10) / 10;
});

// Method to calculate AI score based on user skills
taskSchema.methods.calculateAIScore = function(userSkills, userGoals) {
  let score = 0;
  let totalWeight = 0;

  // Skill matching (60% weight)
  const skillMatch = this.skills.filter(skill => 
    userSkills.some(userSkill => 
      userSkill.name.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.name.toLowerCase())
    )
  ).length;
  
  const skillScore = (skillMatch / this.skills.length) * 60;
  score += skillScore;
  totalWeight += 60;

  // Goal alignment (30% weight)
  const goalMatch = userGoals.filter(goal => 
    goal.category === this.category && !goal.completed
  ).length;
  
  const goalScore = goalMatch > 0 ? 30 : 0;
  score += goalScore;
  totalWeight += 30;

  // Difficulty preference (10% weight)
  const difficultyScore = 10; // Simplified for now
  score += difficultyScore;
  totalWeight += 10;

  return Math.round((score / totalWeight) * 100);
};

// Static method to find tasks by user preferences
taskSchema.statics.findByUserPreferences = function(userSkills, userGoals, preferences) {
  const query = {
    isActive: true,
    isPublic: true
  };

  // Filter by difficulty if specified
  if (preferences.difficulty && preferences.difficulty !== 'all') {
    query.difficulty = preferences.difficulty;
  }

  // Filter by categories if specified
  if (preferences.categories && preferences.categories.length > 0) {
    query.category = { $in: preferences.categories };
  }

  return this.find(query)
    .sort({ aiScore: -1, averageRating: -1 })
    .limit(20);
};

// Method to update completion count
taskSchema.methods.incrementCompletion = function() {
  this.completionCount += 1;
  return this.save();
};

// Method to update rating
taskSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.averageRating * this.ratingCount) + newRating;
  this.ratingCount += 1;
  this.averageRating = totalRating / this.ratingCount;
  return this.save();
};

module.exports = mongoose.model('Task', taskSchema); 