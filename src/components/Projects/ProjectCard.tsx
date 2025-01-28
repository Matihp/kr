import Image from "next/image"
import { Heart } from "lucide-react"

interface ProjectCardProps {
  title: string
  image: string
  description: string
  likes: number
  freelancer: string
  tags: string[]
}

export function ProjectCard({ title, image, description, likes, freelancer, tags }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">por {freelancer}</span>
          <div className="flex items-center">
            <Heart className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-gray-500">{likes}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

