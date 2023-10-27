import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_CARS, REMOVE_CAR } from '../../graphql/queries'
import { filter } from 'lodash'

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS })


      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, c => {
            return c.id !== removeCar.id
          })
        }
      })
    }
  })

  const buttonClickHandler = () => {
    let result = window.confirm('Are you sure you want to delete this Car?')

    if (result) {
      removeCar({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={buttonClickHandler} style={{ color: 'red' }} />
}

export default RemoveCar
