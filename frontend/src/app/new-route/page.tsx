export async function searchDirections(source: string, destination: string) {
  const [sourceResponse, destinationResponse] = await Promise.all([
    fetch(`http://localhost:3333/api/places?text=${source}`, {
      // cache: "force-cache", //default
      // next: {
      //   revalidate: 1 * 60 * 60 * 24, // 1 dia
      // }
    }),
    fetch(`http://localhost:3333/api/places?text=${destination}`, {
      // cache: "force-cache", //default
      // next: {
      //   revalidate: 1 * 60 * 60 * 24, // 1 dia
      // }
    }),
  ])

  if (!sourceResponse.ok) {
    console.error(await sourceResponse.text())
    throw new Error('Failed to fetch source data')
  }

  if (!destinationResponse.ok) {
    console.error(await destinationResponse.text())
    throw new Error('Failed to fetch destination data')
  }

  const [sourceData, destinationData] = await Promise.all([
    sourceResponse.json(),
    destinationResponse.json(),
  ])

  const placeSourceId = sourceData.candidates[0].place_id
  const placeDestinationId = destinationData.candidates[0].place_id

  const directionsResponse = await fetch(
    `http://localhost:3333/api/directions?originId=${placeSourceId}&destinationId=${placeDestinationId}`,
    {
      // cache: "force-cache", //default
      // next: {
      //   revalidate: 1 * 60 * 60 * 24, // 1 dia
      // },
    }
  )

  if (!directionsResponse.ok) {
    console.error(await directionsResponse.text())
    throw new Error('Failed to fetch directions')
  }

  const directionsData = await directionsResponse.json()

  return {
    directionsData,
    placeSourceId,
    placeDestinationId,
  }
}

export async function NewRoutePage({
  searchParams,
}: {
  searchParams: Promise<{ source: string; destination: string }>
}) {
  const { source, destination } = await searchParams

  const result =
    source && destination ? await searchDirections(source, destination) : null
  let directionsData = null
  let placeSourceId = null
  let placeDestinationId = null

  if (result) {
    directionsData = result.directionsData
    placeSourceId = result.placeSourceId
    placeDestinationId = result.placeDestinationId
  }

  return (
    <div className="flex h-full w-full flex-1">
      <div className="h-full w-1/3 p-4">
        <h4 className="text-contrast mb-2 text-3xl">Nova rota</h4>
        <form className="flex flex-col space-y-4" method="get">
          <div className="relative">
            <input
              id="source"
              name="source"
              type="search"
              placeholder=""
              defaultValue={source}
              className="text-contrast border-contrast focus:border-primary peer block w-full appearance-none rounded-t-lg border-0 border-b-2 bg-default px-2.5 pb-2.5 pt-5 text-sm focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="source"
              className="text-contrast peer-focus:text-secondary absolute start-2.5 top-3 z-10 origin-[0] -translate-y-4 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Origem
            </label>
          </div>
          <div className="relative">
            <input
              id="destination"
              name="destination"
              type="search"
              placeholder=""
              defaultValue={destination}
              className="text-contrast border-contrast focus:border-primary peer block w-full appearance-none rounded-t-lg border-0 border-b-2 bg-default px-2.5 pb-2.5 pt-5 text-sm focus:outline-none focus:ring-0"
            />
            <label
              htmlFor="destination"
              className="text-contrast peer-focus:text-secondary absolute start-2.5 top-3 z-10 origin-[0] -translate-y-4 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Destino
            </label>
          </div>
          <button
            type="submit"
            className="bg-main text-primary rounded p-2 text-xl font-bold"
          >
            Pesquisar
          </button>
        </form>
        {directionsData && (
          <div className="text-contrast mt-4 rounded border p-4">
            <ul>
              <li className="mb-2">
                <strong>Origem:</strong>{' '}
                {directionsData.routes[0].legs[0].start_address}
              </li>
              <li className="mb-2">
                <strong>Destino:</strong>{' '}
                {directionsData.routes[0].legs[0].end_address}
              </li>
              <li className="mb-2">
                <strong>Distância:</strong>{' '}
                {directionsData.routes[0].legs[0].distance.text}
              </li>
              <li className="mb-2">
                <strong>Duração:</strong>{' '}
                {directionsData.routes[0].legs[0].duration.text}
              </li>
            </ul>
            <h1>Helloo</h1>
            {/* <NewRouteForm>
              {placeSourceId && (
                <input
                  type="hidden"
                  name="sourceId"
                  defaultValue={placeSourceId}
                />
              )}
              {placeDestinationId && (
                <input
                  type="hidden"
                  name="destinationId"
                  defaultValue={placeDestinationId}
                />
              )}
              <button
                type="submit"
                className="bg-main text-primary mt-4 rounded p-2 font-bold"
              >
                Adicionar rota
              </button>
            </NewRouteForm> */}
          </div>
        )}
      </div>
      <h1>Map</h1>
    </div>
  )
}

export default NewRoutePage
