"use client";
import Image from "next/image";
import avatar from "@/ui/avatar.jpg";
import Icon from "@mdi/react";
import {
  mdiMapMarker,
  mdiAccountSchool,
  mdiCertificateOutline,
  mdiHeadCogOutline,
  mdiInformationOutline,
  mdiTextAccount,
} from "@mdi/js";
import { useEffect, useRef, useState } from "react";
import ModalProject from "@/components/Modal/ModalProject";
import { DropdownProject } from "@/components/Dropdown/DropdownProject";
import useMatchMedia from "@/components/ui/matchMedia";
import useHeaderStore from "@/lib/store/headerStore";
import ModalLanguages from "@/components/Modal/ModalLanguages";
import ModalSkills from "@/components/Modal/ModalSkills";
import ModalDescription from "@/components/Modal/ModalDescription";
import ModalCertification from "@/components/Modal/ModalCertification";
import ModalInfo from "@/components/Modal/ModalInfo";
import PrivateProfileContactCard from "@/components/ProfileContactCard/PrivateProfileContactCard";

type LanguageLevel = "beginner" | "intermediate" | "advanced" | string

type Language = {
  language: string
  level: LanguageLevel
}

type Certification = {
  id: string;
  name: string;
  date: string;
  url: string;
  description: string;
};

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  imageSrc: string;
  website: string;
  repository: string;
}

// Esta interfaz representa los datos que recibiremos del formulario
interface ProjectFormData {
  id?: string; // Añadimos 'id' como opcional
  title: string;
  role: string;
  description: string;
  skills: string[];
  image?: File | null; // Ahora "image" es opcional
  website: string;
  repository: string;
  imageSrc?: string; // Añadimos "imageSrc" como opcional
}

