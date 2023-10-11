var mongoose = require('mongoose')

const buildingSchema = mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    area_in_meters: {
      type: Number,
    },
    confidence: {
      type: Number
    },
    geometry: {
      type: String,
    },
    full_plus_code: {
      type: String
    }
  },
  {
    timestamps: true,
  }
)





const building = mongoose.model('building', buildingSchema)

module.exports =  building
