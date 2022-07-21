//LINE CHART

const osChart = document.getElementById('osChart');

const labels = [
    'Android',
    'Windows',
    'iOS',
    'OS X',
    'Ostalo',
    'Linux',
    'Chrome OS',
    'FreeBSD',
    'BlackBerry OS',
    'Samsung',
    'KaiOS',
    'Nokia Unknown'
];

const osData1 = [
    44.17,
    28.96,
    17.46,
    5.56,
    1.92,
    0.92
];

const osData2 = [
    0,
    76.31,
    0,
    14.66,
    4.88,
    2.43,
    1.72,
    0.01
];

const osData3 = [
    47.54,
    0.03,
    52.38,
    0,
    0.01,
    0.02,
    0,
    0,
    0.01
];

const osData4 = [
    72.11,
    0,
    27.22,
    0,
    0.11,
    0,
    0,
    0,
    0,
    0.42,
    0.08,
    0.01
];

new Chart(osChart, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'All Platforms',
                data: osData1,
                borderWidth: 3,
                borderRadius: 15,
                backgroundColor: 'rgba(150, 75, 225, 0.6)',
                borderColor: 'rgba(150, 75, 225, 1)'
            },
            {
                label: 'Desktop',
                data: osData2,
                borderWidth: 3,
                borderRadius: 15,
                backgroundColor: 'rgba(14, 70, 226, 0.6)',
                borderColor: 'rgba(14, 70, 226, 1)'
            },
            {
                label: 'Tablet',
                data: osData3,
                borderWidth: 3,
                borderRadius: 15,
                backgroundColor: 'rgba(200, 180, 25, 0.6)',
                borderColor: 'rgba(200, 150, 15, 1)'
            },
            {
                label: 'Mobile',
                data: osData4,
                borderWidth: 3,
                borderRadius: 15,
                backgroundColor: 'rgba(200, 15, 25, 0.6)',
                borderColor: 'rgba(200, 15, 25, 1)'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Operating System'
          }
        }
      },
});


let radarChart = document.getElementById('radarChart');

const labels2 = [
    'Engineering',
    'R&D',
    'Quality Assurance',
    'Marketing',
    'Sales',
];

const acmeData1 = [
    10250,
    12600,
    18500,
    14800,
    16100
];

const acmeData2 = [
    8250,
    8920,
    5780,
    10300,
    9150
];

new Chart(radarChart, {
    type: 'radar',
    data: {
        labels: labels2,
        datasets: [
            {
                label: 'Allocated Budget',
                data: acmeData1,
                borderWidth: 3,
                backgroundColor: 'rgba(47, 161, 138, 0.6)',
                borderColor: 'rgba(47, 161, 1385, 1)'
            },
            {
                label: 'Actual Spend',
                data: acmeData2,
                borderWidth: 3,
                backgroundColor: 'rgba(90, 207, 74, 0.8)',
                borderColor: 'rgba(68, 158, 55, 1)'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '2015 Budget for Acme Inc.'
          }
        }
      },
});


const mytimeChart = document.getElementById('mytimeChart');

const labels3 = [
    'Skola',
    'Spavanje',
    'Fizicka aktivnost',
    'Druzenje',
    'Ucenje Programiranja',
    'Razvijanje biznisa',
];

const mytime = [
    8,
    8,
    1.5,
    1,
    4.5,
    1
];

const bColors = [
    'rgba(83, 217, 30, 0.6)',
    'rgba(59, 166, 17, 0.6)',
    'rgba(66, 161, 80, 0.6)',
    'rgba(27, 209, 103, 0.6)',
    'rgba(171, 237, 116, 0.6)',
    'rgba(143, 219, 20, 0.6)',
];

const borderColors = [
    'rgba(83, 217, 30, 1)',
    'rgba(59, 166, 17, 1)',
    'rgba(66, 161, 80, 1)',
    'rgba(27, 209, 103, 1)',
    'rgba(171, 237, 116, 1)',
    'rgba(143, 219, 20, 1)',
];

new Chart(mytimeChart, {
    type: 'doughnut',
    data: {
        labels: labels3,
        datasets: [
            {
                label: 'Allocated Budget',
                data: mytime,
                borderWidth: 3,
                backgroundColor: bColors,
                borderColor: borderColors
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Organizacija vremena (h)'
          }
        }
      },
});