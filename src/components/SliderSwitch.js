import React, {useState} from 'react'

const styles = {
    switch: {marginTop: '.5rem', marginLeft: '23%', marginRight: 'auto'}
}

const SliderSwitch = ({onChange}) => {
    const [state, setState] = useState('ASC')
    return (
        <label className='switch' style={styles.switch}>
            <input type='checkbox' onChange={() => {
                onChange()
                setState(state === 'ASC' ? 'DESC' : 'ASC')
            }}/>
            <span className='slider round'/>
        </label>
    )
}

export default SliderSwitch
