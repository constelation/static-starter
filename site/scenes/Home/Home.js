import { Link } from 'react-router'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <span>
          Home
        </span>

        <Link to='other'>Other</Link>
      </div>
    )
  }
}