function Profile() {
  const active =
    "flex gap-1 h-12 items-center px-3 border-b-4 text-prBlue font-bold border-prBlue";
  const noActive =
    "flex gap-1 h-12 items-center px-3 border-b-4 border-slate-100";
  const [showNav, setShowNav] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre-mi");
  const [description, setDescription] = useState<string>(
    "With over 14 years of experience in the field of SEO, I have gained extensive knowledge and expertise that enables me to provide effective SEO services to businesses. I previously worked for one of the UK's leading digital marketing agencies and have since then transitioned to directly helping businesses achieve their goals. My passion for helping businesses succeed is reflected in the positive feedback I receive from satisfied clients. Thank you for considering my services - I look forward to the opportunity to work with you and help your business thrive online."
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [languages, setLanguages] = useState<Language[]>([])
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'TypeScript'])
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "Certificación 1",
      date: "2023-01-01",
      url: "https://example.com/cert1",
      description: "Descripción de la Certificación 1",
    },
    {
      id: "2",
      name: "Certificación 2",
      date: "2023-02-02",
      url: "https://example.com/cert2",
      description: "Descripción de la Certificación 2",
    },
  ]);
  const isTablet = useMatchMedia("(max-width: 1023px)");
  const isDesktop = useMatchMedia("(min-width: 1024px)");
  const isScrollingHeader = useHeaderStore(
    (state) => state.setIsScrollingHeader
  );
  const sobreMiRef = useRef<HTMLDivElement>(null);
  const proyectosRef = useRef<HTMLDivElement>(null);
  const habilidadesRef = useRef<HTMLDivElement>(null);
  const certificacionesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTablet) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [isTablet]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = [
        { name: "sobre-mi", ref: sobreMiRef },
        { name: "proyectos", ref: proyectosRef },
        { name: "habilidades", ref: habilidadesRef },
        { name: "certificaciones", ref: certificacionesRef },
      ];

      if (isTablet && scrollPosition > 50) {
        isScrollingHeader(false);
      } else {
        isScrollingHeader(true);
      }

      setIsScrolling(scrollPosition > 220);

      // Determinar qué sección está actualmente en vista
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const offset = isDesktop ? 300 : 100;
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTablet, isDesktop, isScrollingHeader]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      const yOffset = isDesktop ? -300 : -100;
      const y =
        sectionRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleAddProject = (projectData: ProjectFormData) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: projectData.title,
      role: projectData.role,
      description: projectData.description,
      skills: projectData.skills,
      imageSrc: projectData.image ? URL.createObjectURL(projectData.image) : '/placeholder-image.jpg',
      website: projectData.website,
      repository: projectData.repository,
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const handleEditProject = (projectData: ProjectFormData) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectData.id ? { ...project, ...projectData, imageSrc: projectData.image ? URL.createObjectURL(projectData.image) : project.imageSrc } : project
      )
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
  };



  const handleSkillsUpdate = (updatedSkills: string[]) => {
    setSkills(updatedSkills)
  }

  const navItems = [
    {
      name: "sobre-mi",
      label: "Sobre mi",
      icon: mdiTextAccount,
      ref: sobreMiRef,
    },
    {
      name: "proyectos",
      label: "Proyectos",
      icon: mdiInformationOutline,
      ref: proyectosRef,
    },
    {
      name: "habilidades",
      label: "Habilidades",
      icon: mdiHeadCogOutline,
      ref: habilidadesRef,
    },
    {
      name: "certificaciones",
      label: "Certificaciones",
      icon: mdiCertificateOutline,
      ref: certificacionesRef,
    },
  ];

  return (
    <div className="relative container-sticky text-[12px]">
      <div
        id="sticky-element"
        className="lg:sticky md:top-0 z-10 bg-slate-100 md:pt-6 lg:pl-2 lg:h-[249px]"
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 pt-4 lg:pl-5 md:mt-14 md:pl-7 lg:mt-16">
          <div className="mx-auto md:mx-0">
            <Image
              width={80}
              height={30}
              alt=""
              src={avatar}
              className=" rounded-full  "
            />
          </div>

          <div className="p-2 bg-slate-100 w-[70%] mx-auto md:mx-0 md:w-[30vw] rounded-md shadow-xl border-2 border-gray-300">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Juan Perez</h2>
              <ModalDescription setDescription={setDescription} />
            </div>
            <div className="flex items-center gap-10 pt-1.5">
              <div className="flex items-center">
                <Icon path={mdiMapMarker} size={1} />
                <p className="text-slate-400">Ubicación</p>
              </div>
              <div className="flex items-center">
                <Icon path={mdiAccountSchool} size={1} />
                <p className="text-slate-400">Profesión</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex h-16 lg:ml-6 pt-4 justify-between sm:justify-start sm:gap-1 ${
            showNav && isScrolling
              ? "fixed top-0 z-50 mt-0 w-screen !pt-0 !h-12 bg-slate-100 transition-all"
              : ""
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.ref)}
              className={activeSection === item.name ? active : noActive}
            >
              <Icon path={item.icon} size={1} />
              <span className="hidden sm:block">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 bg-white w-screen flex justify-center items-center h-16  md:hidden ">
        <button className=" px-8 py-2 font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-500">
          Quiero mi certificado
        </button>
      </div>
      <div className="flex">
        <div>
          <div
            id="sobre-mi"
            ref={sobreMiRef}
            className={`block md:w-[60vw] m-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${
              showNav && isScrolling ? "mt-28" : ""
            } `}
          >
            <div className="flex justify-between">
              <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sobre Mi
              </h2>
              <ModalDescription setDescription={setDescription} />
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>
          
          <div
        id="proyectos"
        ref={proyectosRef}
        className="md:w-[60vw] flex justify-between items-center mxmd:m-8 ml-8 p-2 border rounded-lg bg-gray-100"
      >
        <h2 className="ml-0 text-xl font-bold tracking-tight text-gray-900">
          Proyectos
        </h2>
        <ModalInfo onAddProject={handleAddProject} />
      </div>
      <div className="bg-slate-100 flex flex-col md:w-[60vw] mxmd:m-8 ml-8 my-2 py-2 md:pl-4 rounded-md">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col items-center ml-0 my-2 bg-white border border-gray-200 rounded-lg shadow md:w-[58vw] md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <Image
              unoptimized
              className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={project.imageSrc}
              alt=""
              width={192}
              height={192}
            />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <div className="flex justify-between">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {project.title}
                </h5> 
                <DropdownProject
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {project.description}
              </p>
              <div>
                <ModalInfo onAddProject={handleEditProject} />
              </div>
            </div>
          </div>
        ))}
      </div>

          <div className="flex flex-col md:flex-row md:w-[60vw] gap-y-4 md:gap-x-4 m-8">
            <div
              id="habilidades"
              ref={habilidadesRef}
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 lg:min-w-[29.4vw]"
            >
              <div className="flex justify-between">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Habilidades
                </h5>
                <ModalSkills skills={skills} onSkillsUpdate={handleSkillsUpdate} />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-violet-100 text-sm font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div
            id="idiomas"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 lg:min-w-[29.4vw]"
            >
              <div className="flex justify-between">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Idiomas
                </h5>
                <ModalLanguages languages={languages} setLanguages={setLanguages} />
              </div>
              <ul className="font-normal ">
                {languages.map((lang, index) => (
                  <li className="font-semibold mb-1" key={index}>{`${lang.language}: `}<span className="text-gray-500">{lang.level}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div
            id="certificaciones"
            ref={certificacionesRef}
            className="block md:w-[60vw] m-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="flex justify-between">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Certificaciones
              </h5>
              <ModalCertification certifications={certifications} setCertifications={setCertifications} />
            </div>
            <div className="font-normal text-gray-700 dark:text-gray-400 grid grid-cols-2 ml-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-4">
                  <h6 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.name}</h6>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fecha: {cert.date}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">URL: <a href={cert.url}>{cert.url}</a></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PrivateProfileContactCard/>
      </div>
    </div>
  );
}

export default Profile;
