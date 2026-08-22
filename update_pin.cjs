const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace('pin === "9731"', 'pin === "9731851615"');
code = code.replace('maxLength={4}', 'maxLength={10}');
code = code.replace('width: "120px"', 'width: "250px"');

fs.writeFileSync('src/App.jsx', code);
console.log("PIN updated successfully.");
