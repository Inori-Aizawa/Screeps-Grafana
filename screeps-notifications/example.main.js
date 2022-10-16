const Notifications = require('notifications')

module.exports.loop = () => {
  //you could map this to console.notify so you can do console.notify('title','message')
  console.notify = function(title,message) { Notifications.add('title',message) }
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name]
      console.log('Clearing non-existing creep memory:', name)
      Notifications.add('creep death',`The creep ${name} died.`)
    }
  }



}
