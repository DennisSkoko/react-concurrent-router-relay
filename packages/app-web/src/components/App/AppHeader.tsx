import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Anchor, Box } from 'grommet'

const Nav = styled.nav({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center'
})

export type AppHeaderProps = {
  links: { href: string, label: string }[]
}

export function AppHeader({ links }: AppHeaderProps) {
  return (
    <Box pad={{ left: 'large', top: 'large', right: 'large' }}>
      <Nav>
        {links.map(link => (
          <Anchor
            key={link.href}
            as={props => <NavLink {...props} to={link.href} />}
          >
            {link.label}
          </Anchor>
        ))}
      </Nav>
    </Box>
  )
}
