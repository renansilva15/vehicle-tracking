'use client'

import { useEffect, useRef } from 'react'
import { useMap } from '../../hooks/useMap'
import { socket } from '../../utils/socket-io'

export type MapDriverProps = {
  routeId: string | null
  startLocation: {
    lat: number
    lng: number
  } | null
  endLocation: {
    lat: number
    lng: number
  } | null
}

export function MapDriver(props: MapDriverProps) {
  const { routeId, startLocation, endLocation } = props
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  useEffect(
    function listenToDriverRoutePoints() {
      if (!map || !routeId || !startLocation || !endLocation) {
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      socket.disconnected ? socket.connect() : socket.offAny()

      socket.on('connect', () => {
        console.log('connected')
        socket.emit(`client:new-points`, { routeId })
      })

      socket.on(
        `server:new-points/${routeId}:list`,
        (data: { routeId: string; lat: number; lng: number }) => {
          if (!map.hasRoute(data.routeId)) {
            map.addRouteWithIcons({
              routeId: data.routeId,
              startMarkerOptions: {
                position: startLocation,
              },
              endMarkerOptions: {
                position: endLocation,
              },
              carMarkerOptions: {
                position: startLocation,
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
    [routeId, startLocation, endLocation, map]
  )

  return <div className="h-full w-2/3" ref={mapContainerRef} />
}
