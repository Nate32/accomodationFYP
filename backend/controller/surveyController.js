const asyncHandler = require('express-async-handler'); 

const surveyOne = require('../models/surveyModel')
const User = require('../models/userModel')
// @desc get surveys
// @route GET /api/survey
// @access private
const getSurveys = asyncHandler (async (req, res) => {
    const surveys = await surveyOne.find({ user: req.user.id});
    res.status(200).json(surveys);
})

// @desc set surveys
// @route POST /api/survey
// @access private
const setSurvey = asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('add a text');

    }

    const newsurvey = await surveyOne.create({
        text: req.body.text, 
        user: req.user.id,
    })
    res.status(200).json(newsurvey);
})

// @desc put surveys
// @route PUT /api/survey:id
// @access private
const updateSurvey = asyncHandler (async (req, res) => {

    const Survey = await surveyOne.findById(req.params.id);

    if(!Survey){
        res.status(400)
        throw new Error('survey doesnt exist')
    }


    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }
    if(Survey.user.toString() != req.user.id){
        res.status(401)
        throw new Error('user not authorised')
    }

    const updatedSurvey = await surveyOne.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedSurvey);
})

// @desc DELETE surveys
// @route DELETE /api/survey:id
// @access private
const deleteSurvey = asyncHandler (async (req, res) => {
    const Survey = await surveyOne.findById(req.params.id);

    if(!Survey){
        res.status(400)
        throw new Error('survey doesnt exist')
    }


    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }
    if(Survey.user.toString() != req.user.id){
        res.status(401)
        throw new Error('user not authorised')
    }

    await Survey.deleteOne();
    res.status(200).json({id : req.params.id});
   
}) 

module.exports = {
    getSurveys, 
    setSurvey, 
    updateSurvey, 
    deleteSurvey


}