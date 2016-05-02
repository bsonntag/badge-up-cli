#!/usr/bin/env node
'use strict'

const badgeUp = require('badge-up')
const fs = require('fs')
const meow = require('meow')

const cli = meow(`
  Usage
    $ badge-up <field1> <field2> <color>

  Example
    $ badge-up "npm" "v1.0.0" "#007EC6"
`)

if(cli.input.length < 3) {
  fail()
}

const field1 = cli.input[0]
const field2 = cli.input[1]
const color = cli.input[2]

if(!field1 || !field2 || !color) {
  fail()
}

badgeUp(field1, field2, color, function(err, svg) {
  if(err) {
    console.error('Error generating badge: ' + err.message)
    process.exit(1)
  }
  else {
    let fileName = field1 + '-' + field2 + '.svg'
    console.log('Saving badge to ' + fileName)
    fs.writeFile(fileName, svg, function(err) {
      if(err) {
        console.error('Error saving badge: ' + err.message)
        process.exit(1)
      }
      else {
        console.log('Done')
      }
    })
  }
})

function fail() {
  console.error('Specify two fields and a color')
  process.exit(1)
}
