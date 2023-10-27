import { useQuery } from '@apollo/client'
import { GET_CARS, GET_PEOPLE, PERSON_WITH_CARS } from '../../graphql/queries'
import { EditOutlined } from '@ant-design/icons'
import { List, Card } from 'antd'
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react'
import UpdatePerson from '../forms/UpdatePerson'
import CarCard from '../listItems/CarCard'
import RemovePerson from '../buttons/RemovePerson'

const LearnMore = () => {

    const { personId } = useParams();

    const styles = getStyles()
    const [editMode, setEditMode] = useState(false)

    useQuery(GET_PEOPLE);
    useQuery(GET_CARS);

    const { loading, error, data } = useQuery(PERSON_WITH_CARS, {
    variables: { personId },
    })

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const id = data.personWithCars.person.id;
    const firstName = data.personWithCars.person.firstName;
    const lastName = data.personWithCars.person.lastName;

    const handleButtonClick = () => {
    setEditMode(!editMode)
    }

    return (
    <div>
        <Link to={`/`}>Go Back</Link>
        {editMode ? (
        <UpdatePerson
            id={id}
            firstName={firstName}
            lastName={lastName}
            onButtonClick={handleButtonClick}
        />
        ) : (
        <Card
            style={styles.card}
            actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson id={id} />
            ]}
        >
            {firstName} {lastName}
            <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.personWithCars.cars.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
            <CarCard id={id} year={year} make={make} model={model} price={price} personId={personId} />
        </List.Item>
        ))}
    </List>
        </Card>
        )}
    </div>
    )
}

const getStyles = () => ({
    list: {
      display: 'flex',
      justifyContent: 'center'
    }
})

export default LearnMore