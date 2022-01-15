import { Environment, Network, RecordSource, RequestParameters, Store, Variables } from 'relay-runtime'

async function fetchGraphQL(params: RequestParameters, variables?: Variables) {
  const response = await fetch('http://localhost:8080/graphql', {
    method: 'POST',
    body: JSON.stringify({ query: params.text, variables }),
    headers: { 'Content-Type': 'application/json' },
  });

  return await response.json();
}

export const RelayEnv = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource())
})
