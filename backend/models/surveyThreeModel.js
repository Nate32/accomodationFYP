const mongoose = require('mongoose');
const { stringify } = require('querystring');

const surveyThreeSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'

    }, 
    text: {
            
        
            "$schema": "http://json-schema.org/draft/2019-09/schema",
            "$id": "http://example.com/example.json",
            "type": "object",
            "default": {},
            "title": "Root Schema",
            "required": [
                "row1",
                "row2",
                "row3",
                "row4",
                "Row5",
                "Row6",
                "Row7",
                "Row8",
                "Row10",
                "Row9"
            ],
            "properties": {
                "row1": {
                    "type": "integer",
                    "default": 0,
                    "title": "The row1 Schema",
                    "examples": [
                        1
                    ]
                },
                "row2": {
                    "type": "integer",
                    "default": 0,
                    "title": "The row2 Schema",
                    "examples": [
                        2
                    ]
                },
                "row3": {
                    "type": "integer",
                    "default": 0,
                    "title": "The row3 Schema",
                    "examples": [
                        3
                    ]
                },
                "row4": {
                    "type": "integer",
                    "default": 0,
                    "title": "The row4 Schema",
                    "examples": [
                        2
                    ]
                },
                "Row5": {
                    "type": "integer",
                    "default": 0,
                    "title": "The Row5 Schema",
                    "examples": [
                        3
                    ]
                },
                "Row6": {
                    "type": "integer",
                    "default": 0,
                    "title": "The Row6 Schema",
                    "examples": [
                        2
                    ]
                },
                "Row7": {
                    "type": "integer",
                    "default": 0,
                    "title": "The Row7 Schema",
                    "examples": [
                        3
                    ]
                },
                "Row8": {
                    "type": "integer",
                    "default": 0,
                    "title": "The Row8 Schema",
                    "examples": [
                        2
                    ]
                },
                "Row10": {
                    "type": "integer",
                    "default": 0,
                    "title": "The Row10 Schema",
                    "examples": [
                        2
                    ]
                },
                "Row9": {
                    "type": "integer",
                    "default": 0,
                    "title": "The Row9 Schema",
                    "examples": [
                        3
                    ]
                }
            },
            "examples": [{
                "row1": 1,
                "row2": 2,
                "row3": 3,
                "row4": 2,
                "Row5": 3,
                "Row6": 2,
                "Row7": 3,
                "Row8": 2,
                "Row10": 2,
                "Row9": 3
            }]
        }  
         

}, 
{
    timestamps : true, 
}
);


module.exports = mongoose.model('SurveyThree', surveyThreeSchema); 