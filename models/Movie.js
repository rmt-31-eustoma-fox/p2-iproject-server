'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    title: {
      type: String,
      required:[true, "Title is required"]
    },
    overview: {
      type: String
    },
    language: {
      type: String,
      required:[true, "Language Movie is required"]
    },
    image: {
      type: String
    },
    releaseDate: {
      type: Date,
      required:[true, "Release Date cannot be empty"]
    },
    tagline: {
      type: String
    },
    rating: {
      type: Number,
      default:0
    },
    ratingQuantity: {
      type: Number,
      default:0
    },
    adult: {
      type: Boolean,
      required:[true, "Adult Content Cheker cannot be empty"]
    },
    popularity: {
      type: Number,
      default:0
    },
    genres: {
      type: [{type:mongoose.Schema.ObjectId, ref:"Genre"}],
      required:[true, "Genre is required"]
    },
    certification: {
      type: String,
      required:[true, "Certification is required"]
    },
    video: {
      type: String,
      required:[true, "Video Url is required"]
    },
    subscripted: {
      type: Boolean,
      required:[true, "Subscription is required"]
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Movie = mongoose.model('Movie', newSchema);
  return Movie;
};