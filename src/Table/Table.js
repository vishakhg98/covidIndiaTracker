import { sortBy } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../ContextProvider/ContextProvider';
import NumberIncrementor from '../general/NumberIncrementor';
// import { NUMBER_OF_TOP_ITEMS } from "../utils/Constants";
import './Css/Table.css';

function Table(props) {
	const getStateWiseData = useContext(GlobalContext).getStateWiseData;
	const displaySelectedStateData =
		useContext(GlobalContext).displaySelectedStateData;
	const tableData = useContext(GlobalContext).tableData;
	const topData = useContext(GlobalContext).topData;

	const searchValue = useContext(GlobalContext).searchQuery;

	const [table, setTable] = useState([]);
	const [sortColumn, setSortColumn] = useState('');
	const [ascending, setAscending] = useState({
		stateName: true,
		confirmed: true,
		recovered: true,
		deaths: true,
		migratedother: true
	});

	useEffect(() => {
		setTable(tableData);
	}, [tableData]);

	function handleSort(column) {
		if (ascending[column]) {
			setTable(sortBy(table, o => parseInt(o[column])));
		} else {
			setTable(sortBy(table, o => parseInt(o[column])).reverse());
		}

		setAscending({ ...ascending, [column]: !ascending[column] });
		setSortColumn(column);
	}

	let filteredData = table;
	if (searchValue) {
		filteredData = table.filter(i =>
			i.state.toLowerCase().includes(searchValue.toLowerCase())
		);
	}

	return (
		<div className="tableBase">
			<div className="tableHead heading">
				<h4>Live Reports</h4>

				<span className="refreshButton" onClick={() => getStateWiseData()}>
					&#x21bb;
				</span>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th className="col1" onClick={() => handleSort('state')}>
							State/ UT
							<span
								className="sortArrow"
								style={{ visibility: sortColumn !== 'state' && 'hidden' }}
							>
								{ascending.state ? '▲' : '▼'}
							</span>
						</th>
						<th className="col2" onClick={() => handleSort('active')}>
							Active
							<span
								className="sortArrow"
								style={{ visibility: sortColumn !== 'active' && 'hidden' }}
							>
								{ascending.active ? '▲' : '▼'}
							</span>
						</th>
						<th className="col3" onClick={() => handleSort('confirmed')}>
							Confirmed Cases
							<span
								className="sortArrow"
								style={{ visibility: sortColumn !== 'confirmed' && 'hidden' }}
							>
								{ascending.confirmed ? '▲' : '▼'}
							</span>
						</th>
						<th className="col4" onClick={() => handleSort('recovered')}>
							Recovered
							<span
								className="sortArrow"
								style={{ visibility: sortColumn !== 'recovered' && 'hidden' }}
							>
								{ascending.recovered ? '▲' : '▼'}
							</span>
						</th>
						<th className="col5" onClick={() => handleSort('deaths')}>
							Deceased
							<span
								className="sortArrow"
								style={{ visibility: sortColumn !== 'deaths' && 'hidden' }}
							>
								{ascending.deaths ? '▲' : '▼'}
							</span>
						</th>
						<th className="col6" onClick={() => handleSort('migratedother')}>
							MigratedOther
							<span
								className="sortArrow"
								style={{
									visibility: sortColumn !== 'migratedother' && 'hidden'
								}}
							>
								{ascending.migratedother ? '▲' : '▼'}
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.map((state, index) => (
						<tr
							data-activetop3={
								topData.active &&
								topData.active.length > 1 &&
								topData.active.some(i => i.state.includes(state.state))
									? 'true'
									: 'false'
							}
							className="borderBottom"
							key={index}
							onClick={() => {
								displaySelectedStateData(state);
							}}
						>
							<td className="state">{state.state}</td>
							<td>
								{/* {state.active} */}
								<NumberIncrementor number={state.active} />
							</td>
							<td>
								{/* {state.confirmed} */}
								<NumberIncrementor number={state.confirmed} />
							</td>
							<td>
								{/* {state.recovered} */}
								<NumberIncrementor number={state.recovered} />
							</td>
							<td>
								{/* {state.deaths} */}
								<NumberIncrementor number={state.deaths} />
							</td>
							<td>
								{/* {state.migratedother} */}
								<NumberIncrementor number={state.migratedother} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
