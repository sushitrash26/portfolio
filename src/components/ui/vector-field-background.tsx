'use client'
import React, { useEffect, useRef } from 'react'

interface Mesh {
  vertices: [number, number, number][]
  edges: [number, number][]
}

// Generate the 10 3D wireframe meshes
const generateMeshes = (): Mesh[] => {
  const list: Mesh[] = []

  // 0. 3D Cube (TypeScript / Container)
  list.push({
    vertices: [
      [-5, -5, -5], [5, -5, -5], [5, 5, -5], [-5, 5, -5],
      [-5, -5, 5],  [5, -5, 5],  [5, 5, 5],  [-5, 5, 5]
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0], // front
      [4, 5], [5, 6], [6, 7], [7, 4], // back
      [0, 4], [1, 5], [2, 6], [3, 7]  // links
    ]
  })

  // 1. 3D Gyroscope (React)
  const gyroVertices: [number, number, number][] = []
  const gyroEdges: [number, number][] = []
  const rings = 3
  const pointsPerRing = 8
  const radius = 6

  for (let r = 0; r < rings; r++) {
    const startIdx = gyroVertices.length
    for (let p = 0; p < pointsPerRing; p++) {
      const theta = (p * Math.PI * 2) / pointsPerRing
      const x = Math.cos(theta) * radius
      const y = Math.sin(theta) * radius
      
      // Rotate ring coordinates in 3D
      if (r === 0) {
        gyroVertices.push([x, y, 0])
      } else if (r === 1) {
        gyroVertices.push([x, 0, y])
      } else {
        gyroVertices.push([0, x, y])
      }

      const next = startIdx + ((p + 1) % pointsPerRing)
      gyroEdges.push([startIdx + p, next])
    }
  }
  // Center nucleus
  gyroVertices.push([0, 0, 0])
  list.push({ vertices: gyroVertices, edges: gyroEdges })

  // 2. 3D Tetrahedron (Node / Graph)
  list.push({
    vertices: [
      [0, 6, 0],
      [-5, -3, -4],
      [5, -3, -4],
      [0, -3, 5]
    ],
    edges: [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [2, 3], [3, 1]
    ]
  })

  // 3. 3D Octahedron (Double Pyramid)
  list.push({
    vertices: [
      [0, 6, 0],   // top
      [0, -6, 0],  // bottom
      [5, 0, 0], [0, 0, 5], [-5, 0, 0], [0, 0, -5] // belt
    ],
    edges: [
      [0, 2], [0, 3], [0, 4], [0, 5], // top links
      [1, 2], [1, 3], [1, 4], [1, 5], // bottom links
      [2, 3], [3, 4], [4, 5], [5, 2]  // belt links
    ]
  })

  // 4. 3D Cylinder (Coffee Mug)
  const cylVertices: [number, number, number][] = []
  const cylEdges: [number, number][] = []
  const cylPoints = 8
  const cylRadius = 4.5
  const cylHeight = 4

  // Bottom ring (Y = -cylHeight)
  for (let i = 0; i < cylPoints; i++) {
    const a = (i * Math.PI * 2) / cylPoints
    cylVertices.push([Math.cos(a) * cylRadius, -cylHeight, Math.sin(a) * cylRadius])
    cylEdges.push([i, (i + 1) % cylPoints])
  }
  // Top ring (Y = cylHeight)
  for (let i = 0; i < cylPoints; i++) {
    const a = (i * Math.PI * 2) / cylPoints
    cylVertices.push([Math.cos(a) * cylRadius, cylHeight, Math.sin(a) * cylRadius])
    cylEdges.push([cylPoints + i, cylPoints + ((i + 1) % cylPoints)])
    // Side links
    cylEdges.push([i, cylPoints + i])
  }
  // Mug Handle
  const handleStart = cylVertices.length
  cylVertices.push([cylRadius + 1, -2, 0])
  cylVertices.push([cylRadius + 2.5, -1, 0])
  cylVertices.push([cylRadius + 2.5, 1, 0])
  cylVertices.push([cylRadius + 1, 2, 0])
  cylEdges.push([handleStart, handleStart + 1])
  cylEdges.push([handleStart + 1, handleStart + 2])
  cylEdges.push([handleStart + 2, handleStart + 3])

  list.push({ vertices: cylVertices, edges: cylEdges })

  // 5. 3D Double Helix (Python / DNA)
  const helixVertices: [number, number, number][] = []
  const helixEdges: [number, number][] = []
  const steps = 8
  const helixRadius = 4.5

  for (let i = 0; i < steps; i++) {
    const t = (i * Math.PI * 1.5) / steps
    const y = (i / (steps - 1)) * 10 - 5
    // Strand A
    helixVertices.push([Math.cos(t) * helixRadius, y, Math.sin(t) * helixRadius])
    // Strand B
    helixVertices.push([Math.cos(t + Math.PI) * helixRadius, y, Math.sin(t + Math.PI) * helixRadius])

    if (i > 0) {
      helixEdges.push([2 * (i - 1), 2 * i])
      helixEdges.push([2 * (i - 1) + 1, 2 * i + 1])
    }
    // Rungs connecting strands
    helixEdges.push([2 * i, 2 * i + 1])
  }
  list.push({ vertices: helixVertices, edges: helixEdges })

  // 6. 3D Triangular Prism
  list.push({
    vertices: [
      [-4.5, -4, -3.5], [4.5, -4, -3.5], [0, 4.5, -3.5], // front face
      [-4.5, -4, 3.5],  [4.5, -4, 3.5],  [0, 4.5, 3.5]   // back face
    ],
    edges: [
      [0, 1], [1, 2], [2, 0], // front
      [3, 4], [4, 5], [5, 3], // back
      [0, 3], [1, 4], [2, 5]  // links
    ]
  })

  // 7. 3D Microchip (NVIDIA)
  const chipVertices: [number, number, number][] = [
    [-5, -1, -5], [5, -1, -5], [5, -1, 5], [-5, -1, 5], // top face
    [-5, 1, -5],  [5, 1, -5],  [5, 1, 5],  [-5, 1, 5]   // bottom face
  ]
  const chipEdges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
  ]
  // Add 4 pins extruding
  const pStart = chipVertices.length
  chipVertices.push([-7, 0, -3])
  chipVertices.push([-7, 0, 3])
  chipVertices.push([7, 0, -3])
  chipVertices.push([7, 0, 3])
  chipEdges.push([0, pStart])
  chipEdges.push([3, pStart + 1])
  chipEdges.push([1, pStart + 2])
  chipEdges.push([2, pStart + 3])

  list.push({ vertices: chipVertices, edges: chipEdges })

  // 8. 3D Cone / Apex
  const coneVertices: [number, number, number][] = [[0, 5, 0]] // apex
  const coneEdges: [number, number][] = []
  const coneBasePoints = 8
  const coneBaseRadius = 4.5

  for (let i = 0; i < coneBasePoints; i++) {
    const a = (i * Math.PI * 2) / coneBasePoints
    coneVertices.push([Math.cos(a) * coneBaseRadius, -4, Math.sin(a) * coneBaseRadius])
    coneEdges.push([0, i + 1])
    // Correct loop wrap connection
    coneEdges.push([i + 1, ((i + 1) % coneBasePoints) + 1])
  }
  list.push({ vertices: coneVertices, edges: coneEdges })

  // 9. 3D Torus Ring
  const torusVertices: [number, number, number][] = []
  const torusEdges: [number, number][] = []
  const ringA = 6
  const ringB = 6
  const R = 4.5
  const r = 1.8

  for (let i = 0; i < ringA; i++) {
    const u = (i * Math.PI * 2) / ringA
    const cosU = Math.cos(u)
    const sinU = Math.sin(u)
    for (let j = 0; j < ringB; j++) {
      const v = (j * Math.PI * 2) / ringB
      const cosV = Math.cos(v)
      const sinV = Math.sin(v)

      const x = (R + r * cosV) * cosU
      const y = (R + r * cosV) * sinU
      const z = r * sinV

      torusVertices.push([x, y, z])

      const current = i * ringB + j
      const nextU = ((i + 1) % ringA) * ringB + j
      const nextV = i * ringB + ((j + 1) % ringB)

      torusEdges.push([current, nextU])
      torusEdges.push([current, nextV])
    }
  }
  list.push({ vertices: torusVertices, edges: torusEdges })

  return list
}

