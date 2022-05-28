"use strict";

//
function connectDB(mongoose, string) {
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect(string));

        case 2:
          console.log('database connected successfully');

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = connectDB;