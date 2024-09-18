import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const date = new Date(workout.createdAt).toDateString()

  const handleDelete = async () => {
    if (!user) {
      return
    }
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (lbs):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>{date}</p>
      <span className='material-symbols-outlined' onClick={handleDelete}>
        delete
      </span>
    </div>
  )
}

export default WorkoutDetails
