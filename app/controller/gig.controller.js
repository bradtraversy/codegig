const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// Get gig list
module.exports.get = async (req, res) => {

    try {
        const gigs = await Gig.findAll();
        if (gigs) {
            res.render('gigs', {
                gigs
            });
        }
    } catch (e) {
        res.render('error', { error: e })
    }

}

// Display add gig form
module.exports.display = async (req, res) => {

    res.render('add');
}


// Add a gig
module.exports.create = async (req, res) => {

    try {
        let { title, technologies, budget, description, contact_email } = req.body;
        let errors = [];

        // Validate Fields
        if (!title) {
            errors.push({ text: 'Please add a title' });
        }
        if (!technologies) {
            errors.push({ text: 'Please add some technologies' });
        }
        if (!description) {
            errors.push({ text: 'Please add a description' });
        }
        if (!contact_email) {
            errors.push({ text: 'Please add a contact email' });
        }
        // Check for errors
        if (errors.length > 0) {
            res.render('add', {
                errors,
                title,
                technologies,
                budget,
                description,
                contact_email
            });
        } else {
            if (!budget) {
                budget = 'Unknown';
            } else {
                budget = `$${budget}`;
            }
        }
        // Make lowercase and remove space after comma
        technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

        // Insert into table
        const create = await Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        });
        create.save();
        res.redirect('/gigs');

    } catch (e) {
        res.render('error', { error: e.message })
    }

}

// Search for gigs

module.exports.search = async (req, res) => {
    try {
        let { term } = req.query;
        // Make lowercase
        term = term.toLowerCase();

        const gigs = await Gig.findAll({
            where: {
                technologies: {
                    [Op.like]: '%' + term + '%'
                }
            }
        });
        if (gigs) {
            res.render('gigs', { gigs })
        }

    } catch (e) {
        res.render('error', { error: e })
    }

}




