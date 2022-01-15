import { Spinner as GrommetSpinner } from 'grommet'

export function Spinner() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}
    >
      <GrommetSpinner size='xlarge' />
    </div>
  )
}
