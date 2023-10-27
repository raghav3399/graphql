import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE, REMOVE_PERSON , REMOVE_CAR_BY_PERSON, GET_CARS} from '../../graphql/queries'
import { filter } from 'lodash'

const RemovePerson = ({ id }) => {

  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE })

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, p => {
            return p.id !== removePerson.id
          })
        }
      })
    }
  })

  const clickButton = () => {
    let result = window.confirm('Are you sure you want to delete this Person?')

    if (result) {
      removePerson({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={clickButton} style={{ color: 'red' }} />
}

export default RemovePerson
