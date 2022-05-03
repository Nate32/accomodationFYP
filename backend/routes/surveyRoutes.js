const express = require('express');
const router = express.Router();
const {getSurveys, setSurvey, updateSurvey, deleteSurvey} = require('../controller/surveyController');
const {getSurveysTwo, setSurveyTwo, updateSurveyTwo, deleteSurveyTwo} = require('../controller/surveyTwoController');
const {protect} = require('../middleware/authMiddleware')
const {getSurveysThree, setSurveyThree, updateSurveyThree, deleteSurveyThree} = require('../controller/surveyThreeController');
const { setSurveyFour, updateSurveyFour, deleteSurveyFour, getSurveyFour } = require('../controller/surveyFourController');


router.route('/').get(protect, getSurveys).post(protect, setSurvey);
router.route('/:id').delete(protect, deleteSurvey).put(protect, updateSurvey);


router.route('/two').get(protect, getSurveysTwo).post(protect, setSurveyTwo);
router.route('/:id').delete(protect, deleteSurveyTwo).put(protect, updateSurveyTwo);

router.route('/three').get(protect, getSurveysThree).post(protect, setSurveyThree);
router.route('/:id').delete(protect, deleteSurveyThree).put(protect, updateSurveyThree);

router.route('/four').get(protect, getSurveyFour).post(protect, setSurveyFour);
router.route('/:id').delete(protect, deleteSurveyFour).put(protect, updateSurveyFour);

router.route('/getall').get( protect, getSurveys)// getSurveysThree ,getSurveyFour);
router.route('/getall').get( protect, getSurveysTwo)







module.exports = router;