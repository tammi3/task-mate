import { Chart } from "chart.js/auto";
import { useTasksStore } from "@/stores/task";
import { storeToRefs } from "pinia";

export function getChart() {
  const taskStore = useTasksStore();
  const { tasks } = storeToRefs(taskStore);
  // const canvas = document.getElementById("myChart");
  // const isMobile = window.innerWidth <= 768;

  // if (isMobile) {
  //   canvas.height = 500; // Set the height for mobile view
  // }

  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const completedTasks = tasks.value.filter((task) => {
    // Ensure task.start_date is a Date object
    const taskDate = new Date(task.start_date);

    return (
      task.isCompleted === true &&
      task.isArchived === false &&
      taskDate.getFullYear() === currentDate.getFullYear()
    );
  });
  const jan = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[0];
  });
  const feb = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[1];
  });
  const mar = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[2];
  });
  const apr = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[3];
  });
  const may = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[4];
  });
  const jun = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[5];
  });
  const jul = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[6];
  });
  const aug = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[7];
  });
  const sep = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[8];
  });
  const oct = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[9];
  });
  const nov = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[10];
  });
  const dec = completedTasks.filter((task) => {
    const taskDate = new Date(task.start_date);
    const taskMonth = months[taskDate.getMonth()];
    return taskMonth === months[11];
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Completed Tasks",
        data: [
          jan.length,
          feb.length,
          mar.length,
          apr.length,
          may.length,
          jun.length,
          jul.length,
          aug.length,
          sep.length,
          oct.length,
          nov.length,
          dec.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(201, 203, 207, 0.7)",
          "rgba(99, 118, 141, 0.7)",
          "rgba(163, 177, 138, 0.7)",
          "rgba(158, 42, 43, 0.7)",
          "rgba(238, 230, 96, 0.7)",
          "rgba(58, 200, 66, 0.7)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(99, 118, 141)",
          "rgb(163, 177, 138)",
          "rgb(158, 42, 43)",
          "rgb(238, 230, 96)",
          "rgb(58, 200, 66)",
        ],
        borderWidth: 3,
        color: "#fff",
      },
    ],
  };

  new Chart(document.getElementById("acquisitions"), {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "white", // Change the color of x-axis labels
          },
          grid: {
            color: "rgba(255, 255, 251, 0.5)", // Light grey grid lines
            lineWidth: 2, // Thicker grid lines
            borderColor: "white", // Red border color
            borderWidth: 2, // Thicker border
          },
        },
        x: {
          beginAtZero: true,
          ticks: {
            color: "white", // Change the color of x-axis labels
          },
          grid: {
            color: "rgba(255, 255, 251, 0.5)", // Light grey grid lines
            lineWidth: 2, // Thicker grid lines
            borderColor: "white", // Red border color
            borderWidth: 2, // Thicker border
          },
        },
      },
      plugins: {
        legend: {
          title: {
            display: true,
            text: `${currentDate.getFullYear()} PRODUCTIVITY STATS`,
            color: "#fff", // Custom dark color
            font: {
              size: 24, // Larger font size
              family: "Poppins, sans-serif", // Font family
              weight: "600", // Semi-bold font weight
            },
            padding: {
              top: 10,
              bottom: 10,
            },
          },
          labels: {
            color: "#fff",

            // This more specific font property overrides the global property
            font: {
              size: 20,
              family: "Poppins, sans-serif",
              weight: "600",
            },
          },
        },
      },
    },
  });
}
