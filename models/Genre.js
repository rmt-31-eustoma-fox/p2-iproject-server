'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String,
      required:[true,"Genre name is required"],
      unique: {
        values: true,
        message: "{VALUE} already exist"
      }
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  newSchema.index({name:1}, {unique:true});
  const Genre = mongoose.model('Genre', newSchema);
  return Genre;
};