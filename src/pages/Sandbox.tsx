import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from '../components/Button'


export default function Sandbox() {
  const [count, setCount] = useState(0)

  function handleIncrease() {
    setCount(count + 1)
  }

  function handleDecrease() {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <Container className="mt-5">
      <div className="text-center">
        <h1 className="mb-4">Counter</h1>
        <div className="mb-4">
          <h2 className="display-4">{count}</h2>
        </div>
        <div className="d-flex gap-3 justify-content-center">
          <Button className="btn-primary"
                  onClick={handleIncrease}>Increase</Button>
          <Button className="btn-danger"
                  onClick={handleDecrease}
                  disabled={count === 0}>Decrease</Button>
        </div>
      </div>
    </Container>
  )
}