import { Link } from 'react-router'

export default class Other extends React.Component {
  render() {
    return (
      <div>
        <span>
          Other
        </span>

        <Link to='/'>Home</Link>
      </div>
    )
  }
}
