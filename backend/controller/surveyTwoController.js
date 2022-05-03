const asyncHandler = require('express-async-handler'); 

const surveyTwo = require('../models/surveyTwoModel')
const User = require('../models/userModel')
// @desc get surveys
// @route GET /api/survey
// @access private
const getSurveysTwo = asyncHandler (async (req, res) => {
    const surveys = await surveyTwo.find({ user: req.user.id});
    res.status(200).json(surveys);
})

// @desc set surveys
// @route POST /api/survey
// @access private
const setSurveyTwo= asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('add a text');

    }

    const newsurvey = await surveyTwo.create({
        text: req.body.text, 
        user: req.user.id,
    })
    res.status(200).json(newsurvey);
})

// @desc put surveys
// @route PUT /api/survey:id
// @access private
const updateSurveyTwo = asyncHandler (async (req, res) => {

    const Survey = await surveyTwo.findById(req.params.id);

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

    const updatedSurvey = await surveyTwo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedSurvey);
})

// @desc DELETE surveys
// @route DELETE /api/survey:id
// @access private
const deleteSurveyTwo = asyncHandler (async (req, res) => {
    const Survey = await surveyTwo.findById(req.params.id);

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
    getSurveysTwo, 
    setSurveyTwo, 
    updateSurveyTwo, 
    deleteSurveyTwo


}