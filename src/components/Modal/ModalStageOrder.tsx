"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GigStage } from "@/types/gig"
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from "lucide-react"

interface SortableStageItemProps {
    stage: GigStage
    index: number
  }

function SortableStageItem({ stage, index }: SortableStageItemProps) {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition 
  } = useSortable({ id: stage.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="border border-gray-200 rounded-lg p-4 mb-2 bg-white flex items-center gap-3 cursor-move"
    >
      <div {...attributes} {...listeners} className="text-gray-400 hover:text-gray-600">
        <GripVertical size={20} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {index + 1}
          </span>
          <h3 className="font-medium">{stage.name}</h3>
        </div>
      </div>
    </div>
  )
}

interface ModalStageOrderProps {
    stages: GigStage[]
    gigId: string
    onOrderUpdate: (newOrder: { id: string, order: number }[]) => Promise<void>
    trigger: React.ReactNode
  }

export default function ModalStageOrder({ stages, gigId, onOrderUpdate, trigger }: ModalStageOrderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [orderedStages, setOrderedStages] = useState<GigStage[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Ordenar las etapas por el campo order si existe, o mantener el orden actual
      const sortedStages = [...stages].sort((a, b) => 
        (a.order !== undefined && b.order !== undefined) ? a.order - b.order : 0
      )
      setOrderedStages(sortedStages)
    }
  }, [isOpen, stages])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      setOrderedStages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSave = async () => {
    setIsUpdating(true)
    try {
      const newOrder = orderedStages.map((stage, index) => ({
        id: stage.id,
        order: index
      }))
      await onOrderUpdate(newOrder)
      setIsOpen(false)
    } catch (error) {
      console.error("Error al actualizar el orden:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ordenar Etapas</DialogTitle>
          <DialogDescription>
            Arrastra y suelta las etapas para cambiar su orden. Guarda los cambios cuando termines.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={orderedStages.map(stage => stage.id)}
              strategy={verticalListSortingStrategy}
            >
              {orderedStages.map((stage, index) => (
                <SortableStageItem 
                  key={stage.id} 
                  stage={stage} 
                  index={index} 
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <DialogFooter className='mxsm:grid mxsm:grid-cols-2 mxsm:gap-4'>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            onClick={handleSave} 
            disabled={isUpdating}
          >
            {isUpdating ? "Guardando..." : "Guardar Orden"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}