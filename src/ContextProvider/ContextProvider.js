import { createContext, useEffect, useState } from 'react';
import { fetchApiData, NUMBER_OF_TOP_ITEMS } from '../utils/Constants';
import { sortBy } from 'lodash';

// const dummyData = require('../SampleData/dummyData.json');
export const GlobalContext = createContext();

function ContextProvider(props) {
	const [searchQuery, setSearchQuery] = useState('');
	const [dataStore, setDataStore] = useState({});
	const [tableData, setTableData] = useState([]);
	const [topData, setTopData] = useState([]);
	const [totalCount, setTotalCount] = useState({});
	const [historicalData, setHistoricalData] = useState('');
	const [locationSelected, setLocationSelected] = useState('India');
	const [backButton, setBackButton] = useState(false);

	useEffect(() => {
		getStateWiseData();
		console.log('Context API CALLED');
	}, []);

	// District Data
	async function getStateWiseData() {
		// const districtWiseData = await fetchApiData(
		//   "https://api.covid19india.org/state_district_wise.json"
		// );

		// const covidData = await fetchApiData(
		//   "https://api.covid19india.org/data.json"
		// );

		const covidData = await fetchApiData(
			'https://api.covid19india.org/data.json'
			// 'https://data.covid19india.org/v4/min/data.min.json'
			// 'https://data.covid19india.org/v4/min/timeseries.min.json'
		);
		// || dummyData;

		console.log(covidData.tested);

		// let testedHistoricalDataTemp = {};

		function parseDate(dateString) {
			// console.log(date);
			const date = new Date(
				parseInt(dateString.split('/')[2]),
				parseInt(dateString.split('/')[1] - 1),
				parseInt(dateString.split('/')[0])
			);

			const longMonth = date.toLocaleString('default', { month: 'long' });
			// console.log(longMonth);

			const longDateFormat =
				date.getDate() + ' ' + longMonth + ' ' + date.getFullYear();
			return longDateFormat;
		}

		const testedHistoricalDataTemp = await covidData.tested.map(item => ({
			...item,
			date: parseDate(item.testedasof)
		}));

		setHistoricalData([
			covidData.cases_time_series,
			// covidData.tested.slice(-30),
			testedHistoricalDataTemp
		]);

		console.log(testedHistoricalDataTemp);
		const totalCountTemp = {
			active: parseInt(covidData.statewise[0].active),
			recovered: parseInt(covidData.statewise[0].recovered),
			deaths: parseInt(covidData.statewise[0].deaths)
		};
		setTotalCount({
			...totalCountTemp
		});

		// function accumulator(state, obj) {
		//   const total = Object.keys(state.districtData).map(
		//     (item) => state.districtData[item][obj]
		//   );

		//   const sum = total.reduce(
		//     (accumulator, currentValue) => accumulator + currentValue
		//   );

		//   return sum;
		// }

		// Object.keys(districtWiseData).forEach((key) => {
		//   tableDataTemp.push({
		//     stateName: key,
		//     active: accumulator(districtWiseData[key], "active"),
		//     confirmed: accumulator(districtWiseData[key], "confirmed"),
		//     recovered: accumulator(districtWiseData[key], "recovered"),
		//     deceased: accumulator(districtWiseData[key], "deceased"),
		//     migratedother: accumulator(districtWiseData[key], "migratedother"),
		//     stateCode: districtWiseData[key].statecode,
		//   });
		// });

		// To remove Total from table
		const filteredStateWiseData = covidData.statewise.filter(
			i => i.state !== 'Total'
		);

		const tableDataTemp = [];
		Object.keys(filteredStateWiseData).forEach(key =>
			tableDataTemp.push({
				state: filteredStateWiseData[key].state,
				statecode: filteredStateWiseData[key].statecode,
				confirmed: parseInt(filteredStateWiseData[key].confirmed),
				active: parseInt(filteredStateWiseData[key].active),
				recovered: parseInt(filteredStateWiseData[key].recovered),
				deaths: parseInt(filteredStateWiseData[key].deaths),
				migratedother: parseInt(filteredStateWiseData[key].migratedother)
			})
		);

		// console.log(covidData.statewise[1].state);
		setTableData(tableDataTemp);

		// setTotalCount({
		//   active: adder(tableDataTemp, "active"),
		//   recovered: adder(tableDataTemp, "recovered"),
		//   deceased: adder(tableDataTemp, "deceased")
		// });

		// Sorting in descending order
		const active = sortBy(tableDataTemp, o => o.active).reverse();
		const recovered = sortBy(tableDataTemp, o => o.recovered).reverse();
		const deaths = sortBy(tableDataTemp, o => o.deaths).reverse();

		const topDataTemp = {};
		topDataTemp.active = active.slice(0, NUMBER_OF_TOP_ITEMS);
		topDataTemp.recovered = recovered.slice(0, NUMBER_OF_TOP_ITEMS);
		topDataTemp.deaths = deaths.slice(0, NUMBER_OF_TOP_ITEMS);

		//Storing data for goBack function
		setDataStore({
			tableData: tableDataTemp,
			topData: topDataTemp,
			totalCount: totalCountTemp
		});

		setTopData(topDataTemp);
		// console.log(topDataTemp);
	}

	// When a state is selected on table
	function displaySelectedStateData(value) {
		setSearchQuery(value.state);

		setLocationSelected(value.state);

		// Enabling back button to go back to country data
		setBackButton(true);

		setTopData({
			active: [{ ...value }],
			recovered: [{ ...value }],
			deaths: [{ ...value }]
		});

		// Set total data to state data
		setTotalCount({
			active: value.active,
			recovered: value.recovered,
			deaths: value.deaths
		});
	}

	function goBack() {
		// Enabling back button to go back to country data
		setBackButton(false);

		// setTableData(dataStore.tableData);
		// Reseting TopData and Total Counts for pieChart
		setTopData(dataStore.topData);
		setTotalCount(dataStore.totalCount);
		// Reseting Location head
		setLocationSelected('India');
		// Reseting search to show entire table
		setSearchQuery('');
	}

	return (
		<GlobalContext.Provider
			value={{
				searchQuery,
				setSearchQuery,
				goBack,
				tableData,
				topData,
				totalCount,
				displaySelectedStateData,
				historicalData,
				locationSelected,
				backButton
				// setBackButton,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
}

export default ContextProvider;
