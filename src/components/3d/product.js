import React from 'react';
import Model from './model';
import { OrbitControls } from '@react-three/drei';
import CanvasContainer from './canvas-container';

/**
 * A trainers modal
 */
const Product = () => {
  return (
    
    <CanvasContainer height={530} width={600} position={[25, 30, 20]} fov={95}>
      <Model
        scenePath="shoes/scene.gltf"
        position={[15,22, 10]}
        rotation={[0, 0.005, 0]}
        // scale= {[200,10,0]}
        
      />
      <OrbitControls />
    </CanvasContainer>
  );
};

export default Product;
