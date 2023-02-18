const Event = require('../models/event');




function show(req, res) {
    Event.findById(req.params.id, function (err, data) {
        if (err) res.status(404)
        res.status(200).json(data)
    })
}




async function index(req, res) {
    Event.find({}, function (err, data) {
        if (err) res.status(404)
        res.status(200).json(data)
    })
}

async function create(req, res) {
    const event = new Event(req.body);
    await event.save();
    res.json(event)
}

function deleteEvent(req, res) {
    Event.findByIdAndDelete(req.params.id, function(err, event){
        if(err) console.log(err);
        res.status(200).json(event)
    })
} 


async function update(req, res) {
    try {
        console.log(`update id = ${req.params.id}, body = ${JSON.stringify(req.b)}`)
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!event) {
        return res.status(404).json({ message: "event not found" });
      }
  
      return res.statue(200).json(event);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  }







module.exports = {
    create,
    index,
    show,
    delete: deleteEvent,
    update

}