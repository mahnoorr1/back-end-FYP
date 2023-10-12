const building = require('../model/buildings');
const Rule = require('../model/rule');
const SpecificRules = require('../model/SpecificRules')
const Trees = require('../model/Tree')
var AsyncHandler = require("express-async-handler");


const checkBuilding = async(longitude,latitude) => {

    const buildingfound  = await building.findOne({
        longitude: longitude,
        latitude: latitude
    });
    if(buildingfound) {
        return true
    }
    else{
        return false
    }
}

const Construction = AsyncHandler(
    async(req,res,next)=>{
        const { 
            longitude , 
            latitude , 
            Contstruction_Type,
            Plot_Measurment,
            } = req.body
            
            const isAlreadyBuilding = await checkBuilding(longitude ,latitude)
    
            if (isAlreadyBuilding) {
                return res.status(409).json({ message: 'Building already exists at this location.' });
            } else {
                const matchingRules = await Rule.findOne({
                    Contstruction_Type: Contstruction_Type,
                    Plot_Measurment_Min: { $lte: Plot_Measurment },  
                    Plot_Measurment_Max: { $gte: Plot_Measurment }   
                });

                if(matchingRules.Front_Setback_Min == ""){
                    matchingRules.Front_Setback_Min = 1
                }
                const NumberOfTrees = await Trees.findOne({  
                        Plot_Front: parseInt(matchingRules.Front_Setback_Min)
                })

            
                const TotalRules = {
                    Contstruction_Type : matchingRules.Contstruction_Type ? matchingRules.Contstruction_Type : null,
                    Least_Trees : NumberOfTrees.Trees ? NumberOfTrees.Trees : null,
                    Maximum_No_of_storeys: matchingRules.Maximum_No_of_storeys ? matchingRules.Maximum_No_of_storeys : null,
                    Maximum_FAR : matchingRules.Maximum_FAR ?  matchingRules.Maximum_FAR : null,
                    Maximum_Ground_coverage : matchingRules.Maximum_Ground_coverage ? matchingRules.Maximum_Ground_coverage : null,
                    Setbacks : matchingRules.Setbacks ? matchingRules.Setbacks : null,
                    Basement : matchingRules.Basement ? matchingRules.Basement : null,
                    Front_Setback_Min : matchingRules.Front_Setback_Min ? matchingRules.Front_Setback_Min : null,
                    Other : matchingRules.Other ? matchingRules.Other : null
                }
                return res.send(TotalRules)

               
            }
    }
)

module.exports = {
    Construction
}