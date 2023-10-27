import { useQuery } from '@apollo/client'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdatePerson from '../forms/UpdatePerson'
import { Link } from 'react-router-dom'
import { GET_CARS } from '../../graphql/queries'
import { List } from 'antd'
import CarCard from '../listItems/CarCard'

const PersonCard = props => {
  const [editMode, setEditMode] = useState(false)
  const { id, firstName, lastName } = props
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_CARS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const personCars = data.cars.filter(car=> car.personId === id);

  const buttonClickHandler = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={buttonClickHandler}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={buttonClickHandler} />,
            <RemovePerson id={id} />
          ]}
        >
          {firstName} {lastName}
          <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {personCars.map(({ id, year, make, model, price, personId }) => (
              <List.Item key={id}>
                <CarCard id={id} year={year} make={make} model={model} price={price} personId={personId} />
              </List.Item>
            ))}
          </List>

          <Link to={`/people/${id}`}>Learn More</Link>
          
        </Card>
      )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '100%'
  }
})

export default PersonCard
