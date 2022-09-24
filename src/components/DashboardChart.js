import React , {useState} from "react";
import useMealOptionGenerator from "./useMealOptionGenerator"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const DashboardChart = (meal) => {
    
  const data = {
      labels: useMealOptionGenerator(meal).nutrientsNameArray,
      datasets: [{
        
        label: useMealOptionGenerator(meal).mealName,
        data: useMealOptionGenerator(meal).nutrientsAmountArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };


    const config = {
      maintainAspectRatio: false,
      data: data,
      options: {
        
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: "abc"
          }
        }
      },
    };

    
  return {config , data};
};

export default DashboardChart;
