"use client";
import { useState, useEffect, useRef } from "react";
import { fetchProjects, likeProject, Project } from "@/api/projectsApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ProjectWithImageIndex extends Project {
  imageIndex?: number;
}

export default function DiscoverProjects() {
  const [projects, setProjects] = useState<ProjectWithImageIndex[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showWebsite, setShowWebsite] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await fetchProjects(page, 10);
      
      const projectsWithWebsite = data.items.filter(project => !!project.website);
      
      if (projectsWithWebsite.length === 0) {
        toast.error("No projects found", {
          description: "There are no projects with websites available.",
        });
        return;
      }
      
      const projectsWithImageIndex = projectsWithWebsite.map(project => ({
        ...project,
        imageIndex: 0
      }));
      
      if (page === 1) {
        setProjects(projectsWithImageIndex);
      } else {
        setProjects(prev => [...prev, ...projectsWithImageIndex]);
      }
      
      setHasMorePages(page < data.totalPages);
      setPage(prev => prev + 1);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to load projects. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (projects.length === 0) return;
    
    const currentProject = projects[currentIndex];
    
    try {
      await likeProject(currentProject.id);
      toast.success("Liked!", {
        description: `You liked ${currentProject.title}`,
      });
      nextProject();
    } catch (error) {
      toast.error("Error", {
        description: "Failed to like project. Please try again.",
      });
    }
  };

  const handleDislike = () => {
    nextProject();
  };

  const nextProject = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowWebsite(false);
    } else if (hasMorePages) {
      loadProjects();
    } else {
      toast.error("No more projects", {
        description: "You've seen all available projects.",
      });
    }
  };

  const toggleWebsiteView = () => {
    setShowWebsite(!showWebsite);
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!projects.length) return;
    
    const currentProject = projects[currentIndex];
    const currentImageIndex = currentProject.imageIndex || 0;
    
    let newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length
      : (currentImageIndex + 1) % currentProject.images.length;
    
    const updatedProjects = [...projects];
    updatedProjects[currentIndex] = {
      ...currentProject,
      imageIndex: newIndex
    };
    
    setProjects(updatedProjects);
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">No Projects Found</h2>
        <p className="text-center mb-6">There are no projects with websites available to discover.</p>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>
    );
  }

  const currentProject = projects[currentIndex];
  const currentImageIndex = currentProject.imageIndex || 0;
  const currentImage = currentProject.images[currentImageIndex];

  return (
    <div className="container mx-auto mt-8 md:mt-28 pb-20 px-4 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Descubrir Proyectos</h1>
        <p className="text-muted-foreground">Desliza el dedo por los proyectos y descubre trabajos interesantes de nuestra comunidad.</p>
      </div>
      
      <Card className="w-full overflow-hidden shadow-xl rounded-xl">
        <div className="relative h-[60vh]">
          {showWebsite ? (
            <div className="w-full h-full">
              <iframe 
                ref={iframeRef}
                src={currentProject.website}
                className="w-full h-full border-0"
                title={`${currentProject.title} website`}
                sandbox="allow-scripts allow-same-origin"
              />
              <div className="absolute top-2 right-2 z-10">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={toggleWebsiteView}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 z-10">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={() => window.open(currentProject.website, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Website
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-full h-full">
                <Image 
                  src={currentImage} 
                  alt={currentProject.title}
                  fill
                  className="object-cover"
                />
                
                {currentProject.images.length > 1 && (
                  <>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleImageNavigation('prev')}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleImageNavigation('next')}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-xl font-bold text-white">{currentProject.title}</h2>
                  <p className="text-white/90 text-sm">
                    by {currentProject.user.firstName} {currentProject.user.lastName}
                  </p>
                </div>
                
                <div className="absolute top-2 right-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={toggleWebsiteView}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              {currentProject.skills.slice(0, 3).map(skill => (
                <span 
                  key={skill.id} 
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {skill.name}
                </span>
              ))}
              {currentProject.skills.length > 3 && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  +{currentProject.skills.length - 3}
                </span>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {projects.length}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
            {currentProject.description}
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full h-16 w-16 border-2 border-destructive flex items-center justify-center"
              onClick={handleDislike}
            >
              <X className="h-8 w-8 text-destructive" strokeWidth={2} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full h-16 w-16 border-2 border-green-500 flex items-center justify-center"
              onClick={handleLike}
            >
              <Heart className="h-8 w-8 text-green-500" strokeWidth={2} fill="none" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}