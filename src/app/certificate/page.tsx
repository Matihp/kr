import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloudIcon, CodeIcon, ComputerIcon, DatabaseIcon, SmartphoneIcon, XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import cert from '@/ui/2.jpg'
import skills from '@/ui/8.jpeg'

function page() {
  return (
    <>
      <section className="w-full px-10 lg:px-15 py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Certificaciones gratuitas para freelancers
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Obtén certificaciones gratuitas en diferentes áreas tecnológicas y destaca tus habilidades en el
                    mercado freelance.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Obtén tu Certificación
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Conoce los Beneficios
                  </Link>
                </div>
              </div>
              <Image
                src={cert}
                width="550"
                height="550"
                alt="Certificaciones"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-15 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Certificaciones Gratuitas</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Demuestra tus habilidades y consigue trabajos
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Obtén certificaciones acreditadas en diversos campos tecnológicos y úsalas para destacar tus
                  habilidades y encontrar trabajos a través de nuestra plataforma de proyectos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src={skills}
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Desarrollo Web</h3>
                      <p className="text-muted-foreground">
                        Demuestra tus habilidades en HTML, CSS, JavaScript y frameworks como React, Angular y Vue.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Diseño UX/UI</h3>
                      <p className="text-muted-foreground">
                        Acredita tus conocimientos en diseño de interfaces, experiencia de usuario y herramientas como
                        Figma y Adobe XD.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Desarrollo Móvil</h3>
                      <p className="text-muted-foreground">
                        Obtén certificaciones en desarrollo de aplicaciones móviles para iOS y Android, incluyendo
                        frameworks como Flutter y React Native.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="areas" className="w-full py-12 md:py-15">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Áreas Cubiertas</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Certificaciones para Diferentes Áreas
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tenemos certificaciones gratuitas disponibles para freelancers de diferentes áreas tecnológicas.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow-sm">
                <CodeIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Desarrollo Web</h3>
                <p className="text-muted-foreground">Certificaciones en HTML, CSS, JavaScript, React, Angular y más.</p>
              </div>
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow-sm">
                <DatabaseIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Bases de Datos</h3>
                <p className="text-muted-foreground">Certificaciones en SQL, MySQL, PostgreSQL, MongoDB y más.</p>
              </div>
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow-sm">
                <CloudIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Cloud Computing</h3>
                <p className="text-muted-foreground">Certificaciones en AWS, Azure, GCP y más.</p>
              </div>
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow-sm">
                <SmartphoneIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Desarrollo Móvil</h3>
                <p className="text-muted-foreground">Certificaciones en iOS, Android, Flutter y más.</p>
              </div>
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow-sm">
                <XIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Inteligencia Artificial</h3>
                <p className="text-muted-foreground">Certificaciones en Machine Learning, Deep Learning y más.</p>
              </div>
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow-sm">
                <ComputerIcon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Ciberseguridad</h3>
                <p className="text-muted-foreground">Certificaciones en Ethical Hacking, Pentesting y más.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-20 md:px-20 bg-muted">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Beneficios de las Certificaciones
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Obtén más proyectos y destaca tus habilidades con las certificaciones gratuitas.
              </p>
            </div>
            <div className="flex flex-col gap-2 lg:flex-row">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Obtén tu Certificación
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Conoce los Proyectos
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-15 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Certificaciones para todos los niveles
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Desde principiantes hasta expertos, tenemos certificaciones gratuitas para todos los niveles de
                habilidad.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Ingresa tu email" className="max-w-lg flex-1" />
                <Button type="submit">Suscríbete</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Suscríbete para recibir información sobre nuevas certificaciones.{" "}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Términos y Condiciones
                </Link>
              </p>
            </div>
          </div>
        </section>
    </>
  );
}

export default page;
