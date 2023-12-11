import { Competencias } from "@/pages/Gestion/Competencias"
import { Objetivos } from "@/pages/Gestion/Objetivos"
import { Usuarios } from "@/pages/Gestion/Usuarios"
import { Segmented } from "antd"
import { SegmentedValue } from "antd/es/segmented"
import { useState } from "react"



export const Gestion = () => {


	const [ activeTab, setActiveTab ] = useState<SegmentedValue>('competencias')

	const options = [
		{
			value: 'periodos',
			label: 'Periodos'
		},
		{
			value: 'objetivos',
			label: 'Objetivos'
		},
		{
			value: 'competencias',
			label: 'Competencias'
		},
	]



	return (
		

		<>
			<Segmented
				options={options}
				value={activeTab}
				onChange={setActiveTab}
			/>

			<>
			
			{
				activeTab === 'objetivos' && ( <Usuarios /> )
			}
			{
				activeTab === 'periodos' && ( <Objetivos /> ) 
			}
			{
				activeTab === 'competencias' && ( <Competencias /> )
			}
			</>
		</>

	)
}
