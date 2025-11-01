"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Html } from "@react-three/drei"
import * as THREE from "three"

// Skill categories with their respective skills
const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["Python", "Java", "JavaScript", "HTML", "SQL"],
    color: "#ff3366",
  },
  {
    name: "Frameworks & Libraries",
    skills: ["React.js", "Node.js", "MongoDB"],
    color: "#33ff66",
  },
  {
    name: "Machine Learning",
    skills: ["CatBoost", "XGBoost", "LightGBM", "Logistic Regression"],
    color: "#3366ff",
  },
  {
    name: "Natural Language Processing",
    skills: ["BERT", "NER", "TextRank", "T5 Transformer"],
    color: "#ffcc33",
  },
  {
    name: "Developer Tools",
    skills: ["Power BI", "Git/GitHub", "VS Code", "MS Excel"],
    color: "#33ffcc",
  },
]


// Floating skill node component
interface SkillNodeProps {
  skill: string;
  position: [number, number, number];
  color: string;
  index: number;
  category: string;
}

function SkillNode({ skill, position, color, index, category }: SkillNodeProps) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Floating animation
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime() + index
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1
    ref.current.rotation.y += 0.01
  })

  return (
    <group ref={ref} position={position}>
      {/* Skill sphere */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.5 : 0.2} />
      </mesh>

      {/* Skill label */}
      <Html distanceFactor={10} position={[0, 0.3, 0]} center>
        <div
          className={`px-2 py-1 rounded text-xs font-mono transition-all duration-300 ${hovered ? "scale-110" : "scale-100"}`}
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            color: color,
            border: `1px solid ${color}`,
            transform: `scale(${hovered ? 1.1 : 1})`,
            boxShadow: hovered ? `0 0 10px ${color}` : "none",
          }}
        >
          {skill}
        </div>
      </Html>

      {/* Show category on click */}
      {clicked && (
        <Html distanceFactor={10} position={[0, -0.3, 0]} center>
          <div className="px-2 py-1 rounded text-xs font-mono bg-black/80 text-white">{category}</div>
        </Html>
      )}
    </group>
  )
}

// Connection line between nodes
interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function ConnectionLine({ start, end, color }: ConnectionLineProps) {
  const ref = useRef<THREE.Line>(null)

  useEffect(() => {
    if (!ref.current) return
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    ref.current.geometry.setFromPoints(points)
  }, [start, end])

  return (
    <primitive object={new THREE.Line()} ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </primitive>
  )
}

// Data packet that travels along connections
interface DataPacketProps {
  start: [number, number, number];
  end: [number, number, number];
  speed?: number;
  color?: string;
}

function DataPacket({ start, end, speed = 0.01, color = "#ff0000" }: DataPacketProps) {
  const ref = useRef<THREE.Mesh>(null)
  const [progress, setProgress] = useState(0)

  useFrame(() => {
    if (!ref.current) return
    setProgress((prev) => {
      const newProgress = prev + speed
      return newProgress > 1 ? 0 : newProgress
    })

    const startVec = new THREE.Vector3(...start)
    const endVec = new THREE.Vector3(...end)
    const position = startVec.lerp(endVec, progress)
    ref.current.position.copy(position)
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  )
}

// Digital grid floor
function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40, 20, 20]} />
      <meshStandardMaterial color="#00ff00" wireframe={true} transparent opacity={0.3} />
    </mesh>
  )
}

// Hexagonal shield representing cybersecurity
interface CyberShieldProps {
  position?: [number, number, number];
}

function CyberShield({ position = [0, 0, 0] }: CyberShieldProps) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.2
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2
  })

  return (
    <group ref={ref} position={position}>
      {/* Shield base */}
      <mesh>
        <cylinderGeometry args={[2, 2, 0.2, 6]} />
        <meshStandardMaterial color="#00ff00" transparent opacity={0.7} emissive="#00ff00" emissiveIntensity={0.3} />
      </mesh>

      {/* Shield inner */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.1, 6]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.9} />
      </mesh>

      {/* Shield emblem */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={0.5} />
      </mesh>

      {/* Shield text */}
      <Text position={[0, 0.6, 0]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        Ishitha Isukapalli
      </Text>
    </group>
  )
}

