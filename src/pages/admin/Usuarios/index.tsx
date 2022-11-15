import { Table } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { Avatar, Badge, Box, Button } from "../../../components/ui"

export const Usuarios = () => {
    const navigate = useNavigate()

    const dataSource = [
          {
            id: 4,
            name: 'Abraham',
            lastName: 'Alvarado',
            secondLastName: 'Guevara',
            nick_name: null,
            email: 'abrahamalvarado@devarana.mx',
            short_name: null,
            password: 'Devarana#1234*',
            active: 0,
            birth_date: '1990-01-01',
            admission_date: null,
            phone: '1234567890',
            profile_description: null,
            google_id: '108153392098700518345',
            slug: 'abraham_alvarado_12345',
            social_facebook: null,
            social_linkedin: '213123',
            social_twitter: null,
            social_instagram: null,
            street: 'Centro #1',
            suburb: 'Centro',
            bachelor_degree: 'asfsdfsadf',
            birth_place: 'Toluca',
            picture: '',
            rol_id: 4,
            position_id: 1,
            department_id: 2,
            town_id: 1810,
            createdAt: '2022-06-23T15:17:49.000Z',
            updatedAt: '2022-07-14T14:25:40.000Z',
            deletedAt: null,
            position: {
              id: 1,
              nombre: 'Desarrollador Web',
              descripcion: 'Test',
              slug: 'desarrollador-web',
              estatus_id: 1,
              createdAt: '2022-06-22T16:16:13.000Z',
              updatedAt: '2022-06-22T16:16:13.000Z',
              deletedAt: null
            }
          },
          {
            id: 5,
            name: 'Fátima',
            lastName: 'Benitez',
            secondLastName: 'Ortiz',
            nick_name: null,
            email: 'fatimaortiz@devarana.mx',
            short_name: 'FBO',
            password: 'Devarana#1234*',
            active: 0,
            birth_date: '1990-01-02',
            admission_date: '2022-07-01',
            phone: '1234567890',
            profile_description: null,
            google_id: '105294255793409066896',
            slug: 'fatima_benitez_dvejn',
            social_facebook: null,
            social_linkedin: null,
            social_twitter: null,
            social_instagram: null,
            street: 'Centro #1',
            suburb: 'Centro',
            bachelor_degree: 'Ing.',
            birth_place: 'Veracrú',
            picture: 'https://lh3.googleusercontent.com/a-/AFdZucr1v6nn_ZtJrbpn_61w1bX76FUAvT6RhIOp4V64fsPP9sObJmbkxKLMoNmJSvmk8BKww85kB8zrPJmy_NhxBQTTAWdZ0SBw_p9XZqFV9GyBO-04rCXz0hnehpQYA3aFj6DrtyOJ8whCxMPBrkHhS1zytbnvrCEUkv1Glei7CwI-oqGKAZKfLlQ8PE8TybVU-z9YdJp0jZrVr75A5k5EdxrQMFZF7MtubpOdZ-bNn2wVV3TkA7Pn0yI-qYwEBDpREigHntMCxptuZsgjYAVYyLpiHF81iDzQaLkvc8ERXKz7zX25Q3DMd7Nr2VtiFKpTCz9P6eeSPyCr0ZY-QW2x4YmVwYibsVFPpBiGhAK9pF3HrtrLWAUrUHGYmMibbNjYnVSGKVW93vYjrW5yxhoMnmxOMXfN-BQhajK0uwotUuZW5enLxHo3zygLELbvjZXkhbdFB3sSzy163xKmUUXMSXr8lEKEQYX6SOSovta6QdcvvVw0clwBnOXRMVArhlTVhqMygs4DHC6_xusWM5UXOEixJyj4kzz_ULco-n92AHQniHVvrLaWIK75wd3neWZiC5ibOmZeHF5BkXaRW2fQNGyWpXQgTs8lcLX66cY0db53McX_v_YtwnkL6OUeuKIMb5p9YjZGJVZv-nnkIfRvyfdDC9NOEFq4BzCVkOAl04bF1e0MP3nxSRZlwxgqHCTxulT7zCC4bcY0P3Q8SjHzHtACCXbzBx_NpU7qHRKyiq-4pXxFxo6EDofKXLI56KnaoxXE5J0g4Q=s96-c',
            rol_id: 3,
            position_id: 3,
            department_id: 2,
            town_id: 1810,
            createdAt: '2022-07-01T20:01:17.000Z',
            updatedAt: '2022-07-13T14:40:03.000Z',
            deletedAt: null,
            position: {
              id: 3,
              nombre: 'Gerente de Innovación y Calidad',
              descripcion: 'Test Especial',
              slug: 'gerente-de-innovacion-y-calidad',
              estatus_id: 1,
              createdAt: '2022-06-27T14:34:23.000Z',
              updatedAt: '2022-06-27T14:34:23.000Z',
              deletedAt: null
            }
          }
    ]
    const columns = [
        {
          title: 'Foto',
          render: (data:any) => <Avatar picture={data.picture} > {data.short_name} </Avatar>
          
        },
        {
            title: 'Nombre',
            render: (data:any) => data.name + ' ' + data.lastName + ' ' + data.secondLastName
          },
          {
            title: 'Puesto',
            render: (data:any) => data.position.nombre
          },
          {
            title: 'Email',
            render: (data:any) => data.email
          },

        {
          title: 'Acciones',
        },
    ];


  return (
    <>
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 sm:col-span-1 grid grid-cols-2 gap-5">
                    <div className="col-span-2 sm:col-span-1">
                        <Box>
                          <Link to="/admin/areas"><Badge fontSize="text-base" badgeSize="w-20 h-20" badgeType="primary">Áreas</Badge></Link>
                        </Box>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Link to="/admin/departamentos">
							<Box>
								<Badge fontSize="text-base" badgeSize="w-20 h-20" badgeType="secondary">Dptos</Badge>
							</Box>
						</Link>
						<div></div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Box>
                            <Link to="/admin/puestos"><Badge fontSize="text-base" badgeSize="w-20 h-20" badgeType="pink">Puestos</Badge></Link>
                        </Box>
                    </div>
                    <div className="col-span-2 sm:col-span-1 ">
                        <Box className="flex justify-between flex-wrap gap-5">
                            <Link to="/admin/empleados"><Badge fontSize="text-base" badgeSize="w-20 h-20" badgeType="orange">Empleados</Badge></Link>
                        </Box>
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1 row-span-2">
                    <div className="h-full"></div>
                </div>

                <div className="col-span-2">
                    <Box className="overflow-auto">
                        <div className="flex my-2">
                            <Button className="ml-auto" btnType="secondary" fn={ () => navigate("/usuarios/registrar") }>
                               Nuevo Colaborador 
                            </Button>
                            
                        </div>
                        {
                            dataSource && dataSource.length > 0 ?
                                <Table 
                                    columns={columns}
                                    dataSource={dataSource}
                                    rowKey={record => record.id}
                                />
                            : ""
                        }
                    </Box>
                </div>
            </div>
        </>
  )
}
