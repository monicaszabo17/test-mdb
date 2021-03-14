const Weddingtodo = require("../models/todoModel");

exports.test = (req, res) => {
    res.send('REST API testing!');
};

exports.addWeddingtodo = (req,res,next) =>{
    const weddingtodo = new Weddingtodo({
        title:req.body.title,
        description:req.body.description,
        actionby:req.body.actionby,
        dueByDate:req.body.dueByDate,
        status:req.body.status,
        option:req.body.option
    });
    weddingtodo.save().then(addedWeddingtodo =>{
        res.status(201).json({
            msg:"Weddingtodo was added.",
            weddingtodo:{
                ...addedWeddingtodo,
                id:addedWeddingtodo._id
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            msg:"Weddingtodo could not be added"
        });
    });
};

exports.modifyWeddingtodo =(req,res,next) => {
    const weddingtodo = new Weddingtodo({
        _id:req.body.id,
        title:req.body.title,
        description:req.body.description,
        actionby:req.body.actionby,
        dueByDate:req.body.dueByDate,
        status:req.body.status,
        option:req.body.option,
        creator:req.userData.userId
     });
     Weddingtodo.updateOne({_id:req.params.id, creator:req.userData.userId }, weddingtodo)
        .then(data => {
            if(data.nr > 0 ){
                res.status(200).json({
                    msg:"Modified weddingtodo"
                });
            }else{
                res.status(401).json({
                    msg:"Unauthorized modification"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                msg:"Updating failed"
            });
        });
    };

exports.getWeddingtodo = (req,res,next) => {
    Weddingtodo.findById(req.params.id).then(weddingtodo =>{
        if(weddingtodo){
            res.status(200).json(weddingtodo);
        }else{
            res.status(404).json({msg:"Weddingtodo was not found."});
        }
     })
     .catch(error => {
         res.status(500).json({
             msg:"Weddingtodo retrieval failed."
         });
     });
    };

exports.deleteWeddingtodo = (req,res,next) =>{
    Weddingtodo.deleteOne({_id: req.params.id, creator:req.userData.userId})
        .then(data => {
            console.log(data);
            if(data.nr > 0){
                res.status(200).json({msg:"Weddingtodo was deleted."});
            }else{
                res.status(401).json({
                    msg:"Deletion unauthorized."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                msg:"Weddingtodo deletion failed."
            });
        });
    };

    exports.allWeddingtodo = (req, res,next) => {
		Weddingtodo.find().toArray().then((data) => {
			res.status(200).send(data);
		}).catch((error) => {
			console.error('Get weddingtodos error: ', error);
			res.status(400).send(error);
		});
	};
