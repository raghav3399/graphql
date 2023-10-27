import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../graphql/queries'
import { List } from 'antd'
import PersonCard from '../listItems/PersonCard'

const People = () => {
  const styles = getStyles()
  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div>
    <h3 style={styles.h3}>
      <span style={styles.h3Text}>Records</span>
      <span style={{ ...styles.horizontalLine, ...styles.leftLine }}></span>
      <span style={{ ...styles.horizontalLine, ...styles.rightLine }}></span>
    </h3>
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <PersonCard id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
    </div>
  )
}

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  },
  h3: {
    textAlign: 'center',
    position: 'relative',
  },
  h3Text: {
    position: 'relative',
    zIndex: 1,
  },
  horizontalLine: {
    content: '',
    position: 'absolute',
    top: '50%',
    height: '1px',
    backgroundColor: '#000',
    opacity: 0.1,
    width: '55%',
    zIndex: 0,
  },
  leftLine: {
    left: 0,
    transform: 'translateX(-30%)',
  },
  rightLine: {
    right: 0,
    transform: 'translateX(30%)',
  },
})

export default People
