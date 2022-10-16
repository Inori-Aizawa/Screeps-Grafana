module.exports.add = (title,msg) => {
  let unixTime = Date.now()
  let screepsTime = Game.time
  if (Array.isArray(Memory.notifications))
    Memory.notifications = Memory.notifications.filter(entry => entry.unixTime && entry.unixTime > unixTime - 120000)
  else Memory.notifications = []
  Memory.notifications.push({
    unixTime: unixTime,
    title: title,
    screepsTime: screepsTime,
    msg: msg
  })
  //if the array is longer than 10, remove the oldest entry
  if (Memory.notifications.length > 10) Memory.notifications.shift()

}
