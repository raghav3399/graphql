const Title = () => {
    const styles = getStyles()

  return (
        <div>
            <h1 style={styles.title}>PEOPLE AND THEIR CARS </h1> 
            <hr style={styles.line}/>
        </div>
    )

}

const getStyles = () => ({
    title: {
        fontSize: 15,
        padding: '15px',
        marginBottom: '10px',
        textAlign: 'center'
    },
    line: {
        opacity: 0.2
    }
})

export default Title