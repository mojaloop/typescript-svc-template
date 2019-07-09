/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 - Shashikant Hirugade <shashikant.hirugade@modusbox.com>

 --------------
 ******/

'use strict'

const Test = require('tapes')(require('tape'))
import { Metrics, metricOptionsType } from '../../src/metrics'

Test('Metrics Class Test', (metricsTest: any): void => {
  metricsTest.test('getMetricsForPrometheus should', (getMetricsForPrometheusTest: any): void => {
    getMetricsForPrometheusTest.test('return the metrics', async (test: any) => {
      try {
        const metrics: Metrics = new Metrics()
        const options: metricOptionsType = {
          prefix: 'prefix3_',
          timeout: 1000
        }
        metrics.setup(options)
        const histTimerEnd = metrics
          .getHistogram('test_metric', 'Histogram for test metric', ['test_label'])
          .startTimer()

        /* eslint-disable-next-line @typescript-eslint/camelcase */
        histTimerEnd({ test_label: 'true' })

        const expected = 'prefix3_test_metric_count{test_label="true"} 1'

        let result = metrics.getMetricsForPrometheus()
        let matches = result.indexOf(expected)
        test.ok(matches != -1, 'Found the result')
        test.end()
      } catch (e) {
        console.log(e)
        test.fail(`Error Thrown - ${e}`)
        test.end()
      }
    })

    getMetricsForPrometheusTest.end()
  })

  metricsTest.end()
})
