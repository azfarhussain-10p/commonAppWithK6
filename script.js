import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
	vus: 10,
	duration: '30s',
	thresholds: {
		http_req_duration: [
			{
				threshold: 'p(95)<2000',
				abrotOnFail: true,
			},
		],
		checks: [
			{
				threshold: 'rate>0.9',
			},
		],
	},
}

export default function () {
	let results = http.get('http://test.k6.io')

	check(results, {
		'Status is 200': r => r.status == 200,
		'Duration < 1000ms': r => r.timings.duration < 1000,
	})

	sleep(1)
}
