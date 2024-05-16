import { useState, useEffect } from "react"
import { 
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts"; 


function BarChart2({registrations}) {

  const [data, setData] = useState([]);

  const uniqueWithCount = (arr, idKey, countKey) =>
    Object.values(arr.reduce((acc, n) => (
      (acc[n[idKey]] ??= { ...n, [countKey]: 0 })[countKey]++, acc
    ), {}));
  
    function convertDate(str) {
      const data = new Date(str);
      return data.getDate() + '/' +
          (data.getMonth() + 1) + '/' +
          data.getFullYear()
  }

  function compareByDate(a, b){
    return new Date(a["registration_date"]) - new Date(b["registration_date"]);
  }
  useEffect(() => {
    const result = uniqueWithCount(registrations.sort(compareByDate), 'registration_date', 'qty');

    for (let i in result){
      setData(data => [...data, {name: convertDate(result[i].registration_date), registrations: result[i].qty}]);
    }
  },[registrations.length]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="py-5 text-3xl">Chart displaying the amount of registrations per day for the given event.</h2>
      <div className="App">
        <BarChart
          width={1200}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="registrations" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
    );
}


export default BarChart2