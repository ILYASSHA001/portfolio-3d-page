const Placeholder = ( props ) => {

  return (
    <mesh { ...props }> 
        <boxGeometry args={ [ 1, 1, 1, 2, 2, 2 ] } />
        <meshBasicMaterial wireframe color={ '#ff0000' } />
    </mesh> 
  )

}

export default Placeholder