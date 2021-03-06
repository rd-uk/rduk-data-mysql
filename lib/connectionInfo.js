/**
 * MIT License
 *
 * Copyright (c) 2016 - 2018 RDUK <tech@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const errors = require('@rduk/errors')
const extend = require('extend')

const DEFAULT_CONFIG = {
  host: 'localhost',
  port: 3306,
  limit: 10
}

class PostgreSQLConnectionInfo {
  constructor (conn, provider) {
    conn = extend(true, {}, DEFAULT_CONFIG, conn || {})

    if (!conn.user) {
      errors.throwConfigurationError('MySQL configuration: user missing.')
    }

    if (!conn.password) {
      errors.throwConfigurationError('MySQL configuration: password missing.')
    }

    if (!conn.database) {
      errors.throwConfigurationError('MySQL configuration: database missing.')
    }

    this.host = conn.host
    this.port = conn.port
    this.user = conn.user
    this.password = conn.password
    this.db = conn.database
    this.limit = conn.limit
    this.provider = provider || 'default'
    this.timeout = conn.timeout || 10000
  }
  get identifier () {
    return `${this.provider}://${this.user}@${this.host}:${this.port}/${this.db}`
  }
}

module.exports = PostgreSQLConnectionInfo
