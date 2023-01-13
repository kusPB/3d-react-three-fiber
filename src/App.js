import * as THREE from 'three'
import React, { Suspense } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader'

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader())

function Model(props) {
  const materials = useLoader(MTLLoader, '/male02_dds.mtl')
  const obj = useLoader(OBJLoader, '/male02.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  return <primitive object={obj} {...props} />
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 50, 180] }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[100, 100, 50]} />
      <Suspense fallback={null}>
        <Model position={[0, -90, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
