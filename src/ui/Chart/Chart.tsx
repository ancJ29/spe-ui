import { shuffleArray } from "@/utils";
import ApexCharts, { ApexOptions } from "apexcharts";
import { set } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type _TYPES = "Default" | "Sparkline";
type Instance = ApexOptions;
type Custom = {
  instanceType: _TYPES;
  chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chartOptions: Instance;
};

export const randomizeArraySparkline = () => [
  {
    data: shuffleArray([47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62]),
  },
];

const optionsSparkline = (chartId: string): Instance => {
  return {
    series: [],
    chart: {
      id: `chart_${chartId}_apex`,
      type: "area",
      height: 40,
      width: 100,
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: false,
      },
    },
    colors: ["#00E396"],
    fill: {
      opacity: 0.4,
      colors: ["#00E396"],
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    // cspell:disable-next-line
    xaxis: {
      // cspell:disable-next-line
      crosshairs: {
        width: 1,
      },
    },
    // cspell:disable-next-line
    yaxis: {
      min: 0,
    },
    tooltip: {
      enabled: false,
    },
  };
};

type InstancePropsByType = {
  [k in _TYPES]: Instance;
};

const _props: Partial<InstancePropsByType> = {
  Default: {},
  Sparkline: optionsSparkline(uuidv4()),
};

type InstanceProps = Instance & Partial<Custom>;

type Series = ApexAxisChartSeries | ApexNonAxisChartSeries;

export default function AppChart(props: InstanceProps) {
  const refChart = useRef<HTMLDivElement>(null);
  const [chartId] = useState<string>(`chart_${uuidv4()}_apex`);
  const [options] = useState<Instance>(
    _props[props.instanceType ?? "Sparkline"] ?? {},
  );
  const [series] = useState<Series>(props.chartSeries ?? []);

  const updateSeries = useCallback(() => {
    const _chart = ApexCharts.getChartByID(chartId);
    if (_chart && props.chartOptions) {
      _chart?.updateOptions(props.chartOptions);
    }
  }, [chartId, props.chartOptions]);

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
          ...props.chartOptions,
        });
        chart.render().then(() => {
          if (series) {
            chart.updateSeries(series);
          }
        });
      }
    }
  }, [chartId, options, props.chartOptions, series]);

  useEffect(() => {
    updateSeries();
  }, [props.chartOptions, updateSeries]);

  return <div ref={refChart} id={chartId}></div>;
}
