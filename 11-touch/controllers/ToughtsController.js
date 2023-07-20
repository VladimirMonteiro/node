const Toughts = require('../models/Tought')

module.exports = class ToughtsController{

    static async showToughts(req,res){
        res.render('toughts/home')
        
    }

    static async dashboard(req, res){

        const userId = req.session.userid

        const toughts = await Toughts.findAll({where:{UserId: userId}})
        res.render('toughts/dashboard', {toughts})
    }

    static async createToughtPost(req, res){

        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }



        try {

            await Toughts.create(tought)
            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(()=>{
    
            res.redirect('/toughts/dashboard')
    
            })
            
        } catch (error) {
            console.log(error)
            
        }

      



    }

    static  createTought(req,res){
        res.render('toughts/create')

    }

}