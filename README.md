Retail prices
---

Get publicly available data at [Department of Energy](https://www.doe.gov.ph/)

Supporting:

1. Retail pump prices (Oil)

More to come soon.

```console
$ npx playwright test

Running 5 tests using 1 worker
[Google Chrome] › doe.spec.js:55:5 › Retailing pump prices › Source: https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-mindanao
Reports saved!
  Slow test file: [Google Chrome] › doe.spec.js (47s)
  Consider splitting slow test files to speed up parallel execution

  5 passed (47s)

To open last HTML report run:

  npx playwright show-report

$ less reports/2022-05-18_retail_pump.json

[{"name":"NCR/Metro Manila","url":"https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-metro-manila","description":"Prevailing Retail Prices of Petroleum Products in NCR as of May 12, 2022\nDate of Monitoring: May 10-12, 2022","attachments":[["petro_ncr_2022-may-12.pdf","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_ncr_2022-may-12.pdf"]]},{"name":"South Luzon","url":"https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-south-luzon","description":"Prevailing Retail Prices of Petroleum Products in Southern Luzon as of May 10, 2022Prevailing Retail Prices of Petroleum Products in Southern Luzon as of May 10, 2022","attachments":[["Batangas, Rizal, and Quezon","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_sluz_2022-may-10_batangas-rizal-quezon.pdf"],["Bicol Region","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_sluz_2022-may-10_bicol-region.pdf"],["Cavite","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_sluz_2022-may-10_cavite.pdf"],["Laguna","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_sluz_2022-may-10_laguna.pdf"],["MIMAROPA","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_sluz_2022-may-10_mimaropa.pdf"]]},{"name":"North Luzon","url":"https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-north-luzon","description":"Prevailing Retail Prices of Liquid Petroleum Products (LPP) in the Key Cities/Municipalities in Northern Luzon as per Price Movement on May 13, 2022Prevailing Retail Prices of Liquid Petroleum Products (LPP) in the Key Cities/Municipalities in Northern Luzon as per Price Movement on May 13, 2022","attachments":[["petro_nluz_2022-may-13.pdf","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_nluz_2022-may-13.pdf"]]},{"name":"Visayas","url":"https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-visayas","description":"Prevailing Retail Prices of Petroleum Products in Visayas as of May 10-16, 2022Weekly prevailing prices of Liquid Petroleum Products (LPP) in the cities of Cebu, Mandaue, Tagbilaran, Ormoc, Maasin, Tacloban, Dumaguete, Bacolod, Iloilo, Roxas, Calbayog, Catarman, and provinces of Siquijor, Guimaras, Biliran, Antique and Eastern Samar (Borongan and Guiuan).\nThis price monitoring covers the prices prevalent in the area based on calls to selected outlets during the period May 10-16, 2022.\nPrice advisory from different oil companies implemented an increase in all products. Gasoline with P4.20/liter, diesel with P4.20/liter, and kerosene with P5.85/liter.","attachments":[["petro-vis_2022-may-10.pdf","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro-vis_2022-may-10.pdf"]]},{"name":"Mindanao","url":"https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-mindanao","description":"Prevailing Retail Prices of Petroleum Products in Mindanao as of May 10, 2022","attachments":[["petro_min_2022-may-10.pdf","https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_min_2022-may-10.pdf"]]}]

$ ls reports/2022-05-18
petro-vis_2022-may-10.pdf                        petro_nluz_2022-may-13.pdf                       petro_sluz_2022-may-10_cavite.pdf
petro_min_2022-may-10.pdf                        petro_sluz_2022-may-10_batangas-rizal-quezon.pdf petro_sluz_2022-may-10_laguna.pdf
petro_ncr_2022-may-12.pdf                        petro_sluz_2022-may-10_bicol-region.pdf          petro_sluz_2022-may-10_mimaropa.pdf
```

Example input (.env)

```env
REPORTS_DIRECTORY=/Users/arthurmorgan/petro/reports
```

Example output (JSON)

```json
[
  {
    "name": "NCR/Metro Manila",
    "url": "https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-metro-manila",
    "description": "Prevailing Retail Prices of Petroleum Products in NCR as of May 12, 2022\nDate of Monitoring: May 10-12, 2022",
    "attachments": [
      [
        "petro_ncr_2022-may-12.pdf",
        "https://www.doe.gov.ph/sites/default/files/pdf/price_watch/petro_ncr_2022-may-12.pdf"
      ]
    ]
  }
]
```


## Development

Run in Docker

```console
# cd to project, then run the following commands
$ docker build --platform linux/x86_64 -tag docker-retailprices-local-dev .
$ docker run -p 9000:9323 --platform linux/x86_64 -v $(pwd):/app --env-file .env_in_container --name retailprices --rm docker-retailprices-local-dev npm run test-pw  && npx playwright show-report

> test-pw
> npx playwright test


Running 5 tests using 1 worker

  ✓  [firefox] › doe.spec.js:60:5 › Retailing pump prices › Source: https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-metro-manila (39s)
  ✓  [firefox] › doe.spec.js:60:5 › Retailing pump prices › Source: https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-south-luzon (16s)
  ✓  [firefox] › doe.spec.js:60:5 › Retailing pump prices › Source: https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-north-luzon (18s)
  ✓  [firefox] › doe.spec.js:60:5 › Retailing pump prices › Source: https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-visayas (16s)
Reports saved!
  ✓  [firefox] › doe.spec.js:60:5 › Retailing pump prices › Source: https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-mindanao (17s)

  Slow test file: [firefox] › doe.spec.js (2m)
  Consider splitting slow test files to speed up parallel execution

  5 passed (2m)

  Serving HTML report at http://127.0.0.1:9323. Press Ctrl+C to quit.
```

Notes:

1. Currently for Docker on M1, only Firefox runs smoothly.
2. The `--platform linux/x86_64` is needed for Docker on M1.
3. The `--env-file .env_in_container` can be used especially when switching easily the reports directory (env `REPORTS_DIRECTORY=/app/reports`)
