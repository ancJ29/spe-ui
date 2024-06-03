import ApexCharts, { ApexOptions } from "apexcharts";
import { set } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const randomizeArray = function (arg: any[]) {
  const array = arg.slice();
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62];

type _TYPES = TransformInputToUnion<{
  Default: "Default",
  Sparkline: "Sparkline",
}>;

type Instance = ApexOptions;
type Custom = {
  instancetype: _TYPES,
  chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries
  chartOptions: Instance
};


export const randomizeArraySparkline = () => {
  return [{
    data: randomizeArray(sparklineData)
  }];
};

const optionsSparkline = (chartId: string): Instance => {
  return {
    series: [],
    chart: {
      id: `chart_${chartId}_apex`,
      type: "area",
      height: 40,
      width: 100,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: false
      },
    },
    colors: ["#00E396"],
    fill: {
      opacity: 0.4,
      colors: ["#00E396"], // Set màu nền cho phần fill của biểu đồ
    },
    stroke: {
      curve: "smooth",
      width: 1,
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
};

const _props: Partial<InstancePropsByType<_TYPES, Instance>> = {
  Default: {},
  Sparkline: optionsSparkline(uuidv4())
};

type InstanceProps = Instance & Partial<Custom>;

export default function AppChart(props: InstanceProps) {
  const refChart = useRef<HTMLDivElement>(null);
  const [chartId] = useState<string>(`chart_${uuidv4()}_apex`);
  const [options] = useState<Instance>(_props[props.instancetype ?? "Sparkline"] ?? {});
  const [series] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries>(props.chartSeries ?? []);

  const udpateSeries = useCallback(() => {
    const _chart = ApexCharts.getChartByID(chartId);
    if(_chart && props.chartOptions) {
      _chart?.updateOptions(props.chartOptions);
    }
  }, []);

  useEffect(() => {
    if (refChart.current != null) {
      const _options = { ...options };
      const ops = set(_options, "chart.id", chartId);
      const _chart = ApexCharts.getChartByID(chartId);
      if (_chart) {
        _chart.updateOptions(ops).then(() => {
          if (series) {
            _chart.updateSeries(series);
          }
        });
      } else {
        const chart = new ApexCharts(refChart.current, {
          ...ops,
          ...props.chartOptions
        });
        chart.render().then(() => {
          if (series) {
            chart.updateSeries(series);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    udpateSeries();
  }, [props.chartOptions]);

  return (
    <div ref={refChart} id={chartId}></div>
  );
}
