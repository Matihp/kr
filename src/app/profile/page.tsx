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
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DropdownProject } from "@/components/Dropdown/DropdownProject";
import useMatchMedia from "@/components/ui/matchMedia";
import useHeaderStore from "@/lib/store/headerStore";
import ModalLanguages from "@/components/Modal/ModalLanguages";
import ModalSkills from "@/components/Modal/ModalSkills";
import ModalDescription from "@/components/Modal/ModalDescription";
import ModalCertification from "@/components/Modal/ModalCertification";
import ModalInfo from "@/components/Modal/ModalInfo";
import { Button } from "@/components/ui/button";
import ModalProfileImage from "@/components/Modal/ModalProfileImage";
import { useAuth } from "@/lib/useAuth";
import {
  Certification,
  Language,
  Project,
  ProjectFormData,
} from "@/types/profile";
import { verifyToken } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ProfileStatsWidget from "@/components/Profile/ProfileStatsWidget";
import PrivateProfileContactCard from "@/components/Profile/PrivateProfileContactCard";

function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const isScrollingHeader = useHeaderStore(
    (state) => state.setIsScrollingHeader
  );
  const isTablet = useMatchMedia("(max-width: 1023px)");
  const isDesktop = useMatchMedia("(min-width: 1024px)");

  const [showNav, setShowNav] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre-mi");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [description, setDescription] = useState<string>("");
  const [isDefaultDescription, setIsDefaultDescription] =useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const sobreMiRef = useRef<HTMLDivElement>(null);
  const proyectosRef = useRef<HTMLDivElement>(null);
  const habilidadesRef = useRef<HTMLDivElement>(null);
  const certificacionesRef = useRef<HTMLDivElement>(null);

  const active =
    "flex gap-1 h-12 items-center px-3 border-b-4 text-prBlue font-bold border-prBlue";
  const noActive =
    "flex gap-1 h-12 items-center px-3 border-b-4 border-slate-100";

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        const { isAuthenticated: authVerified, user: verifiedUser } =
          await verifyToken();
        if (authVerified && verifiedUser) {
          const userDescription =
            verifiedUser.description ||
            "Bienvenido a tu perfil. Edita esta sección para agregar una descripción personalizada.";
          setDescription(userDescription);
          setIsDefaultDescription(
            userDescription ===
              "Bienvenido a tu perfil. Edita esta sección para agregar una descripción personalizada."
          );
          setAvatarSrc(verifiedUser.avatarSrc || avatar.src);
          setLanguages(verifiedUser.languages || []);
          setSkills(
            verifiedUser.skills.map((skill: { name: any }) => skill.name) || []
          );
          setProjects(verifiedUser.projects || []);
          setCertifications(verifiedUser.certifications || []);
        }
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  const handleSaveImage = (editedImage: { imageUrl: string }) => {
    setAvatarSrc(editedImage.imageUrl);
  };
  const handleAddProject = useCallback((projectData: ProjectFormData) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: projectData.title,
      role: projectData.role,
      description: projectData.description,
      skills: projectData.skills,
      images: projectData.images.map((image) =>
        typeof image === "string" ? image : URL.createObjectURL(image)
      ),
      website: projectData.website,
      repository: projectData.repository,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setIsAddProjectModalOpen(false); // Cerrar el modal después de añadir el proyecto
  }, []);

  const handleEditProject = (projectData: ProjectFormData) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectData.id
          ? {
              ...project,
              ...projectData,
              images: projectData.images.map((image) =>
                typeof image === "string" ? image : URL.createObjectURL(image)
              ),
            }
          : project
      )
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  const handleSkillsUpdate = (updatedSkills: string[]) => {
    setSkills(updatedSkills);
  };
  const handleSaveProfile = async () => {
    if (user && user.id) {
      const profileData = {
        description,
        avatarSrc,
        languages,
        skills,
        projects,
        certifications,
      };
      try {
        await updateProfile(user.id, profileData);
        alert("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile");
      }
    } else {
      alert("User not found");
    }
  };
  const updateDescription = (newDescription: SetStateAction<string>) => {
    setDescription(newDescription);
    setIsDefaultDescription(
      newDescription ===
        "Bienvenido a tu perfil. Edita esta sección para agregar una descripción personalizada."
    );
  };

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
    <ProtectedRoute>
      <div
        className="relative container-sticky text-[12px]"
      >
        <div
          id="sticky-element"
          className="lg:sticky md:top-0 z-10 bg-slate-100 md:pt-6 lg:pl-2 lg:h-[249px]"
        >
          <div className="flex flex-col md:flex-row gap-4 pt-4 md:gap-8 md:mt-16 md:pl-2 lg:pl-5">
            <div className="mx-auto md:mx-0 lg:pl-3">
              {avatarSrc === "" ? (
                <Skeleton className="w-20 h-20 rounded-full bg-gray-400" />
              ) : (
                <>
                  <Image
                    width={80}
                    height={30}
                    alt=""
                    src={avatarSrc}
                    className=" rounded-full "
                  />
                  <div className="absolute z-50 top-[70px] left-52 md:top-40 md:left-16 lg:left-24">
                    <ModalProfileImage
                      onSave={handleSaveImage}
                      currentImageUrl={avatarSrc}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-2 bg-gray-50 w-[70%] mx-auto md:mx-0 md:w-[30vw] rounded-md shadow-xl border-2 border-gray-300">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{`${user?.firstName} ${user?.lastName} `}</h2>
                <ModalDescription
                  setDescription={setDescription}
                  description={description}
                />
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
            <div className="ml-0 hidden lg:block lg:ml-12">
              <ProfileStatsWidget userId={user?.id} levelProgress={user?.levelProgress}/>              
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
          <div className="">
            <div
              id="sobre-mi"
              ref={sobreMiRef}
              className={`block md:w-[60vw] mx-8 mb-8 mt-6 p-6 md:ml-4 lg:ml-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${
                showNav && isScrolling ? "mt-28" : ""
              } `}
            >
              <div className="flex justify-between">
                <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Sobre Mi
                </h2>
                <ModalDescription
                  setDescription={updateDescription}
                  description={description}
                />
              </div>
              <p
                className={`${
                  isDefaultDescription
                    ? "text-gray-500 italic"
                    : "font-normal break-all text-gray-700 dark:text-gray-400"
                }`}
              >
                {description || (
                  <Skeleton className="w-20 h-20 rounded-sm bg-gray-400" />
                )}
              </p>
            </div>

            <div
              id="proyectos"
              ref={proyectosRef}
              className="md:w-[60vw] flex justify-between items-center mxmd:mx-8 ml-8 md:ml-4 lg:ml-8 p-2 border rounded-lg bg-gray-100"
            >
              <h2 className="ml-0 text-xl font-bold tracking-tight text-gray-900">
                Proyectos
              </h2>
              <Button onClick={() => setIsAddProjectModalOpen(true)}>
                Agregar Proyecto
              </Button>
              <ModalInfo
                isOpen={isAddProjectModalOpen}
                onOpenChange={setIsAddProjectModalOpen}
                onAddProject={handleAddProject}
              />
            </div>
            <div className="bg-slate-100 space-y-3 md:space-y-2 flex flex-col items-center md:w-[60vw] mxmd:mx-8 ml-8 my-2 py-3 md:pl-4 md:ml-4 md:pr-4 lg:ml-8 rounded-md">
              {isLoading ? (
                <Skeleton className="w-20 h-20 rounded-full bg-gray-400" />
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow w-[95%] md:w-[58.5vw] md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <Image
                      unoptimized
                      className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={project.images[0]}
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
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col md:flex-row md:w-[60vw] gap-y-4 md:gap-x-4 m-8 md:ml-4 lg:ml-8">
              <div
                id="habilidades"
                ref={habilidadesRef}
                className="block p-6 md:min-w-[29vw] lg:min-w-[29.4vw] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="flex justify-between">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Habilidades
                  </h5>
                  <ModalSkills
                    skills={skills}
                    onSkillsUpdate={handleSkillsUpdate}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {isLoading ? (
                    <Skeleton className="w-20 h-20 rounded-full bg-gray-400" />
                  ) : (
                    skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-violet-100 text-sm font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div
                id="idiomas"
                className="block p-6  md:min-w-[29vw] lg:min-w-[29.4vw] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="flex justify-between">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Idiomas
                  </h5>
                  <ModalLanguages
                    languages={languages}
                    setLanguages={setLanguages}
                  />
                </div>
                <ul className="font-normal ">
                  {isLoading ? (
                    <Skeleton className="w-20 h-20 rounded-full bg-gray-400" />
                  ) : (
                    languages.map((lang, index) => (
                      <li className="font-semibold mb-1" key={index}>
                        {`${lang.language}: `}
                        <span className="text-gray-500">{lang.level}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            <div
              id="certificaciones"
              ref={certificacionesRef}
              className="block md:w-[60vw] m-8 p-6 md:ml-4 lg:ml-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="flex justify-between">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Certificaciones
                </h5>
                <ModalCertification
                  certifications={certifications}
                  setCertifications={setCertifications}
                />
              </div>
              <div className="font-normal text-gray-700 dark:text-gray-400 grid grid-cols-1 lg:grid-cols-2 ml-1">
                {isLoading ? (
                  <Skeleton className="w-20 h-20 rounded-full bg-gray-400" />
                ) : (
                  certifications.map((cert) => (
                    <div key={cert.id} className="mb-4">
                      <h6 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {cert.name}
                      </h6>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Fecha: {cert.date}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        URL: <a href={cert.url}>{cert.url}</a>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cert.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
            <Button className="ml-8 mb-6" onClick={handleSaveProfile}>Guardar</Button>
          </div>
          <PrivateProfileContactCard />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Profile;
