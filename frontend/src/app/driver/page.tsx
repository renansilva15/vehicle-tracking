import { BACKEND_API_URL } from '@/constants/env'
import { RouteModel } from '../../utils/models'
import { MapDriver } from './MapDriver'

async function getRoutes() {
  const response = await fetch(`${BACKEND_API_URL}/routes`, {
    cache: 'force-cache',
    next: {
      tags: ['routes'],
    },
  })
  return response.json()
}

async function getRoute(routeId: string) {
  const response = await fetch(`${BACKEND_API_URL}/routes/${routeId}`, {
    cache: 'force-cache',
    next: {
      tags: [`routes-${routeId}`, 'routes'],
    },
  })

  return response.json()
}

export async function DriverPage({
  searchParams,
}: {
  searchParams: Promise<{ routeId: string }>
}) {
  const routes = await getRoutes()

  const { routeId } = await searchParams

  let startLocation = null
  let endLocation = null

  if (routeId) {
    const route = await getRoute(routeId)

    const leg = route.directions.routes[0].legs[0]

    startLocation = {
      lat: leg.start_location.lat,
      lng: leg.start_location.lng,
    }

    endLocation = {
      lat: leg.end_location.lat,
      lng: leg.end_location.lng,
    }
  }

  return (
    <div className="flex h-full w-full flex-1">
      <div className="h-full w-1/3 p-2">
        <h4 className="mb-2 text-3xl text-contrast">Inicie uma rota</h4>
        <div className="flex flex-col">
          <form className="flex flex-col space-y-4" method="get">
            <select
              name="routeId"
              className="mb-2 rounded border bg-default p-2 text-contrast"
            >
              {routes.map((route: RouteModel) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
            <button
              className="rounded bg-main p-2 text-xl font-bold text-primary"
              style={{ width: '100%' }}
            >
              Iniciar a viagem
            </button>
          </form>
        </div>
      </div>
      <MapDriver
        routeId={routeId}
        startLocation={startLocation}
        endLocation={endLocation}
      />
    </div>
  )
}

export default DriverPage
