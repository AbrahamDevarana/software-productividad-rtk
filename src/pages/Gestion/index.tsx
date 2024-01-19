import { Competencias } from "@/pages/Gestion/Competencias"
import { Periodos } from "@/pages/Gestion/Periodos"
import { Objetivos } from "@/pages/Gestion/Objetivos"
import { Segmented } from "antd"
import { SegmentedValue } from "antd/es/segmented"
import { useState } from "react"



export const Gestion = () => {


	const [ activeTab, setActiveTab ] = useState<SegmentedValue>('objetivos')

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

			<div className="py-5">
			
				{
					activeTab === 'objetivos' && ( <Objetivos /> )
				}
				{
					activeTab === 'periodos' && ( <Periodos /> ) 
				}
				{
					activeTab === 'competencias' && ( <Competencias /> )
				}
			</div>
		</>

	)
}
