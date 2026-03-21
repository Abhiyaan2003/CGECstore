const fs = require('fs')
fs.writeFileSync('debug_output.txt', 'Script started\n')
try {
    fs.appendFileSync('debug_output.txt', 'Testing basic require\n')
} catch (e) {
    // swallow
}
process.exit(0)
