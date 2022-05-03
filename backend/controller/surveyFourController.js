const asyncHandler = require('express-async-handler'); 

const surveyFour = require('../models/surveyFourModel')
const User = require('../models/userModel')
// @desc get surveys
// @route GET /api/survey
// @access private
const getSurveyFour = asyncHandler (async (req, res) => {
    const surveys = await surveyFour.find({ user: req.user.id});
    res.status(200).json(surveys);
})

// @desc set surveys
// @route POST /api/survey
// @access private
const setSurveyFour = asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('add a text');

    }

    const newsurvey = await surveyFour.create({
        text: req.body.text, 
        user: req.user.id,
    })
    res.status(200).json(newsurvey);
})

// @desc put surveys
// @route PUT /api/survey:id
// @access private
const updateSurveyFour  = asyncHandler (async (req, res) => {

    const Survey = await surveFour.findById(req.params.id);

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
const deleteSurveyFour = asyncHandler (async (req, res) => {
    const Survey = await surveyFour.findById(req.params.id);

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
    getSurveyFour, 
    setSurveyFour, 
    updateSurveyFour, 
    deleteSurveyFour


}