// Binary particles floating in the background
interface BinaryParticlesProps {
  count?: number;
}

function BinaryParticles({ count = 100 }: BinaryParticlesProps) {
  const ref = useRef<THREE.Points>(null)
  const { size, viewport } = useThree()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    setMounted(true)

    ref.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(
          Array.from({ length: count }, () => [
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]).flat(),
        ),
        3,
      ),
    )
  }, [count])

  useFrame((state) => {
    if (!mounted || !ref.current) return
    const t = state.clock.getElapsedTime() * 0.1
    ref.current.rotation.set(Math.cos(t), Math.sin(t), Math.sin(t))
  })

  return (
    <points ref={ref}>
      <bufferGeometry />
      <pointsMaterial size={0.1} color="#00ff00" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// Main scene component
function CyberScene() {
  // Calculate positions for skill nodes in a spiral pattern
  const allSkills = skillCategories.flatMap((category) =>
    category.skills.map((skill) => ({
      name: skill,
      category: category.name,
      color: category.color,
    })),
  )

  const nodePositions: [number, number, number][] = allSkills.map((_, i) => {
    const angle = (i / allSkills.length) * Math.PI * 6
    const radius = 4 + (i / allSkills.length) * 2
    const y = (i / allSkills.length) * 4 - 2
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number]
  })

  interface Connection {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

  // Create connections between skills in the same category
  const connections: Connection[] = []
  skillCategories.forEach((category) => {
    const categorySkills = allSkills.filter((skill) => skill.category === category.name)
    for (let i = 0; i < categorySkills.length; i++) {
      for (let j = i + 1; j < categorySkills.length; j++) {
        const startIndex = allSkills.findIndex((s) => s.name === categorySkills[i].name)
        const endIndex = allSkills.findIndex((s) => s.name === categorySkills[j].name)
        connections.push({
          start: nodePositions[startIndex],
          end: nodePositions[endIndex],
          color: category.color,
        })
      }
    }
  })

  // Create data packets that travel along connections
  const packets = []
  for (let i = 0; i < 15; i++) {
    const connectionIndex = Math.floor(Math.random() * connections.length)
    packets.push({
      start: connections[connectionIndex].start,
      end: connections[connectionIndex].end,
      speed: 0.005 + Math.random() * 0.01,
      color: i < 5 ? "#ff3333" : "#00ff00", // Some red (threats) and some purple (secure)
    })
  }

  return (
    <>
      {/* Environment setup */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={true} enablePan={false} />

      {/* Background elements */}
      <BinaryParticles count={200} />
      <GridFloor />

      {/* Central cybersecurity shield */}
      <CyberShield position={[0, 0, 0]} />

      {/* Skill nodes */}
      {allSkills.map((skill, i) => (
        <SkillNode
          key={i}
          skill={skill.name}
          category={skill.category}
          position={nodePositions[i]}
          color={skill.color}
          index={i}
        />
      ))}

      {/* Connections between related skills */}
      {connections.map((connection, i) => (
        <ConnectionLine key={i} start={connection.start} end={connection.end} color={connection.color} />
      ))}

      {/* Data packets traveling along connections */}
      {packets.map((packet, i) => (
        <DataPacket key={i} start={packet.start} end={packet.end} speed={packet.speed} color={packet.color} />
      ))}
    </>
  )
}

// Main component that renders the 3D visualization
export default function SkillsVisualization() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative w-full h-[500px] rounded-md overflow-hidden">
      {isClient && (
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <CyberScene />
        </Canvas>
      )}

      {/* Legend */}
      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap justify-center gap-2 bg-black/70 p-2 rounded">
        {skillCategories.map((category, i) => (
          <div key={i} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: category.color }} />
            <span className="text-xs font-mono text-white">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-2 right-2 bg-black/70 p-2 rounded text-xs font-mono text-white">
        <p>Click & drag to rotate</p>
        <p>Scroll to zoom</p>
        <p>Click nodes for details</p>
      </div>
    </div>
  )
}
