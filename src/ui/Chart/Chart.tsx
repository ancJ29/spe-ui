import ApexCharts, { ApexOptions } from "apexcharts";
import { useEffect, useRef } from "react";
const randomizeArray = function (arg: any[]) {
    var array = arg.slice();
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62,];

export default function AppChart() {
    let optionsSpark3: ApexOptions = {
        series: [{
            data: randomizeArray(sparklineData)
        }],
        chart: {
            type: 'area',
            height: 40,
            width: 100,
            sparkline: {
                enabled: true
            },
            dropShadow: {
                enabled: false
            }
            
        },
        stroke: {
            curve: 'smooth'
        },
        fill: {
            opacity: 0.3
        },
        xaxis: {
            crosshairs: {
                width: 1
            },
        },
        yaxis: {
            min: 0
        },
        tooltip: {
            enabled: false
        },
    };
    const refChart = useRef(null)
    useEffect(() => {
        if (refChart.current !== null) {
            let chartSpark3 = new ApexCharts(refChart.current, optionsSpark3);

            chartSpark3.render();
        }
    }, [])
    return (
        <div ref={refChart}></div>
    )
}
