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


  }



  export const newChart: React.FC<IDataProps> = (
    { appContext, title, displayTitle, fontSize, topPadding, bottomPadding, lineColor }) => {
    const options = {
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

      },
      scales: {
        y: {
          min: 0,
          ticks: {
            //callback: value => `${value / 100} m`
          }
        },
      },
    };


    const dataSet = appContext.parameters.items;
    const dataRecords = dataSet.sortedRecordIds.map((record) => {
      return <> {dataSet.records[record].getFormattedValue("y-axis")}</>
    })
    const allRecords = dataSet.sortedRecordIds.map((record) => {

      console.log(dataSet.records + "data records");
      return <> {dataSet.records[record].getFormattedValue("x-axis")}</>
    })

    const labels: string[] = [];
    const datas: number[] = [];
    dataRecords.forEach((dataItem) => {
      datas.push(dataItem.props.children[1])
    })
    allRecords.forEach((item) => {
      labels.push(item.props.children[1])
    })


    const data = {
      labels,
      datasets: [
        {
          type: 'line' as const,
          label: 'Dataset 1',
          borderColor: lineColor
,
          data: datas
        },
      ]
    }

    return (
      <>
        <Chart
          type="line"
          options={options}
          data={data}
        ></Chart>
      </>
    );
  }