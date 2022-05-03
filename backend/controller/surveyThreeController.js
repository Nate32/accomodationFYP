const asyncHandler = require('express-async-handler'); 

const surveyThree = require('../models/surveyThreeModel')
const User = require('../models/userModel')
// @desc get surveys
// @route GET /api/survey
// @access private
const getSurveysThree = asyncHandler (async (req, res) => {
    const surveys = await surveyThree.find({ user: req.user.id});
    res.status(200).json(surveys);
})

// @desc set surveys
// @route POST /api/survey
// @access private
const setSurveyThree= asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('add a text');

    }

    const newsurvey = await surveyThree.create({
        text: req.body.text, 
        user: req.user.id,
    })
    res.status(200).json(newsurvey);
})

// @desc put surveys
// @route PUT /api/survey:id
// @access private
const updateSurveyThree = asyncHandler (async (req, res) => {

    const Survey = await surveyThree.findById(req.params.id);

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

    const updatedSurvey = await surveyThree.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedSurvey);
})

// @desc DELETE surveys
// @route DELETE /api/survey:id
// @access private
const deleteSurveyThree = asyncHandler (async (req, res) => {
    const Survey = await surveyThree.findById(req.params.id);

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
    getSurveysThree, 
    setSurveyThree, 
    updateSurveyThree, 
    deleteSurveyThree


}