'use client'

import { useEffect, useRef } from 'react'
import { useMap } from '../../hooks/useMap'
import { socket } from '@/utils/socket-io'
import { BACKEND_API_URL } from '@/constants/env'

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  useEffect(
    function listenToDriverRoutes() {
      if (!map) {
        return
      }

      socket.connect()

      socket.on(
        `server:new-points:list`,
        async (data: { routeId: string; lat: number; lng: number }) => {
          if (!map.hasRoute(data.routeId)) {
            const response = await fetch(
              `${BACKEND_API_URL}/routes/${data.routeId}`
            )

            const route = await response.json()

            map.addRouteWithIcons({
              routeId: data.routeId,
              startMarkerOptions: {
                position: route.directions.routes[0].legs[0].start_location,
              },

              endMarkerOptions: {
                position: route.directions.routes[0].legs[0].end_location,
              },

              carMarkerOptions: {
                position: route.directions.routes[0].legs[0].start_location,
              },
            })
          }

          map.moveCar(data.routeId, { lat: data.lat, lng: data.lng })
        }
      )

      return () => {
        socket.disconnect()
      }
    },
    [map]
  )

  return <div className="h-full w-full" ref={mapContainerRef} />
}

export default AdminPage
