import MaintenanceRequests from '../../components/maintenance-request/MaintenanceRequests'

const MAINTENANCE_REQUESTS = [
  {
    id: 1,
    description:
      'Se necesita solicitud de mantenimiento de la máquina ABLANDOR porque tiene problemas con con su motor...',
    createdAt: '2023-05-05',
    machine: { name: 'ABLANDADOR' },
  },
  {
    id: 2,
    description: 'La máquina ACUMULADOR DE VAPOR requiere mantenimiento',
    createdAt: '2023-05-03',
    machine: { name: 'ACUMULADOR DE VAPOR' },
  },
  {
    id: 3,
    description:
      'La máquina BISELADORA #1 - 50 CM requiere mantenimiento urgente porque uno de sus motores necesita aceite...',
    createdAt: '2023-04-28',
    machine: { name: 'BISELADORA #1 - 50 CM' },
  },
  {
    id: 4,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-28',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 5,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-26',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 6,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-14',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 7,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-10',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 8,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-10',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 9,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-08',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 10,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-06',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 11,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-04',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
]

export default function MaintenanceRequestPage({ allMaintenanceRequests }) {
  return <MaintenanceRequests allMaintenanceRequests={allMaintenanceRequests} />
}

export async function getServerSideProps() {
  return { props: { allMaintenanceRequests: MAINTENANCE_REQUESTS } }
}
