const jwt = require('jsonwebtoken');
const config = require('./../../../config');
const User = require('./../../models/users');
const Role = require('./../../models/role');
const { request } = require('express');

const validate = (req, res, next) => {
    const token = req.headers["x-access-token"];
    const permission = req.headers["x-access-permission"];
    jwt.verify(token, config.tokenKey, (err, decoded) =>{
        if(err){
            res.sendStatus(401);
        }else{
            let allow = false;           
            User.findById({_id: decoded.id}, 'role_ids')
            .populate('role_ids.rol', ['name', 'permission_ids'])
            .then((response) => {
                const listOfRoles = response.role_ids;
                listOfRoles.forEach(element => {
                    const permissions = element.rol.permission_ids;
                    permissions.forEach(element => {
                        if(element.permission == permission) {
                            allow = true
                        }
                    });
                });
                if(allow) next();
                else res.status(403).send({error: 'access denied'})                                
            }).catch((err) => {
                res.status(401).send('invalid token');
            });
        }
    });
};

module.exports = validate;