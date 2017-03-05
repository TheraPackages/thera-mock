'use strict'
'use babel'

const fsp = require('fs-promise')
const path = require('path')
const fs = require('fs')

const WS_CONNECTED = 'weex-run:ws-connected'
const WS_DISCONNECTED = 'weex-run:ws-disconnected'
// const WS_SEND_MSG = 'weex-run:ws-send-msg'
const HTTP_SEND_MSG = 'weex-run:http-send-msg'
const MOCK_DATA_URL = 'http://localhost:PORT/mockConfig'

module.exports = (function () {
  var lanuchConfigPath

  function activate () {
    atom.commands.add(atom.commands.rootNode, WS_CONNECTED, () => _onConnected())
    atom.commands.add(atom.commands.rootNode, WS_DISCONNECTED, () => _onDisconnected())
  }

  function _onConnected () {
    let projectPath = atom.project.getDirectories()[0].path
    lanuchConfigPath = path.join(projectPath, '.thera', 'launch.json')

    // send config on connected
    fsp.readJson(lanuchConfigPath)
      .then((launchJSON) => {
        let msg = _parseMockConfig(launchJSON.mock)
        _sendConfig(msg)
      })

    // watch config changes
    fs.watchFile(lanuchConfigPath, (curr, prev) => {
      fsp.readJson(lanuchConfigPath)
        .then((lanuchJSON) => {
          let payload = _parseMockConfig(lanuchJSON.mock)
          _sendConfig(payload)
        })
    })
  }

  function _parseMockConfig (config) {
    let projectPath = atom.project.getDirectories()[0].path
    var body
    if (config && Array.isArray(config)) {
      body = {
        'message': 'mock',
        'data': {
          'mock': []
        }
      }

      config.forEach((m) => {
        let mockData = {}
        for (var p in m) {
          if (m.hasOwnProperty(p)) {
            mockData[p] = m[p].replace('${workspaceRoot}', projectPath)
          }
        }
        body.data.mock.push(mockData)
      })
    }

    let payload = {
      url: MOCK_DATA_URL.replace('PORT', atom.config.get('weex-run.dumplingPort')),
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: body
    }

    return payload
  }

  function _onDisconnected () {
    fs.unwatchFile(lanuchConfigPath)
  }

  function _sendConfig (msg) {
    atom.commands.dispatch(atom.views.getView(atom.workspace), HTTP_SEND_MSG, msg)
  }

  return {
    activate: activate
  }
})()
