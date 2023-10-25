  import * as React from "react";
  import { IInputs } from "./generated/ManifestTypes";
  import type { InteractionItem } from 'chart.js';
  import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Title,
    ChartDataset, 
    ChartOptions,
    LineControllerDatasetOptions
  } from 'chart.js';
  import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
  } from 'react-chartjs-2';
  import { FontSizes } from "@fluentui/react";
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Title,
  );

  export interface IDataProps {
    appContext: ComponentFramework.Context<IInputs>;
    title?: string;
    displayTitle?: boolean;
    fontSize?: number;
    bottomPadding?: number;
    topPadding?: number;
    lineColor?: string;
    lineColor2?: string;
    displayTooltips?: boolean;

  }



  export const newChart: React.FC<IDataProps> = (
    { appContext, title, displayTitle, fontSize, topPadding, bottomPadding, lineColor,
      lineColor2, displayTooltips}) => {
      const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
          title: {
            display: displayTitle,
            text: title,
            padding: {
              top: topPadding,
              bottom: bottomPadding
            },
            font: {
              size: fontSize
            },
          },
          tooltip: {  // or 'tooltips' for Chart.js version 2
            enabled: true, // this will enable or disable tooltips
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 16 },
            bodyFont: { size: 14 },
            footerFont: { size: 12 },
          },
        },
        scales: {
          y: {
            min: 0,
            beginAtZero: true,
            position: 'left',
            ticks: {
              // Optional: Configure your ticks here
            }
          },
          y2: {
            position: 'right',
            beginAtZero: true,
            ticks: {
              // Optional: Configure your ticks here
            }
          }
        },
      };



    const dataSet = appContext.parameters.items;
    const dataRecords = dataSet.sortedRecordIds.map((record) => {
      return <> {dataSet.records[record].getFormattedValue("y-axis")}</>
    })
    const dataRecords2 = dataSet.sortedRecordIds.map((record) => {
      return <> {dataSet.records[record].getFormattedValue("y2-axis")}</>
    })
    const allRecords = dataSet.sortedRecordIds.map((record) => {

      console.log(dataSet.records + "data records");
      return <> {dataSet.records[record].getFormattedValue("x-axis")}</>
    })

    const labels: string[] = [];
    const datas: number[] = [];
    const datas2: number[] = [];
    dataRecords.forEach((dataItem) => {
      datas.push(dataItem.props.children[1])
    })
    dataRecords2.forEach((dataItem) => {
      datas2.push(dataItem.props.children[1])
    })
    allRecords.forEach((item) => {
      labels.push(item.props.children[1])
    })



    // const data: ChartDataset<'line', number[]>[] = [
    //   {
    //     type: 'line',
    //     label: 'Dataset 1',
    //     borderColor: lineColor,
    //     data: datas,
    //     yAxisID: 'y',
    //   },
    //   {
    //     type: 'line',
    //     label: 'Dataset 2',
    //     borderColor: lineColor2,  
    //     data: datas2,
    //     yAxisID: 'y2',
    //   },
    // ];

    const data: ChartDataset<'line', number[]>[] = [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: lineColor2,
        data: datas,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Dataset 2',
        borderColor: lineColor,  
        data: datas2,
        yAxisID: 'y2',
      },
    ];

    return (
      <>
  <Chart
    type="line"
    options={options}
    data={{ labels, datasets: data }}
  ></Chart>
      </>
    );
  }