export const VectorFieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    // Grid spacing
    const spacing = 56
    let cols = 0
    let rows = 0
    let numPoints = 0

    // Generate static 3D meshes
    const meshes = generateMeshes()

    // 3D Point properties
    interface Point {
      baseX: number
      baseY: number
      floatTime: number
      phaseX: number
      phaseY: number
      floatSpeed: number
      rx: number
      ry: number
      rz: number
      vrx: number
      vry: number
      vrz: number
      scale: number
      opacity: number
      meshIndex: number
    }
    let points: Point[] = []

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
    }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      cols = Math.ceil(width / spacing) + 1
      rows = Math.ceil(height / spacing) + 1
      numPoints = cols * rows

      points = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing
          const y = r * spacing
          points.push({
            baseX: x,
            baseY: y,
            floatTime: Math.random() * 100,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            floatSpeed: 0.008 + Math.random() * 0.008,
            rx: Math.random() * Math.PI * 2,
            ry: Math.random() * Math.PI * 2,
            rz: Math.random() * Math.PI * 2,
            vrx: 0.005 + Math.random() * 0.015,
            vry: 0.005 + Math.random() * 0.015,
            vrz: 0.005 + Math.random() * 0.015,
            scale: 0.85,
            opacity: 0.07,
            meshIndex: Math.floor(Math.random() * meshes.length),
          })
        }
      }
    }

    window.addEventListener('resize', resize)
    resize()

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Apply 3D rotation and perspective projection using precomputed trig values
    const projectRotated = (
      x: number,
      y: number,
      z: number,
      cosX: number, sinX: number,
      cosY: number, sinY: number,
      cosZ: number, sinZ: number,
      scale: number
    ) => {
      // 1. Rotate X axis (pitch)
      const y1 = y * cosX - z * sinX
      const z1 = y * sinX + z * cosX

      // 2. Rotate Y axis (yaw)
      const x2 = x * cosY + z1 * sinY
      const z2 = -x * sinY + z1 * cosY

      // 3. Rotate Z axis (roll)
      const x3 = x2 * cosZ - y1 * sinZ
      const y3 = x2 * sinZ + y1 * cosZ

      // 4. Perspective division
      const focalLength = 35
      const cameraDist = 35
      const perspectiveScale = (focalLength / (focalLength + z2 + cameraDist)) * scale * 1.6

      return {
        x: x3 * perspectiveScale,
        y: y3 * perspectiveScale,
        z: z2, // keep z for depth-shading
      }
    }

    const render = () => {
      // Pause updates completely if tab is hidden to save resources
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const influenceRadius = 135

      for (let i = 0; i < numPoints; i++) {
        const p = points[i]

        // 1. Mouse distance
        const dx = mouse.x - p.baseX
        const dy = mouse.y - p.baseY
        const distSq = dx * dx + dy * dy
        const dist = Math.sqrt(distSq)

        let force = 0
        if (dist < influenceRadius) {
          force = 1 - dist / influenceRadius
        }

        // 2. Dynamic float & spin speeds scaled by (1 - force)
        const speedFactor = 1 - force
        p.floatTime += p.floatSpeed * speedFactor
        
        p.rx += p.vrx * speedFactor
        p.ry += p.vry * speedFactor
        p.rz += p.vrz * speedFactor

        // If hovered, gently rotate mesh to face camera
        if (force > 0.05) {
          p.rx += (0 - p.rx % (Math.PI * 2)) * 0.15 * force
          p.ry += (0 - p.ry % (Math.PI * 2)) * 0.15 * force
          p.rz += (0 - p.rz % (Math.PI * 2)) * 0.15 * force
        }

        // 3. Floating 3D offset
        const floatX = Math.sin(p.floatTime + p.phaseX) * 12
        const floatY = Math.cos(p.floatTime + p.phaseY) * 12

        // 4. Interpolate scale and opacity
        const targetScale = 0.9 + force * 0.5
        const targetOpacity = 0.06 + force * 0.45

        p.scale += (targetScale - p.scale) * 0.15
        p.opacity += (targetOpacity - p.opacity) * 0.12

        // 5. Precompute sines/cosines once per point instead of per vertex
        const cosX = Math.cos(p.rx), sinX = Math.sin(p.rx)
        const cosY = Math.cos(p.ry), sinY = Math.sin(p.ry)
        const cosZ = Math.cos(p.rz), sinZ = Math.sin(p.rz)

        // 6. Render 3D Mesh
        const mesh = meshes[p.meshIndex]
        const projectedPoints = mesh.vertices.map((v) =>
          projectRotated(v[0], v[1], v[2], cosX, sinX, cosY, sinY, cosZ, sinZ, p.scale)
        )

        // Draw edges
        for (let e = 0; e < mesh.edges.length; e++) {
          const edge = mesh.edges[e]
          const p1 = projectedPoints[edge[0]]
          const p2 = projectedPoints[edge[1]]

          // Defensive safety check
          if (!p1 || !p2) continue

          // Depth Cueing: Calculate average depth of the edge
          const avgZ = (p1.z + p2.z) / 2
          
          // Map avgZ to opacity modifier
          const depthFactor = Math.max(0.2, Math.min(1.2, 1 - avgZ / 25))
          const opacity = p.opacity * depthFactor

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.lineWidth = (dist < influenceRadius ? 1.5 : 1) * depthFactor

          ctx.beginPath()
          ctx.moveTo(p.baseX + floatX + p1.x, p.baseY + floatY + p1.y)
          ctx.lineTo(p.baseX + floatX + p2.x, p.baseY + floatY + p2.y)
          ctx.stroke()
        }

        // Optional: Draw selection halo if hovered
        if (force > 0.2) {
          ctx.beginPath()
          ctx.arc(p.baseX + floatX, p.baseY + floatY, 15, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
