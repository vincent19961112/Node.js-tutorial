const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.title) {
        res.status(400).send({
            message: "content can not be ompty!"
        });
        return;
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Tutorial.create(tutorial).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'some error occurred while creating the tutorial.'
        });
    });
};


exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Tutorial.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occurred while retrieving tutorials."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 'Error retrieving Tutorial with id=' + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Tutorial with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: 'Error updating Tutorial with id=' + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Tutorial with id=${id}.`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "could not delete Tutorial with id=" + id
        })
    })
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occurred while removing all tutorials."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occurred while retrieving tutorials."
        })
    })
};